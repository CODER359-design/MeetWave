import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { DbUser, DbSession } from "@/lib/db-types";
import { ObjectId } from "mongodb";
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
    const { name, email, password, phone } = body;

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Name, email and password are required" },
        { status: 400 }
      );
    }

    const db = await getDb();
    const usersCollection = db.collection<DbUser>("users");
    const sessionsCollection = db.collection<DbSession>("sessions");

    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 409 }
      );
    }

    const now = new Date();
    const newUser: DbUser = {
      email,
      phone: phone || undefined,
      passwordHash: hashPassword(password),
      name,
      age: 25,
      city: "",
      bio: "",
      photos: [],
      interests: [],
      goal: "",
      verified: false,
      premium: false,
      profileProgress: 10,
      badges: [],
      createdAt: now,
      updatedAt: now,
      lastActive: now,
      status: "pending",
      language: "ru",
    };

    const result = await usersCollection.insertOne(newUser);
    const userId = result.insertedId;

    const token = generateToken();
    const session: DbSession = {
      userId,
      token,
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      createdAt: now,
    };
    await sessionsCollection.insertOne(session);

    const response = NextResponse.json({
      success: true,
      user: {
        id: userId.toString(),
        name: newUser.name,
        email: newUser.email,
        profileProgress: newUser.profileProgress,
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
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
