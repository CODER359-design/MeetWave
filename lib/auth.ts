import { cookies } from "next/headers";
import { getDb } from "./mongodb";
import { DbUser, DbSession } from "./db-types";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function getCurrentUser(): Promise<DbUser | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("session_token")?.value;

    const db = await getDb();
    const sessionsCollection = db.collection<DbSession>("sessions");
    const usersCollection = db.collection<DbUser>("users");

    if (token) {
      const session = await sessionsCollection.findOne({
        token,
        expiresAt: { $gt: new Date() },
      });

      if (session) {
        const user = await usersCollection.findOne({ _id: session.userId });
        if (user) {
          return user;
        }
      }
    }

    const nextAuthSession = await getServerSession(authOptions);
    const email = nextAuthSession?.user?.email;
    if (!email) {
      return null;
    }

    const oauthUser = await usersCollection.findOne({ email });
    return oauthUser;
  } catch (error) {
    console.error("Auth error:", error);
    return null;
  }
}

export async function requireAuth(): Promise<DbUser> {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("Unauthorized");
  }
  return user;
}
