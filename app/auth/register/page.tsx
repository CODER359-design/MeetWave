"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Heart, Eye, EyeOff, ArrowRight, CheckCircle } from "lucide-react";
import { useAppStore } from "@/store/useAppStore";

const PERKS = [
  "Верификация личности — без фейков",
  "Тест совместимости из 7 вопросов",
  "Живые события и кофе-встречи",
  "Умные ледоколы для первого чата",
];

const REGISTER_BUBBLES = Array.from({ length: 15 }, (_, index) => {
  const seed = index + 3;
  const random = (multiplier: number, modulo: number, offset = 0) =>
    ((seed * multiplier) % modulo) + offset;

  return {
    width: 30 + random(11, 70),
    height: 30 + random(7, 70),
    top: `${random(17, 100)}%`,
    left: `${random(29, 100)}%`,
    opacity: 0.08 + random(9, 30) / 100,
  };
});

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAppStore();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "" });
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState("");
  const [oauthLoading, setOauthLoading] = useState<"google" | "apple" | null>(null);

  const handleOAuthSignIn = async (provider: "google" | "apple") => {
    setOauthLoading(provider);
    await signIn(provider, { callbackUrl: "/onboarding" });
  };

  const handleNext = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (step === 1) { setStep(2); return; }
    if (step === 2) {
      setLoading(true);
      await new Promise((r) => setTimeout(r, 800));
      setLoading(false);
      setStep(3);
      return;
    }
    setLoading(true);
    const success = await register(form.name, form.email, form.password);
    if (success) {
      router.push("/onboarding");
    } else {
      setError("Ошибка регистрации. Попробуйте снова.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left: form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <Link href="/" className="flex items-center gap-2 mb-10">
            <div className="w-8 h-8 rounded-xl gradient-bg flex items-center justify-center">
              <Heart className="w-4 h-4 text-white fill-white" />
            </div>
            <span className="font-bold text-xl bg-gradient-to-r from-rose-500 to-violet-600 bg-clip-text text-transparent">
              MeetWave
            </span>
          </Link>

          {/* Progress */}
          <div className="flex gap-2 mb-8">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`flex-1 h-1.5 rounded-full transition-all duration-500 ${
                  s <= step ? "bg-gradient-to-r from-rose-500 to-violet-600" : "bg-gray-200"
                }`}
              />
            ))}
          </div>

          {step === 1 && (
            <>
              <h1 className="text-3xl font-black text-gray-900 mb-2">Создай аккаунт</h1>
              <p className="text-gray-500 mb-8">Бесплатно, без подписки для старта</p>

              <div className="grid grid-cols-2 gap-3 mb-6">
                <button
                  onClick={() => handleOAuthSignIn("google")}
                  disabled={oauthLoading !== null}
                  className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-gray-200 text-gray-700 font-medium text-sm hover:bg-gray-50 transition-all disabled:opacity-60"
                >
                  {oauthLoading === "google" ? (
                    <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                  )}
                  Google
                </button>
                <button
                  onClick={() => handleOAuthSignIn("apple")}
                  disabled={oauthLoading !== null}
                  className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-gray-200 text-gray-700 font-medium text-sm hover:bg-gray-50 transition-all disabled:opacity-60"
                >
                  {oauthLoading === "apple" ? (
                    <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                    </svg>
                  )}
                  Apple
                </button>
              </div>

              <div className="flex items-center gap-3 mb-6">
                <div className="flex-1 h-px bg-gray-200" />
                <span className="text-sm text-gray-400">или</span>
                <div className="flex-1 h-px bg-gray-200" />
              </div>

              <form onSubmit={handleNext} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Имя</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Как тебя зовут?"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-rose-400 focus:ring-2 focus:ring-rose-100 outline-none transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-rose-400 focus:ring-2 focus:ring-rose-100 outline-none transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Пароль</label>
                  <div className="relative">
                    <input
                      type={showPw ? "text" : "password"}
                      value={form.password}
                      onChange={(e) => setForm({ ...form, password: e.target.value })}
                      placeholder="Минимум 8 символов"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-rose-400 focus:ring-2 focus:ring-rose-100 outline-none transition-all pr-12"
                      required
                      minLength={8}
                    />
                    <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                      {showPw ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
                <label className="flex items-start gap-2 cursor-pointer">
                  <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="mt-0.5 rounded border-gray-300 text-rose-500" required />
                  <span className="text-sm text-gray-600">
                    Согласен с{" "}
                    <a href="#" className="text-rose-500 hover:underline">условиями использования</a>{" "}
                    и{" "}
                    <a href="#" className="text-rose-500 hover:underline">политикой конфиденциальности</a>
                  </span>
                </label>
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-rose-500 to-violet-600 text-white font-bold hover:opacity-90 transition-opacity shadow-lg shadow-rose-200"
                >
                  Продолжить <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </>
          )}

          {step === 2 && (
            <>
              <h1 className="text-3xl font-black text-gray-900 mb-2">Подтверди телефон</h1>
              <p className="text-gray-500 mb-8">Это помогает защитить твой аккаунт от фейков</p>
              <form onSubmit={handleNext} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Номер телефона</label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="+7 (999) 000-00-00"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-rose-400 focus:ring-2 focus:ring-rose-100 outline-none transition-all"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-rose-500 to-violet-600 text-white font-bold hover:opacity-90 transition-opacity shadow-lg shadow-rose-200 disabled:opacity-60"
                >
                  {loading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <>Отправить код <ArrowRight className="w-4 h-4" /></>}
                </button>
              </form>
            </>
          )}

          {step === 3 && (
            <>
              <h1 className="text-3xl font-black text-gray-900 mb-2">Введи код</h1>
              <p className="text-gray-500 mb-8">
                Отправили SMS на номер <span className="font-medium text-gray-800">{form.phone || "+7 (999) 000-00-00"}</span>
              </p>
              <form onSubmit={handleNext} className="space-y-4">
                <div className="flex gap-3 justify-center">
                  {[0,1,2,3,4,5].map((i) => (
                    <input
                      key={i}
                      type="text"
                      maxLength={1}
                      value={otp[i] || ""}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, "");
                        const next = otp.split("");
                        next[i] = val;
                        setOtp(next.join("").slice(0, 6));
                        if (val && i < 5) {
                          const inputs = document.querySelectorAll<HTMLInputElement>(".otp-input");
                          inputs[i + 1]?.focus();
                        }
                      }}
                      className="otp-input w-12 h-14 text-center text-2xl font-bold border-2 border-gray-200 rounded-xl focus:border-rose-400 focus:ring-2 focus:ring-rose-100 outline-none transition-all"
                    />
                  ))}
                </div>
                <p className="text-center text-sm text-gray-500">
                  Не получил код?{" "}
                  <button type="button" className="text-rose-500 font-medium hover:text-rose-600">Отправить повторно</button>
                </p>
                <button
                  type="submit"
                  disabled={loading || otp.length < 6}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-rose-500 to-violet-600 text-white font-bold hover:opacity-90 transition-opacity shadow-lg shadow-rose-200 disabled:opacity-60"
                >
                  {loading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <>Подтвердить <ArrowRight className="w-4 h-4" /></>}
                </button>
              </form>
            </>
          )}

          <p className="text-center text-sm text-gray-500 mt-6">
            Уже есть аккаунт?{" "}
            <Link href="/auth/login" className="text-rose-500 font-semibold hover:text-rose-600">Войти</Link>
          </p>
        </div>
      </div>

      {/* Right: perks */}
      <div className="hidden lg:flex flex-1 gradient-bg items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          {REGISTER_BUBBLES.map((bubble, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white"
              style={{
                width: bubble.width,
                height: bubble.height,
                top: bubble.top,
                left: bubble.left,
                opacity: bubble.opacity,
              }}
            />
          ))}
        </div>
        <div className="relative text-white">
          <div className="text-6xl mb-6 text-center">🌊</div>
          <h2 className="text-3xl font-black mb-3 text-center">Начни новую волну</h2>
          <p className="text-white/80 text-center mb-8 max-w-xs mx-auto">Платформа для осознанных знакомств. Без фейков. Без случайных свайпов.</p>
          <div className="space-y-3">
            {PERKS.map((perk) => (
              <div key={perk} className="flex items-center gap-3 bg-white/10 rounded-xl px-4 py-3">
                <CheckCircle className="w-5 h-5 text-white flex-shrink-0" />
                <span className="text-sm font-medium">{perk}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
