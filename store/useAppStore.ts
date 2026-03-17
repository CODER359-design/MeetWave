import { create } from "zustand";

export type UserProfile = {
  id: string;
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
  compatibilityScore: number;
  distance: number;
};

export type ChatMessage = {
  id: string;
  senderId: string;
  text: string;
  timestamp: Date;
  read: boolean;
  type: "text" | "image" | "voice" | "icebreaker";
};

export type Conversation = {
  id: string;
  user: {
    id: string;
    name: string;
    photos: string[];
    verified: boolean;
    compatibilityScore: number;
  };
  lastMessage: ChatMessage | null;
  unreadCount: number;
  matchedAt: Date;
};

type CurrentUser = {
  id: string;
  name: string;
  age: number;
  city: string;
  bio: string;
  photos: string[];
  interests: string[];
  goal: string;
  verified: boolean;
  premium: boolean;
  profileProgress: number;
  badges: string[];
  job: string;
  education: string;
};

type AppState = {
  isAuthenticated: boolean;
  isLoading: boolean;
  currentUser: CurrentUser | null;
  profiles: UserProfile[];
  currentProfileIndex: number;
  matches: UserProfile[];
  conversations: Conversation[];
  activeConversationId: string | null;
  messages: Record<string, ChatMessage[]>;
  isOnboarded: boolean;
  onboardingStep: number;
  notifications: number;
  language: "ru" | "en";

  // Auth actions
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  fetchCurrentUser: () => Promise<void>;

  // Profile actions
  fetchProfiles: () => Promise<void>;
  swipeRight: (profileId: string) => Promise<boolean>;
  swipeLeft: (profileId: string) => Promise<void>;
  updateProfile: (data: Partial<CurrentUser>) => Promise<void>;

  // Matches & Chat actions
  fetchMatches: () => Promise<void>;
  fetchConversations: () => Promise<void>;
  fetchMessages: (matchId: string) => Promise<void>;
  sendMessage: (matchId: string, text: string) => Promise<void>;
  setActiveConversation: (id: string | null) => void;

  // Onboarding
  setOnboardingStep: (step: number) => void;
  completeOnboarding: () => Promise<void>;

  // Settings
  setLanguage: (lang: "ru" | "en") => void;
};

export const useAppStore = create<AppState>((set, get) => ({
  isAuthenticated: false,
  isLoading: true,
  currentUser: null,
  profiles: [],
  currentProfileIndex: 0,
  matches: [],
  conversations: [],
  activeConversationId: null,
  messages: {},
  isOnboarded: false,
  onboardingStep: 0,
  notifications: 0,
  language: "ru",

  // Auth
  login: async (email, password) => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) return false;
      const data = await res.json();
      set({
        isAuthenticated: true,
        currentUser: {
          id: data.user.id,
          name: data.user.name,
          age: 25,
          city: "",
          bio: "",
          photos: [],
          interests: [],
          goal: "",
          verified: data.user.verified || false,
          premium: data.user.premium || false,
          profileProgress: data.user.profileProgress || 10,
          badges: [],
          job: "",
          education: "",
        },
      });
      return true;
    } catch {
      return false;
    }
  },

  register: async (name, email, password) => {
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      if (!res.ok) return false;
      const data = await res.json();
      set({
        isAuthenticated: true,
        currentUser: {
          id: data.user.id,
          name: data.user.name,
          age: 25,
          city: "",
          bio: "",
          photos: [],
          interests: [],
          goal: "",
          verified: false,
          premium: false,
          profileProgress: data.user.profileProgress || 10,
          badges: [],
          job: "",
          education: "",
        },
      });
      return true;
    } catch {
      return false;
    }
  },

  logout: () => {
    document.cookie = "session_token=; Max-Age=0; path=/";
    set({
      isAuthenticated: false,
      currentUser: null,
      profiles: [],
      matches: [],
      conversations: [],
      messages: {},
    });
  },

  fetchCurrentUser: async () => {
    try {
      set({ isLoading: true });
      const res = await fetch("/api/auth/me");
      if (!res.ok) {
        set({ isAuthenticated: false, isLoading: false });
        return;
      }
      const data = await res.json();
      set({
        isAuthenticated: true,
        isLoading: false,
        currentUser: {
          id: data.user.id,
          name: data.user.name,
          age: data.user.age,
          city: data.user.city,
          bio: data.user.bio,
          photos: data.user.photos,
          interests: data.user.interests,
          goal: data.user.goal,
          verified: data.user.verified,
          premium: data.user.premium,
          profileProgress: data.user.profileProgress,
          badges: data.user.badges || [],
          job: data.user.job || "",
          education: data.user.education || "",
        },
        language: data.user.language || "ru",
        isOnboarded: data.user.profileProgress > 50,
      });
    } catch {
      set({ isAuthenticated: false, isLoading: false });
    }
  },

  // Profiles
  fetchProfiles: async () => {
    try {
      const res = await fetch("/api/profiles");
      if (!res.ok) return;
      const data = await res.json();
      set({ profiles: data.profiles, currentProfileIndex: 0 });
    } catch {
      console.error("Failed to fetch profiles");
    }
  },

  swipeRight: async (profileId) => {
    try {
      const res = await fetch("/api/swipes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ targetUserId: profileId, action: "like" }),
      });
      if (!res.ok) return false;
      const data = await res.json();
      set((state) => ({
        currentProfileIndex: state.currentProfileIndex + 1,
      }));
      if (data.isMatch) {
        get().fetchMatches();
      }
      return data.isMatch;
    } catch {
      return false;
    }
  },

  swipeLeft: async (profileId) => {
    try {
      await fetch("/api/swipes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ targetUserId: profileId, action: "skip" }),
      });
      set((state) => ({
        currentProfileIndex: state.currentProfileIndex + 1,
      }));
    } catch {
      console.error("Failed to swipe left");
    }
  },

  updateProfile: async (data) => {
    try {
      const res = await fetch("/api/profiles", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) return;
      const result = await res.json();
      set((state) => ({
        currentUser: state.currentUser
          ? {
              ...state.currentUser,
              ...data,
              profileProgress: result.profileProgress || state.currentUser.profileProgress,
            }
          : null,
      }));
    } catch {
      console.error("Failed to update profile");
    }
  },

  // Matches
  fetchMatches: async () => {
    try {
      const res = await fetch("/api/matches");
      if (!res.ok) return;
      const data = await res.json();
      const matches = data.matches.map((m: { user: UserProfile }) => m.user);
      set({ matches });
    } catch {
      console.error("Failed to fetch matches");
    }
  },

  // Conversations
  fetchConversations: async () => {
    try {
      const res = await fetch("/api/chats");
      if (!res.ok) return;
      const data = await res.json();
      const unread = data.conversations.reduce(
        (sum: number, c: Conversation) => sum + c.unreadCount,
        0
      );
      set({ conversations: data.conversations, notifications: unread });
    } catch {
      console.error("Failed to fetch conversations");
    }
  },

  fetchMessages: async (matchId) => {
    try {
      const res = await fetch(`/api/chats/${matchId}`);
      if (!res.ok) return;
      const data = await res.json();
      set((state) => ({
        messages: {
          ...state.messages,
          [matchId]: data.messages.map((m: ChatMessage) => ({
            ...m,
            timestamp: new Date(m.timestamp),
          })),
        },
      }));
    } catch {
      console.error("Failed to fetch messages");
    }
  },

  sendMessage: async (matchId, text) => {
    try {
      const res = await fetch(`/api/chats/${matchId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      if (!res.ok) return;
      const data = await res.json();
      const newMessage: ChatMessage = {
        id: data.message.id,
        senderId: data.message.senderId,
        text: data.message.text,
        timestamp: new Date(data.message.timestamp),
        read: false,
        type: "text",
      };
      set((state) => ({
        messages: {
          ...state.messages,
          [matchId]: [...(state.messages[matchId] || []), newMessage],
        },
        conversations: state.conversations.map((c) =>
          c.id === matchId ? { ...c, lastMessage: newMessage } : c
        ),
      }));
    } catch {
      console.error("Failed to send message");
    }
  },

  setActiveConversation: (id) => {
    set({ activeConversationId: id });
    if (id) {
      get().fetchMessages(id);
      set((state) => ({
        conversations: state.conversations.map((c) =>
          c.id === id ? { ...c, unreadCount: 0 } : c
        ),
        notifications: Math.max(0, state.notifications - 1),
      }));
    }
  },

  // Onboarding
  setOnboardingStep: (step) => set({ onboardingStep: step }),

  completeOnboarding: async () => {
    const user = get().currentUser;
    if (user) {
      await get().updateProfile({ ...user, profileProgress: 85 } as Partial<CurrentUser>);
    }
    set({ isOnboarded: true });
  },

  // Settings
  setLanguage: (lang) => {
    set({ language: lang });
    get().updateProfile({ language: lang } as unknown as Partial<CurrentUser>);
  },
}));
