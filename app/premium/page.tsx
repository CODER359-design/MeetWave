"use client";
import { useState } from "react";
import Link from "next/link";
import {
  Crown, CheckCircle, Heart, Star, Eye, Zap, Shield,
  ArrowLeft, Sparkles, ChevronRight
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";

const PLANS = [
  {
    id: "month",
    label: "1 месяц",
    price: 699,
    perMonth: 699,
    badge: null,
    color: "border-gray-200",
  },
  {
    id: "quarter",
    label: "3 месяца",
    price: 1499,
    perMonth: 500,
    badge: "Популярный",
    color: "border-rose-400",
    savings: "Экономия 28%",
  },
  {
    id: "year",
    label: "12 месяцев",
    price: 3999,
    perMonth: 333,
    badge: "Лучшая цена",
    color: "border-violet-400",
    savings: "Экономия 52%",
  },
];

const PREMIUM_FEATURES = [
  {
    icon: Eye,
    title: "Кто тебя лайкнул",
    desc: "Смотри всех, кто уже поставил тебе лайк, и отвечай взаимностью",
    free: false,
    color: "from-rose-400 to-pink-600",
  },
  {
    icon: Heart,
    title: "Безлимитные лайки",
    desc: "Ставь столько лайков, сколько хочешь — без ежедневного лимита",
    free: false,
    color: "from-rose-500 to-violet-600",
  },
  {
    icon: Zap,
    title: "Boost: выйди в топ",
    desc: "Твой профиль показывается первым в течение 30 минут — 5 Boost в месяц",
    free: false,
    color: "from-amber-400 to-orange-500",
  },
  {
    icon: Star,
    title: "Суперлайки",
    desc: "Покажи особый интерес — суперлайкнутые пользователи сразу видят тебя",
    free: false,
    color: "from-violet-400 to-purple-600",
  },
  {
    icon: Shield,
    title: "Расширенные фильтры",
    desc: "Фильтры по образованию, работе, вредным привычкам, целям и образу жизни",
    free: false,
    color: "from-teal-400 to-cyan-600",
  },
  {
    icon: Sparkles,
    title: "Тест совместимости +",
    desc: "Расширенный тест из 20+ вопросов для глубокого анализа совместимости",
    free: false,
    color: "from-blue-400 to-indigo-600",
  },
];

const COMPARE_ROWS = [
  { feature: "Просмотр профилей", free: "До 20 в день", premium: "Безлимитно" },
  { feature: "Лайки", free: "10 в день", premium: "Безлимитно" },
  { feature: "Кто лайкнул тебя", free: "❌", premium: "✅ Всегда" },
  { feature: "Суперлайки", free: "1 в день", premium: "5 в день" },
  { feature: "Boost", free: "❌", premium: "5 в месяц" },
  { feature: "Расширенные фильтры", free: "❌", premium: "✅" },
  { feature: "Просмотр событий", free: "✅", premium: "✅ + приоритет" },
  { feature: "Реклама", free: "Есть", premium: "❌ Без рекламы" },
  { feature: "Поддержка", free: "< 4 ч", premium: "< 15 мин, VIP" },
];

export default function PremiumPage() {
  const [selectedPlan, setSelectedPlan] = useState("quarter");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubscribe = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    setSuccess(true);
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="pt-20 pb-6 flex items-center justify-center min-h-screen px-6">
          <div className="text-center max-w-md">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center mx-auto mb-6 shadow-xl shadow-amber-200">
              <Crown className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-3xl font-black text-gray-900 mb-3">Добро пожаловать в Premium! 🎉</h1>
            <p className="text-gray-500 mb-8">Теперь тебе доступны все функции Premium. Начни использовать их прямо сейчас!</p>
            <Link
              href="/discover"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-400 to-orange-500 text-white font-bold hover:opacity-90 transition-opacity shadow-lg"
            >
              Начать с Premium <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="pt-16 md:pt-20 pb-20 md:pb-6 max-w-3xl mx-auto px-4 py-6">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 border border-amber-200 text-amber-600 text-sm font-medium mb-5">
            <Crown className="w-4 h-4" />
            MeetWave Premium
          </div>
          <h1 className="text-4xl font-black text-gray-900 mb-3">
            Раскрой полный{" "}
            <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
              потенциал
            </span>
          </h1>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            Больше мэтчей, глубже знакомства, умнее алгоритм. Premium пользователи получают в 3× больше мэтчей.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid sm:grid-cols-2 gap-4 mb-8">
          {PREMIUM_FEATURES.map(({ icon: Icon, title, desc, color }) => (
            <div key={title} className="bg-white rounded-2xl border border-gray-100 p-4 flex gap-3 shadow-sm">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center flex-shrink-0`}>
                <Icon className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-semibold text-gray-900 text-sm mb-0.5">{title}</div>
                <div className="text-xs text-gray-500 leading-relaxed">{desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Plans */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6">
          <h2 className="font-black text-gray-900 text-xl mb-5">Выбери план</h2>
          <div className="space-y-3 mb-6">
            {PLANS.map((plan) => (
              <button
                key={plan.id}
                onClick={() => setSelectedPlan(plan.id)}
                className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all text-left ${
                  selectedPlan === plan.id
                    ? plan.id === "quarter"
                      ? "border-rose-400 bg-rose-50"
                      : plan.id === "year"
                      ? "border-violet-400 bg-violet-50"
                      : "border-gray-400 bg-gray-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all ${
                  selectedPlan === plan.id ? "border-rose-500 bg-rose-500" : "border-gray-300"
                }`}>
                  {selectedPlan === plan.id && <div className="w-2 h-2 rounded-full bg-white" />}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-gray-900">{plan.label}</span>
                    {plan.badge && (
                      <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                        plan.badge === "Популярный" ? "bg-rose-100 text-rose-600" : "bg-violet-100 text-violet-600"
                      }`}>
                        {plan.badge}
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-gray-500">
                    {plan.price.toLocaleString()} ₽ · {plan.perMonth} ₽/мес
                  </div>
                </div>
                {plan.savings && (
                  <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-full">
                    {plan.savings}
                  </span>
                )}
              </button>
            ))}
          </div>

          <button
            onClick={handleSubscribe}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-gradient-to-r from-amber-400 to-orange-500 text-white font-bold text-lg hover:opacity-90 transition-opacity shadow-lg shadow-amber-200 disabled:opacity-60"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <><Crown className="w-5 h-5" /> Подключить Premium</>
            )}
          </button>
          <p className="text-center text-xs text-gray-400 mt-3">
            Отменить можно в любой момент · Списание после пробного периода
          </p>
        </div>

        {/* Comparison table */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-6">
          <div className="grid grid-cols-3 bg-gray-50 px-5 py-3">
            <div className="text-sm font-semibold text-gray-600">Функция</div>
            <div className="text-sm font-semibold text-gray-600 text-center">Бесплатно</div>
            <div className="text-sm font-semibold text-amber-600 text-center flex items-center justify-center gap-1">
              <Crown className="w-3.5 h-3.5" /> Premium
            </div>
          </div>
          {COMPARE_ROWS.map(({ feature, free, premium }, i) => (
            <div key={feature} className={`grid grid-cols-3 px-5 py-3 ${i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}`}>
              <div className="text-sm text-gray-700">{feature}</div>
              <div className="text-sm text-gray-500 text-center">{free}</div>
              <div className="text-sm font-medium text-amber-600 text-center">{premium}</div>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <h2 className="font-bold text-gray-900 mb-4">Частые вопросы</h2>
          <div className="space-y-4">
            {[
              { q: "Как отменить подписку?", a: "Отмена доступна в любой момент в разделе Профиль → Аккаунт. Доступ сохраняется до конца оплаченного периода." },
              { q: "Возвращают ли деньги?", a: "Да, в течение 14 дней с момента первой подписки по запросу в поддержку." },
              { q: "Как работает Boost?", a: "Boost поднимает твой профиль в топ показа на 30 минут — в это время тебя видит максимальное число людей." },
            ].map(({ q, a }) => (
              <div key={q}>
                <div className="font-medium text-gray-900 text-sm mb-1">{q}</div>
                <div className="text-sm text-gray-500">{a}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
