"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Edit2, Camera, Shield, CheckCircle, Award,
  MapPin, Briefcase, Crown,
  ChevronRight, LogOut, Bell, Lock, Trash2
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { useAppStore } from "@/store/useAppStore";

const BADGE_CONFIG: Record<string, { label: string; icon: string; color: string }> = {
  verified: { label: "Верифицирован", icon: "✅", color: "bg-blue-50 text-blue-600 border-blue-200" },
  "attending-events": { label: "Активный участник", icon: "🎪", color: "bg-violet-50 text-violet-600 border-violet-200" },
  "top-match": { label: "Топ-мэтч", icon: "⭐", color: "bg-amber-50 text-amber-600 border-amber-200" },
};

const PROFILE_SECTIONS = [
  { id: "account", label: "Аккаунт и безопасность", icon: Lock },
  { id: "notifications", label: "Уведомления", icon: Bell },
  { id: "privacy", label: "Приватность", icon: Shield },
];

export default function ProfilePage() {
  const { currentUser, updateProfile, fetchCurrentUser, logout, setLanguage, language } = useAppStore();
  const [editing, setEditing] = useState(false);
  const [bio, setBio] = useState("");
  const [activeTab, setActiveTab] = useState<"profile" | "settings">("profile");

  useEffect(() => {
    fetchCurrentUser();
  }, [fetchCurrentUser]);

  useEffect(() => {
    if (currentUser?.bio) {
      setBio(currentUser.bio);
    }
  }, [currentUser?.bio]);

  const handleSaveProfile = async () => {
    if (editing) {
      await updateProfile({ bio });
    }
    setEditing(!editing);
  };

  const stats = [
    { label: "Лайков", value: "47" },
    { label: "Мэтчей", value: "12" },
    { label: "Событий", value: "3" },
  ];

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-rose-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="pt-16 md:pt-20 pb-20 md:pb-6 max-w-2xl mx-auto px-4 py-6">

        {/* Tabs */}
        <div className="flex gap-1 bg-gray-100 p-1 rounded-xl mb-6">
          {[
            { id: "profile", label: "Профиль" },
            { id: "settings", label: "Настройки" },
          ].map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id as "profile" | "settings")}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === id
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {activeTab === "profile" && (
          <div className="space-y-4">
            {/* Profile card */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              {/* Cover */}
              <div className="h-28 gradient-bg relative">
                <button className="absolute bottom-3 right-3 p-2 bg-black/30 rounded-xl text-white hover:bg-black/50 transition-all">
                  <Camera className="w-4 h-4" />
                </button>
              </div>

              {/* Avatar + info */}
              <div className="px-5 pb-5">
                <div className="flex items-end justify-between -mt-10 mb-4">
                  <div className="relative">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-400 to-indigo-600 border-4 border-white flex items-center justify-center text-white font-black text-2xl shadow-lg">
                      {currentUser.name[0]}
                    </div>
                    <button className="absolute -bottom-1 -right-1 w-7 h-7 bg-rose-500 rounded-full border-2 border-white flex items-center justify-center text-white hover:bg-rose-600 transition-all">
                      <Camera className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <button
                    onClick={handleSaveProfile}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-gray-200 text-gray-700 text-sm font-medium hover:bg-gray-50 transition-all"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    {editing ? "Сохранить" : "Редактировать"}
                  </button>
                </div>

                <div className="mb-3">
                  <div className="flex items-center gap-2 mb-0.5">
                    <h1 className="text-xl font-black text-gray-900">{currentUser.name}, {currentUser.age}</h1>
                    {currentUser.verified && (
                      <Shield className="w-5 h-5 text-blue-500" />
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" /> {currentUser.city || "Москва"}
                    </span>
                    {currentUser.job && (
                      <span className="flex items-center gap-1">
                        <Briefcase className="w-3.5 h-3.5" /> {currentUser.job}
                      </span>
                    )}
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {stats.map(({ label, value }) => (
                    <div key={label} className="text-center p-3 bg-gray-50 rounded-xl">
                      <div className="text-xl font-black text-gray-900">{value}</div>
                      <div className="text-xs text-gray-500">{label}</div>
                    </div>
                  ))}
                </div>

                {/* Bio */}
                {editing ? (
                  <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-rose-400 focus:ring-2 focus:ring-rose-100 outline-none text-sm resize-none"
                    placeholder="Расскажи о себе…"
                  />
                ) : (
                  <p className="text-sm text-gray-600 leading-relaxed">{bio}</p>
                )}
              </div>
            </div>

            {/* Profile completion */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-bold text-gray-900">Заполненность профиля</h2>
                <span className="text-rose-500 font-bold">{currentUser.profileProgress}%</span>
              </div>
              <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden mb-4">
                <div
                  className="h-full bg-gradient-to-r from-rose-500 to-violet-600 rounded-full transition-all duration-500"
                  style={{ width: `${currentUser.profileProgress}%` }}
                />
              </div>
              <div className="space-y-2">
                {[
                  { label: "Фотографии", done: currentUser.photos.length > 0, action: "Добавить фото" },
                  { label: "Биография", done: bio.length > 20, action: "Написать о себе" },
                  { label: "Интересы (3+)", done: currentUser.interests.length >= 3, action: "Выбрать интересы" },
                  { label: "Верификация", done: currentUser.verified, action: "Верифицировать" },
                  { label: "Тест совместимости", done: true, action: "" },
                ].map(({ label, done, action }) => (
                  <div key={label} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`w-4 h-4 rounded-full flex items-center justify-center ${done ? "bg-green-100" : "bg-gray-100"}`}>
                        {done ? <CheckCircle className="w-3 h-3 text-green-500" /> : <div className="w-2 h-2 rounded-full bg-gray-300" />}
                      </div>
                      <span className={`text-sm ${done ? "text-gray-600" : "text-gray-800 font-medium"}`}>{label}</span>
                    </div>
                    {!done && (
                      <button className="text-xs text-rose-500 font-medium hover:text-rose-600">{action}</button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Premium banner */}
            {!currentUser.premium && (
              <Link href="/premium" className="block bg-gradient-to-r from-amber-400 to-orange-500 rounded-2xl p-5 hover:opacity-95 transition-opacity">
                <div className="flex items-center gap-3">
                  <Crown className="w-8 h-8 text-white" />
                  <div className="flex-1">
                    <div className="font-bold text-white">Попробуй Premium</div>
                    <div className="text-white/80 text-sm">Больше мэтчей, суперлайки, кто лайкнул тебя</div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-white" />
                </div>
              </Link>
            )}

            {/* Badges */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <h2 className="font-bold text-gray-900 mb-3">Бейджи и достижения</h2>
              <div className="flex flex-wrap gap-2">
                {["verified", "attending-events"].map((badge) => {
                  const config = BADGE_CONFIG[badge];
                  return config ? (
                    <div key={badge} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-sm font-medium ${config.color}`}>
                      <span>{config.icon}</span>
                      {config.label}
                    </div>
                  ) : null;
                })}
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-dashed border-gray-200 text-sm text-gray-400">
                  <Award className="w-4 h-4" />
                  Открыть больше
                </div>
              </div>
            </div>

            {/* Interests */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-bold text-gray-900">Интересы</h2>
                {editing && <button className="text-xs text-rose-500 font-medium">Редактировать</button>}
              </div>
              <div className="flex flex-wrap gap-2">
                {(currentUser.interests.length > 0 ? currentUser.interests : ["Путешествия", "Кино", "Кофе", "Арт"]).map((int) => (
                  <span key={int} className="px-3 py-1.5 bg-gray-100 rounded-full text-sm text-gray-700">{int}</span>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "settings" && (
          <div className="space-y-4">
            {/* Account sections */}
            {PROFILE_SECTIONS.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                className="w-full bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex items-center gap-3 hover:bg-gray-50 transition-all text-left"
              >
                <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-gray-600" />
                </div>
                <span className="flex-1 font-medium text-gray-800">{label}</span>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </button>
            ))}

            {/* Language */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-lg">🌍</div>
                  <span className="font-medium text-gray-800">Язык</span>
                </div>
                <select className="text-sm text-gray-600 border border-gray-200 rounded-lg px-2 py-1 outline-none">
                  <option>Русский</option>
                  <option>English</option>
                </select>
              </div>
            </div>

            {/* Data & Privacy */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <h3 className="font-bold text-gray-900 mb-3">Данные и приватность (GDPR)</h3>
              <div className="space-y-3">
                <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  <Shield className="w-4 h-4" /> Экспортировать мои данные
                </button>
                <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  <Lock className="w-4 h-4" /> Управление согласиями
                </button>
                <button className="flex items-center gap-2 text-sm text-red-400 hover:text-red-500 transition-colors">
                  <Trash2 className="w-4 h-4" /> Удалить аккаунт
                </button>
              </div>
            </div>

            {/* Logout */}
            <Link
              href="/"
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200 transition-all"
            >
              <LogOut className="w-4 h-4" /> Выйти из аккаунта
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
