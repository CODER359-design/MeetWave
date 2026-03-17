"use client";
import { useEffect } from "react";
import Link from "next/link";
import { Heart, MessageCircle, Star, CheckCircle, MapPin } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { useAppStore } from "@/store/useAppStore";
import { getCompatibilityLabel } from "@/lib/utils";

const AVATAR_GRADIENTS = [
  "from-rose-400 to-pink-600",
  "from-violet-400 to-purple-600",
  "from-blue-400 to-indigo-600",
  "from-teal-400 to-cyan-600",
  "from-amber-400 to-orange-600",
  "from-green-400 to-emerald-600",
];

export default function MatchesPage() {
  const { matches, fetchMatches } = useAppStore();

  useEffect(() => {
    fetchMatches();
  }, [fetchMatches]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="pt-16 md:pt-20 pb-20 md:pb-6 max-w-4xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-black text-gray-900">Мои мэтчи</h1>
            <p className="text-sm text-gray-500">{matches.length} взаимных симпатий</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
            <span>Обновлено только что</span>
          </div>
        </div>

        {/* New matches row */}
        <div className="bg-white rounded-2xl border border-gray-100 p-4 mb-6 shadow-sm">
          <h2 className="text-sm font-semibold text-gray-600 mb-3">Новые мэтчи</h2>
          <div className="flex gap-4 overflow-x-auto pb-1">
            {matches.slice(0, 6).map((match, i) => (
              <Link
                key={match.id}
                href={`/chat?id=c${i + 1}`}
                className="flex-shrink-0 flex flex-col items-center gap-1.5 group"
              >
                <div className="relative">
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${AVATAR_GRADIENTS[i % AVATAR_GRADIENTS.length]} flex items-center justify-center text-white font-black text-xl shadow-md group-hover:scale-105 transition-transform`}>
                    {match.name[0]}
                  </div>
                  {match.verified && (
                    <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 bg-blue-500 rounded-full border-2 border-white flex items-center justify-center">
                      <CheckCircle className="w-3 h-3 text-white" />
                    </div>
                  )}
                  {/* Online dot */}
                  {i < 2 && <div className="absolute top-0 right-0 w-3.5 h-3.5 bg-green-400 rounded-full border-2 border-white" />}
                </div>
                <span className="text-xs font-medium text-gray-700">{match.name}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* All matches grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {matches.map((match, i) => {
            const compat = getCompatibilityLabel(match.compatibilityScore);
            return (
              <div
                key={match.id}
                className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all hover:-translate-y-0.5 group"
              >
                {/* Photo area */}
                <div className={`h-48 bg-gradient-to-br ${AVATAR_GRADIENTS[i % AVATAR_GRADIENTS.length]} relative flex items-center justify-center`}>
                  <span className="text-white font-black text-7xl opacity-25">{match.name[0]}</span>
                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex gap-1.5">
                    {match.verified && (
                      <div className="px-2 py-0.5 bg-white/90 rounded-full text-xs font-semibold text-blue-600 flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" />Верифицирован
                      </div>
                    )}
                  </div>
                  {match.premium && (
                    <div className="absolute top-3 right-3 px-2 py-0.5 bg-amber-400/90 rounded-full text-xs font-semibold text-white flex items-center gap-1">
                      <Star className="w-3 h-3 fill-white" />Premium
                    </div>
                  )}
                  {/* Compat score */}
                  <div className="absolute bottom-3 right-3 px-2.5 py-1 bg-black/40 backdrop-blur-sm rounded-full text-white text-xs font-bold">
                    {match.compatibilityScore}%
                  </div>
                </div>

                {/* Info */}
                <div className="p-4">
                  <div className="flex items-start justify-between mb-1">
                    <div>
                      <h3 className="font-bold text-gray-900">{match.name}, {match.age}</h3>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <MapPin className="w-3 h-3" /> {match.city}
                      </div>
                    </div>
                    <div className={`text-xs font-semibold ${compat.color}`}>{compat.label}</div>
                  </div>

                  <p className="text-xs text-gray-500 line-clamp-2 mb-3">{match.bio}</p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {match.interests.slice(0, 3).map((int) => (
                      <span key={int} className="text-xs bg-gray-100 px-2 py-0.5 rounded-full text-gray-600">{int}</span>
                    ))}
                  </div>

                  <Link
                    href={`/chat?id=c${i + 1}`}
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-violet-600 text-white text-sm font-semibold hover:opacity-90 transition-opacity"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Написать
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {matches.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">💫</div>
            <h3 className="text-xl font-black text-gray-900 mb-2">Пока нет мэтчей</h3>
            <p className="text-gray-500 mb-6">Смотри профили и ставь лайки — взаимные симпатии появятся здесь</p>
            <Link href="/discover" className="px-6 py-3 rounded-xl bg-gradient-to-r from-rose-500 to-violet-600 text-white font-semibold hover:opacity-90 transition-opacity">
              Перейти к поиску
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
