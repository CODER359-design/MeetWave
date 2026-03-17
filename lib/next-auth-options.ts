import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import AppleProvider from "next-auth/providers/apple";
import { getDb } from "./mongodb";
import { DbUser } from "./db-types";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    AppleProvider({
      clientId: process.env.APPLE_ID!,
      clientSecret: process.env.APPLE_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      if (!user.email) return false;

      try {
        const db = await getDb();
        const usersCollection = db.collection<DbUser>("users");

        const existingUser = await usersCollection.findOne({ email: user.email });

        if (!existingUser) {
          const now = new Date();
          const newUser: DbUser = {
            email: user.email,
            name: user.name || "User",
            age: 25,
            city: "",
            bio: "",
            photos: user.image ? [user.image] : [],
            interests: [],
            goal: "",
            verified: true,
            premium: false,
            profileProgress: 20,
            badges: ["verified"],
            createdAt: now,
            updatedAt: now,
            lastActive: now,
            status: "pending",
            language: "ru",
          };
          await usersCollection.insertOne(newUser);
        } else {
          await usersCollection.updateOne(
            { email: user.email },
            { $set: { lastActive: new Date() } }
          );
        }

        return true;
      } catch (error) {
        console.error("OAuth sign in error:", error);
        return false;
      }
    },
    async session({ session }) {
      if (session.user?.email) {
        const db = await getDb();
        const usersCollection = db.collection<DbUser>("users");
        const dbUser = await usersCollection.findOne({ email: session.user.email });

        if (dbUser) {
          session.user.id = dbUser._id!.toString();
          session.user.profileProgress = dbUser.profileProgress;
          session.user.verified = dbUser.verified;
          session.user.premium = dbUser.premium;
        }
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
  pages: {
    signIn: "/auth/login",
    newUser: "/onboarding",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
