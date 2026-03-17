import { ObjectId } from "mongodb";

export interface DbUser {
  _id?: ObjectId;
  email: string;
  phone?: string;
  passwordHash?: string;
  name: string;
  age: number;
  city: string;
  bio: string;
  photos: string[];
  interests: string[];
  goal: string;
  job?: string;
  education?: string;
  verified: boolean;
  premium: boolean;
  premiumUntil?: Date;
  profileProgress: number;
  badges: string[];
  compatibilityAnswers?: Record<string, number>;
  createdAt: Date;
  updatedAt: Date;
  lastActive: Date;
  status: "active" | "pending" | "blocked";
  language: "ru" | "en";
}

export interface DbSwipe {
  _id?: ObjectId;
  fromUserId: ObjectId;
  toUserId: ObjectId;
  action: "like" | "skip" | "superlike";
  createdAt: Date;
}

export interface DbMatch {
  _id?: ObjectId;
  user1Id: ObjectId;
  user2Id: ObjectId;
  matchedAt: Date;
  lastActivity?: Date;
}

export interface DbMessage {
  _id?: ObjectId;
  matchId: ObjectId;
  senderId: ObjectId;
  text: string;
  type: "text" | "image" | "voice" | "icebreaker";
  read: boolean;
  createdAt: Date;
}

export interface DbEvent {
  _id?: ObjectId;
  title: string;
  description: string;
  category: string;
  date: Date;
  time: string;
  city: string;
  isOnline: boolean;
  capacity: number;
  registered: number;
  price: number;
  organizer: string;
  tags: string[];
  createdAt: Date;
}

export interface DbEventRegistration {
  _id?: ObjectId;
  eventId: ObjectId;
  userId: ObjectId;
  registeredAt: Date;
  status: "confirmed" | "cancelled" | "waitlist";
}

export interface DbReport {
  _id?: ObjectId;
  reporterId: ObjectId;
  reportedId: ObjectId;
  reason: string;
  description?: string;
  status: "pending" | "reviewed" | "banned" | "dismissed";
  createdAt: Date;
  reviewedAt?: Date;
  reviewedBy?: ObjectId;
}

export interface DbSession {
  _id?: ObjectId;
  userId: ObjectId;
  token: string;
  expiresAt: Date;
  createdAt: Date;
}
