import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";

export async function GET() {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    return NextResponse.json({
      user: {
        id: user._id!.toString(),
        name: user.name,
        email: user.email,
        age: user.age,
        city: user.city,
        bio: user.bio,
        photos: user.photos,
        interests: user.interests,
        goal: user.goal,
        job: user.job,
        education: user.education,
        verified: user.verified,
        premium: user.premium,
        profileProgress: user.profileProgress,
        badges: user.badges,
        language: user.language,
      },
    });
  } catch (error) {
    console.error("Get user error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
