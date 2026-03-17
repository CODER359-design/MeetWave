import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
      profileProgress?: number;
      verified?: boolean;
      premium?: boolean;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
  }
}
