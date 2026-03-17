import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { DbUser, DbSession } from "@/lib/db-types";
import crypto from "crypto";

function hashPassword(password: string): string {
  return crypto.createHash("sha256").update(password).digest("hex");
}

function generateToken(): string {
  return crypto.randomBytes(32).toString("hex");
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    const db = await getDb();
    const usersCollection = db.collection<DbUser>("users");
    const sessionsCollection = db.collection<DbSession>("sessions");

    const user = await usersCollection.findOne({ email });
    if (!user || user.passwordHash !== hashPassword(password)) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    if (user.status === "blocked") {
      return NextResponse.json(
        { error: "Account is blocked" },
        { status: 403 }
      );
    }

    await usersCollection.updateOne(
      { _id: user._id },
      { $set: { lastActive: new Date() } }
    );

    const token = generateToken();
    const session: DbSession = {
      userId: user._id!,
      token,
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      createdAt: new Date(),
    };
    await sessionsCollection.insertOne(session);

    const response = NextResponse.json({
      success: true,
      user: {
        id: user._id!.toString(),
        name: user.name,
        email: user.email,
        profileProgress: user.profileProgress,
        verified: user.verified,
        premium: user.premium,
      },
    });

    response.cookies.set("session_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 30 * 24 * 60 * 60,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
