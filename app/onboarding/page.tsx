"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Heart, ArrowRight, ArrowLeft, Camera, CheckCircle, Sparkles } from "lucide-react";
import { INTERESTS, GOALS, COMPATIBILITY_QUESTIONS } from "@/lib/mock-data";
import { useAppStore } from "@/store/useAppStore";

const STEPS = [
  { id: 1, title: "Расскажи о себе", subtitle: "Как тебя зовут и сколько лет?" },
  { id: 2, title: "Твои интересы", subtitle: "Выбери минимум 3 темы" },
  { id: 3, title: "Твои фото", subtitle: "Добавь от 2 до 6 фото" },
  { id: 4, title: "Цель знакомства", subtitle: "Что ты ищешь?" },
  { id: 5, title: "Тест совместимости", subtitle: "5 вопросов — алгоритм подберёт тебе лучших людей" },
  { id: 6, title: "Верификация", subtitle: "Подтверди личность — для безопасности всех" },
];

const PHOTO_SLOTS = [0, 1, 2, 3, 4, 5];

export default function OnboardingPage() {
  const router = useRouter();
  const { completeOnboarding, updateProfile } = useAppStore();
  const [step, setStep] = useState(0);
  const [bio, setBio] = useState("");
  const [job, setJob] = useState("");
  const [education, setEducation] = useState("");
  const [age, setAge] = useState(25);
  const [city, setCity] = useState("Москва");
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [uploadedPhotos, setUploadedPhotos] = useState<number[]>([]);
  const [selectedGoal, setSelectedGoal] = useState("");
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [verifying, setVerifying] = useState(false);
  const [verified, setVerified] = useState(false);

  const progress = ((step + 1) / STEPS.length) * 100;

  const toggleInterest = (interest: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]
    );
  };

  const handleNext = async () => {
    if (step < STEPS.length - 1) {
      setStep(step + 1);
    } else {
      updateProfile({ bio, job, education, age, city, interests: selectedInterests, goal: selectedGoal });
      completeOnboarding();
      router.push("/discover");
    }
  };

  const handleVerify = async () => {
    setVerifying(true);
    await new Promise((r) => setTimeout(r, 2500));
    setVerifying(false);
    setVerified(true);
  };

  const canContinue = () => {
    if (step === 0) return bio.trim().length > 10;
    if (step === 1) return selectedInterests.length >= 3;
    if (step === 2) return uploadedPhotos.length >= 1;
    if (step === 3) return selectedGoal !== "";
    if (step === 4) return Object.keys(answers).length >= 5;
    return true;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-6 py-4">
        <div className="max-w-2xl mx-auto flex items-center gap-4">
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="w-7 h-7 rounded-lg gradient-bg flex items-center justify-center">
              <Heart className="w-3.5 h-3.5 text-white fill-white" />
            </div>
            <span className="font-bold text-lg bg-gradient-to-r from-rose-500 to-violet-600 bg-clip-text text-transparent">
              MeetWave
            </span>
          </div>
          <div className="flex-1">
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>{STEPS[step].title}</span>
              <span>{step + 1} / {STEPS.length}</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-rose-500 to-violet-600 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center px-6 py-8">
        <div className="w-full max-w-2xl">
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
            <h2 className="text-2xl font-black text-gray-900 mb-1">{STEPS[step].title}</h2>
            <p className="text-gray-500 mb-8">{STEPS[step].subtitle}</p>

            {/* Step 0: Basic info */}
            {step === 0 && (
              <div className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Возраст</label>
                    <input
                      type="number"
                      value={age}
                      onChange={(e) => setAge(Number(e.target.value))}
                      min={18} max={80}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-rose-400 focus:ring-2 focus:ring-rose-100 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Город</label>
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-rose-400 focus:ring-2 focus:ring-rose-100 outline-none transition-all bg-white"
                    >
                      {["Москва", "Санкт-Петербург", "Казань", "Екатеринбург", "Новосибирск", "Краснодар"].map(c => (
                        <option key={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Работа</label>
                  <input
                    type="text"
                    value={job}
                    onChange={(e) => setJob(e.target.value)}
                    placeholder="Профессия или компания"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-rose-400 focus:ring-2 focus:ring-rose-100 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Образование</label>
                  <input
                    type="text"
                    value={education}
                    onChange={(e) => setEducation(e.target.value)}
                    placeholder="Университет или специальность"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-rose-400 focus:ring-2 focus:ring-rose-100 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Биография <span className="text-gray-400">({bio.length}/300)</span>
                  </label>
                  <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value.slice(0, 300))}
                    placeholder="Расскажи о себе — что тебя вдохновляет, чем занимаешься, что ищешь…"
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-rose-400 focus:ring-2 focus:ring-rose-100 outline-none transition-all resize-none"
                  />
                </div>
              </div>
            )}

            {/* Step 1: Interests */}
            {step === 1 && (
              <div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {INTERESTS.map((interest) => (
                    <button
                      key={interest}
                      onClick={() => toggleInterest(interest)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                        selectedInterests.includes(interest)
                          ? "bg-gradient-to-r from-rose-500 to-violet-600 text-white shadow-md"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {interest}
                    </button>
                  ))}
                </div>
                <p className="text-sm text-gray-500">
                  Выбрано: <span className="font-semibold text-rose-500">{selectedInterests.length}</span>
                  {selectedInterests.length < 3 && " (нужно минимум 3)"}
                </p>
              </div>
            )}

            {/* Step 2: Photos */}
            {step === 2 && (
              <div>
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {PHOTO_SLOTS.map((i) => (
                    <button
                      key={i}
                      onClick={() => !uploadedPhotos.includes(i) && setUploadedPhotos([...uploadedPhotos, i])}
                      className={`aspect-square rounded-2xl border-2 border-dashed flex flex-col items-center justify-center transition-all ${
                        uploadedPhotos.includes(i)
                          ? "border-rose-300 bg-gradient-to-br from-rose-50 to-violet-50"
                          : "border-gray-200 hover:border-rose-300 hover:bg-rose-50"
                      }`}
                    >
                      {uploadedPhotos.includes(i) ? (
                        <div className="text-center">
                          <div className={`w-full h-full absolute inset-0 rounded-2xl bg-gradient-to-br from-rose-${(i * 100) % 400 + 200} to-violet-400 opacity-30`} />
                          <CheckCircle className="w-8 h-8 text-rose-500 mx-auto mb-1" />
                          <span className="text-xs text-rose-500 font-medium">Добавлено</span>
                        </div>
                      ) : (
                        <div className="text-center">
                          <Camera className="w-8 h-8 text-gray-300 mx-auto mb-1" />
                          <span className="text-xs text-gray-400">{i === 0 ? "Главное фото" : `Фото ${i + 1}`}</span>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
                <p className="text-sm text-gray-500">
                  Добавлено: <span className="font-semibold">{uploadedPhotos.length}</span> из 6 фото
                  {uploadedPhotos.length === 0 && " — нужно минимум 1"}
                </p>
              </div>
            )}

            {/* Step 3: Goal */}
            {step === 3 && (
              <div className="space-y-3">
                {GOALS.map((goal) => (
                  <button
                    key={goal}
                    onClick={() => setSelectedGoal(goal)}
                    className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all text-left ${
                      selectedGoal === goal
                        ? "border-rose-400 bg-rose-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-full border-2 flex-shrink-0 transition-all ${
                      selectedGoal === goal ? "border-rose-500 bg-rose-500" : "border-gray-300"
                    }`}>
                      {selectedGoal === goal && <div className="w-full h-full rounded-full bg-white scale-50 block" />}
                    </div>
                    <span className={`font-medium ${selectedGoal === goal ? "text-rose-600" : "text-gray-700"}`}>
                      {goal}
                    </span>
                  </button>
                ))}
              </div>
            )}

            {/* Step 4: Compatibility test */}
            {step === 4 && (
              <div className="space-y-8">
                {COMPATIBILITY_QUESTIONS.map((q, qi) => (
                  <div key={q.id}>
                    <p className="font-semibold text-gray-800 mb-3">
                      <span className="text-rose-500 mr-2">{qi + 1}.</span>{q.question}
                    </p>
                    <div className="space-y-2">
                      {q.options.map((opt, oi) => (
                        <button
                          key={oi}
                          onClick={() => setAnswers({ ...answers, [q.id]: oi })}
                          className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all text-left text-sm ${
                            answers[q.id] === oi
                              ? "border-rose-400 bg-rose-50 text-rose-700"
                              : "border-gray-200 hover:border-gray-300 text-gray-700"
                          }`}
                        >
                          <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 ${
                            answers[q.id] === oi ? "border-rose-500 bg-rose-500" : "border-gray-300"
                          }`} />
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Step 5: Verification */}
            {step === 5 && (
              <div className="text-center">
                {!verified ? (
                  <>
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-rose-100 to-violet-100 flex items-center justify-center mx-auto mb-6">
                      <Camera className="w-12 h-12 text-rose-400" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Верификация личности</h3>
                    <p className="text-gray-500 text-sm mb-6 max-w-sm mx-auto leading-relaxed">
                      Нужно сделать одно селфи с документом. Мы используем AI-проверку — данные не хранятся. Верифицированные профили получают специальный бейдж и доверие других пользователей.
                    </p>
                    <div className="grid grid-cols-3 gap-3 mb-6 text-xs text-gray-500">
                      {["Фото не хранится", "AI-проверка", "Безопасно"].map(f => (
                        <div key={f} className="flex flex-col items-center gap-1.5 p-3 bg-gray-50 rounded-xl">
                          <CheckCircle className="w-5 h-5 text-green-500" />
                          {f}
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={handleVerify}
                      disabled={verifying}
                      className="px-8 py-3 rounded-xl bg-gradient-to-r from-rose-500 to-violet-600 text-white font-semibold hover:opacity-90 transition-opacity disabled:opacity-60"
                    >
                      {verifying ? (
                        <span className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Проверяем…
                        </span>
                      ) : "Сделать селфи"}
                    </button>
                    <p className="text-xs text-gray-400 mt-3">
                      Можно пропустить — верифицируй позже в профиле
                    </p>
                  </>
                ) : (
                  <div className="py-8">
                    <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="w-12 h-12 text-green-500" />
                    </div>
                    <h3 className="text-2xl font-black text-gray-900 mb-2">Верифицирован! ✅</h3>
                    <p className="text-gray-500">Твой профиль получил бейдж верификации</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="flex items-center gap-3 mt-6">
            {step > 0 && (
              <button
                onClick={() => setStep(step - 1)}
                className="flex items-center gap-2 px-5 py-3 rounded-xl border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition-all"
              >
                <ArrowLeft className="w-4 h-4" /> Назад
              </button>
            )}
            <button
              onClick={handleNext}
              disabled={!canContinue()}
              className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-rose-500 to-violet-600 text-white font-bold hover:opacity-90 transition-opacity disabled:opacity-40 shadow-lg shadow-rose-200"
            >
              {step === STEPS.length - 1 ? (
                <><Sparkles className="w-4 h-4" /> Начать знакомства!</>
              ) : (
                <>Продолжить <ArrowRight className="w-4 h-4" /></>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
