"use client";
import { useState, useRef, useEffect } from "react";
import { Heart, X, Star, MapPin, Zap, CheckCircle, ChevronDown, SlidersHorizontal } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { useAppStore, UserProfile } from "@/store/useAppStore";
import { formatDistance, getCompatibilityLabel } from "@/lib/utils";

const AVATAR_GRADIENTS = [
  "from-rose-400 to-pink-600",
  "from-violet-400 to-purple-600",
  "from-blue-400 to-indigo-600",
  "from-teal-400 to-cyan-600",
  "from-amber-400 to-orange-600",
  "from-green-400 to-emerald-600",
];

export default function DiscoverPage() {
  const { profiles, currentProfileIndex, swipeRight, swipeLeft, fetchProfiles, isAuthenticated } = useAppStore();
  const [showFilters, setShowFilters] = useState(false);
  const [showMatch, setShowMatch] = useState(false);
  const [matchedProfile, setMatchedProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    fetchProfiles();
  }, [fetchProfiles]);
  const [ageRange, setAgeRange] = useState([20, 40]);
  const [maxDistance, setMaxDistance] = useState(30);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [dragging, setDragging] = useState(false);
  const [dragX, setDragX] = useState(0);
  const [likeIndicator, setLikeIndicator] = useState<"like" | "skip" | null>(null);
  const [photoIndex, setPhotoIndex] = useState(0);
  const dragStartX = useRef(0);

  const currentProfile = profiles[currentProfileIndex];

  const handleSwipeRight = async () => {
    if (!currentProfile) return;
    const isMatch = await swipeRight(currentProfile.id);
    if (isMatch) {
      setMatchedProfile(currentProfile);
      setShowMatch(true);
    }
    setPhotoIndex(0);
  };

  const handleSwipeLeft = async () => {
    if (!currentProfile) return;
    await swipeLeft(currentProfile.id);
    setPhotoIndex(0);
  };

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    setDragging(true);
    const x = "touches" in e ? e.touches[0].clientX : e.clientX;
    dragStartX.current = x;
  };

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!dragging) return;
    const x = "touches" in e ? e.touches[0].clientX : e.clientX;
    const diff = x - dragStartX.current;
    setDragX(diff);
    setLikeIndicator(diff > 30 ? "like" : diff < -30 ? "skip" : null);
  };

  const handleDragEnd = () => {
    if (Math.abs(dragX) > 100) {
      dragX > 0 ? handleSwipeRight() : handleSwipeLeft();
    }
    setDragging(false);
    setDragX(0);
    setLikeIndicator(null);
  };

  const compat = currentProfile ? getCompatibilityLabel(currentProfile.compatibilityScore) : null;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="pt-16 md:pt-20 pb-20 md:pb-6">
        <div className="max-w-lg mx-auto px-4 py-4">
          {/* Top bar */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-black text-gray-900">Знакомства</h1>
              <p className="text-sm text-gray-500">Москва · {profiles.length - currentProfileIndex} профилей</p>
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 bg-white text-gray-700 text-sm font-medium hover:bg-gray-50 transition-all shadow-sm"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Фильтры
            </button>
          </div>

          {/* Filters panel */}
          {showFilters && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-5 mb-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-900">Фильтры поиска</h3>
                <button onClick={() => setShowFilters(false)} className="text-gray-400 hover:text-gray-600">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-5">
                <div>
                  <div className="flex justify-between text-sm font-medium text-gray-700 mb-2">
                    <span>Возраст</span>
                    <span className="text-rose-500">{ageRange[0]}–{ageRange[1]} лет</span>
                  </div>
                  <input type="range" min={18} max={60} value={ageRange[1]}
                    onChange={(e) => setAgeRange([ageRange[0], +e.target.value])}
                    className="w-full accent-rose-500" />
                </div>
                <div>
                  <div className="flex justify-between text-sm font-medium text-gray-700 mb-2">
                    <span>Расстояние</span>
                    <span className="text-rose-500">до {maxDistance} км</span>
                  </div>
                  <input type="range" min={1} max={100} value={maxDistance}
                    onChange={(e) => setMaxDistance(+e.target.value)}
                    className="w-full accent-rose-500" />
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-700 mb-2">Цель</div>
                  <div className="flex flex-wrap gap-2">
                    {["Серьёзные", "Общение", "Дружба"].map(g => (
                      <button key={g} className="px-3 py-1.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700 hover:bg-rose-50 hover:text-rose-600 transition-all">
                        {g}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <button
                onClick={() => setShowFilters(false)}
                className="w-full mt-4 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-violet-600 text-white font-semibold text-sm hover:opacity-90 transition-opacity"
              >
                Применить фильтры
              </button>
            </div>
          )}

          {/* Profile card */}
          {currentProfile ? (
            <div className="relative select-none">
              {/* Next card shadow */}
              <div className="absolute inset-x-4 top-3 h-full bg-gray-200 rounded-3xl -z-10" />

              {/* Main card */}
              <div
                className="relative bg-white rounded-3xl overflow-hidden shadow-xl cursor-grab active:cursor-grabbing"
                style={{
                  transform: `translateX(${dragX}px) rotate(${dragX * 0.05}deg)`,
                  transition: dragging ? "none" : "transform 0.3s ease",
                }}
                onMouseDown={handleDragStart}
                onMouseMove={handleDragMove}
                onMouseUp={handleDragEnd}
                onMouseLeave={handleDragEnd}
                onTouchStart={handleDragStart}
                onTouchMove={handleDragMove}
                onTouchEnd={handleDragEnd}
              >
                {/* Like/Skip indicators */}
                {likeIndicator === "like" && (
                  <div className="absolute top-6 left-6 z-20 px-4 py-2 rounded-xl bg-green-500 text-white font-black text-2xl border-4 border-green-400 rotate-[-15deg]">
                    ЛАЙК ❤️
                  </div>
                )}
                {likeIndicator === "skip" && (
                  <div className="absolute top-6 right-6 z-20 px-4 py-2 rounded-xl bg-red-400 text-white font-black text-2xl border-4 border-red-300 rotate-[15deg]">
                    СКИП 👋
                  </div>
                )}

                {/* Photo */}
                <div className={`relative h-[480px] bg-gradient-to-br ${AVATAR_GRADIENTS[currentProfileIndex % AVATAR_GRADIENTS.length]}`}>
                  {/* Photo navigation dots */}
                  {currentProfile.photos.length > 1 && (
                    <div className="absolute top-3 left-0 right-0 flex justify-center gap-1.5 z-10">
                      {currentProfile.photos.map((_, i) => (
                        <div key={i} className={`h-1 rounded-full transition-all ${i === photoIndex ? "w-6 bg-white" : "w-3 bg-white/50"}`} />
                      ))}
                    </div>
                  )}

                  {/* Click zones for photo nav */}
                  <div className="absolute inset-0 flex z-10">
                    <div className="flex-1" onClick={() => setPhotoIndex(Math.max(0, photoIndex - 1))} />
                    <div className="flex-1" onClick={() => setPhotoIndex(Math.min(currentProfile.photos.length - 1, photoIndex + 1))} />
                  </div>

                  {/* Initials avatar */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white font-black text-8xl opacity-30">
                      {currentProfile.name[0]}
                    </span>
                  </div>

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 card-gradient" />

                  {/* Badges */}
                  <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
                    {currentProfile.verified && (
                      <div className="flex items-center gap-1 px-2.5 py-1 bg-white/90 rounded-full text-xs font-semibold text-blue-600">
                        <CheckCircle className="w-3 h-3" /> Верифицирован
                      </div>
                    )}
                    {currentProfile.premium && (
                      <div className="flex items-center gap-1 px-2.5 py-1 bg-amber-400/90 rounded-full text-xs font-semibold text-white">
                        <Star className="w-3 h-3 fill-white" /> Premium
                      </div>
                    )}
                  </div>

                  {/* Profile info overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 text-white z-10">
                    <div className="flex items-end justify-between mb-2">
                      <div>
                        <h2 className="text-3xl font-black">{currentProfile.name}, {currentProfile.age}</h2>
                        <div className="flex items-center gap-1.5 text-white/80 text-sm mt-0.5">
                          <MapPin className="w-3.5 h-3.5" />
                          {currentProfile.city} · {formatDistance(currentProfile.distance)}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`text-sm font-bold ${currentProfile.compatibilityScore >= 80 ? "text-green-300" : "text-white/80"}`}>
                          {currentProfile.compatibilityScore}% совпадение
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {currentProfile.interests.slice(0, 4).map((int) => (
                        <span key={int} className="px-2.5 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium text-white">
                          {int}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card footer */}
                <div className="p-4">
                  <p className="text-gray-700 text-sm leading-relaxed line-clamp-2 mb-3">{currentProfile.bio}</p>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    {currentProfile.job && <span className="bg-gray-100 px-2.5 py-1 rounded-full">{currentProfile.job}</span>}
                    {currentProfile.education && <span className="bg-gray-100 px-2.5 py-1 rounded-full">{currentProfile.education}</span>}
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center justify-center gap-4 mt-5">
                <button
                  onClick={handleSwipeLeft}
                  className="w-14 h-14 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center text-gray-400 hover:border-red-300 hover:text-red-400 hover:scale-110 transition-all shadow-md"
                >
                  <X className="w-7 h-7" />
                </button>
                <button
                  onClick={() => {}}
                  className="w-12 h-12 rounded-full bg-amber-400 flex items-center justify-center text-white hover:scale-110 transition-all shadow-md"
                >
                  <Star className="w-5 h-5 fill-white" />
                </button>
                <button
                  onClick={handleSwipeRight}
                  className="w-14 h-14 rounded-full bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center text-white hover:scale-110 transition-all shadow-md shadow-rose-200"
                >
                  <Heart className="w-7 h-7 fill-white" />
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🎉</div>
              <h3 className="text-2xl font-black text-gray-900 mb-2">Все профили просмотрены!</h3>
              <p className="text-gray-500 mb-6">Новые профили появятся через 30 минут</p>
              <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-rose-500 to-violet-600 text-white font-semibold hover:opacity-90 transition-opacity">
                Расширить критерии поиска
              </button>
            </div>
          )}

          {/* Compatibility hint */}
          {currentProfile && compat && (
            <div className="mt-4 p-3 bg-white rounded-2xl border border-gray-100 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-100 to-violet-100 flex items-center justify-center">
                <Zap className="w-5 h-5 text-rose-500" />
              </div>
              <div>
                <div className={`text-sm font-semibold ${compat.color}`}>{compat.label}</div>
                <div className="text-xs text-gray-500">На основе теста совместимости и интересов</div>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-400 ml-auto" />
            </div>
          )}
        </div>
      </div>

      {/* Match modal */}
      {showMatch && matchedProfile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-8 mx-6 text-center max-w-sm w-full shadow-2xl">
            <div className="text-5xl mb-4">🎉</div>
            <h2 className="text-3xl font-black text-gray-900 mb-2">Это мэтч!</h2>
            <p className="text-gray-500 mb-6">
              Вы понравились друг другу с <span className="font-semibold text-rose-500">{matchedProfile.name}</span>!
            </p>
            <div className="flex justify-center gap-4 mb-6">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-rose-400 to-pink-600 flex items-center justify-center text-white font-black text-2xl">
                A
              </div>
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-rose-500 to-violet-600 flex items-center justify-center text-white self-center">
                <Heart className="w-4 h-4 fill-white" />
              </div>
              <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${AVATAR_GRADIENTS[currentProfileIndex % AVATAR_GRADIENTS.length]} flex items-center justify-center text-white font-black text-2xl`}>
                {matchedProfile.name[0]}
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <button
                onClick={() => { setShowMatch(false); }}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-rose-500 to-violet-600 text-white font-bold hover:opacity-90 transition-opacity"
              >
                Написать {matchedProfile.name}
              </button>
              <button
                onClick={() => setShowMatch(false)}
                className="w-full py-3 rounded-xl border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition-all"
              >
                Продолжить поиск
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
