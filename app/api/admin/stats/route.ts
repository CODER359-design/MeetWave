import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { getCurrentUser } from "@/lib/auth";

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const db = await getDb();
    const usersCollection = db.collection("users");
    const matchesCollection = db.collection("matches");
    const eventsCollection = db.collection("events");
    const reportsCollection = db.collection("reports");

    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    const today = new Date(now.setHours(0, 0, 0, 0));

    const [
      totalUsers,
      mau,
      premiumUsers,
      verifiedProfiles,
      pendingVerification,
      totalMatches,
      activeEvents,
      reportsToday,
    ] = await Promise.all([
      usersCollection.countDocuments(),
      usersCollection.countDocuments({ lastActive: { $gte: thirtyDaysAgo } }),
      usersCollection.countDocuments({ premium: true }),
      usersCollection.countDocuments({ verified: true }),
      usersCollection.countDocuments({ status: "pending" }),
      matchesCollection.countDocuments(),
      eventsCollection.countDocuments({ date: { $gte: now } }),
      reportsCollection.countDocuments({ createdAt: { $gte: today } }),
    ]);

    const retentionD30 = totalUsers > 0 ? Math.round((mau / totalUsers) * 100) : 0;

    return NextResponse.json({
      stats: {
        totalUsers,
        mau,
        premiumUsers,
        verifiedProfiles,
        pendingVerification,
        totalMatches,
        activeEvents,
        reportsToday,
        retentionD30,
        nps: 45,
        csat: 4.2,
        arpu: 5.8,
      },
    });
  } catch (error) {
    console.error("Get admin stats error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
