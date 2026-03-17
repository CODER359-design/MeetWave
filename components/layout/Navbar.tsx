"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart, MessageCircle, Calendar, User, Compass, Crown, Bell } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/store/useAppStore";

const NAV_ITEMS = [
  { href: "/discover", icon: Compass, label: "Поиск" },
  { href: "/matches", icon: Heart, label: "Мэтчи" },
  { href: "/chat", icon: MessageCircle, label: "Чаты" },
  { href: "/events", icon: Calendar, label: "События" },
  { href: "/profile", icon: User, label: "Профиль" },
];

export function Navbar() {
  const pathname = usePathname();
  const { notifications, conversations } = useAppStore();
  const unreadChats = conversations.reduce((sum, c) => sum + c.unreadCount, 0);

  return (
    <>
      {/* Desktop top navbar */}
      <nav className="hidden md:flex fixed top-0 left-0 right-0 z-50 glass border-b border-gray-200/50 h-16">
        <div className="max-w-6xl mx-auto w-full flex items-center justify-between px-6">
          <Link href="/discover" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl gradient-bg flex items-center justify-center">
              <Heart className="w-4 h-4 text-white fill-white" />
            </div>
            <span className="font-bold text-xl bg-gradient-to-r from-rose-500 to-violet-600 bg-clip-text text-transparent">
              MeetWave
            </span>
          </Link>

          <div className="flex items-center gap-1">
            {NAV_ITEMS.map(({ href, icon: Icon, label }) => {
              const active = pathname.startsWith(href);
              const badge = href === "/chat" ? unreadChats : 0;
              return (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    "relative flex flex-col items-center gap-0.5 px-4 py-2 rounded-xl transition-all duration-200 text-sm font-medium",
                    active
                      ? "text-rose-500 bg-rose-50"
                      : "text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                  )}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-xs">{label}</span>
                  {badge > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                      {badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            <button className="relative p-2 rounded-xl text-gray-500 hover:text-gray-800 hover:bg-gray-100 transition-all">
              <Bell className="w-5 h-5" />
              {notifications > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full" />
              )}
            </button>
            <Link
              href="/premium"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 text-white text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              <Crown className="w-3.5 h-3.5" />
              Premium
            </Link>
          </div>
        </div>
      </nav>

      {/* Mobile bottom navbar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 glass border-t border-gray-200/50 safe-area-pb">
        <div className="flex items-center justify-around px-2 py-2">
          {NAV_ITEMS.map(({ href, icon: Icon, label }) => {
            const active = pathname.startsWith(href);
            const badge = href === "/chat" ? unreadChats : 0;
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "relative flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all duration-200",
                  active ? "text-rose-500" : "text-gray-400"
                )}
              >
                <Icon className={cn("w-6 h-6", active && "fill-rose-100")} />
                <span className="text-[10px] font-medium">{label}</span>
                {badge > 0 && (
                  <span className="absolute top-0 right-1 w-4 h-4 bg-rose-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                    {badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
