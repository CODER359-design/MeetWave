"use client";
import Link from "next/link";
import {
  Heart, Shield, Zap, Users, Star, CheckCircle, ArrowRight,
  MessageCircle, Calendar, Award, ChevronRight, Play,
  MapPin, Sparkles
} from "lucide-react";

const FEATURES = [
  {
    icon: Shield,
    title: "Верифицированные профили",
    desc: "Каждый пользователь проходит верификацию через селфи и документ. Никаких фейков.",
    color: "from-rose-400 to-pink-600",
  },
  {
    icon: Zap,
    title: "Алгоритм совместимости",
    desc: "Умный подбор по интересам, тесту совместимости и поведенческим паттернам.",
    color: "from-violet-400 to-purple-600",
  },
  {
    icon: Calendar,
    title: "Тематические события",
    desc: "Онлайн и офлайн мероприятия для знакомства в формате живого общения.",
    color: "from-amber-400 to-orange-500",
  },
  {
    icon: MessageCircle,
    title: "Умные ледоколы",
    desc: "Авто-вопросы и общие темы помогают начать разговор без awkward silence.",
    color: "from-teal-400 to-cyan-600",
  },
  {
    icon: Award,
    title: "Геймификация",
    desc: "Квесты, бейджи и совместные вызовы — знакомство как увлекательная игра.",
    color: "from-blue-400 to-indigo-600",
  },
  {
    icon: Users,
    title: "Сообщество по интересам",
    desc: "Групповые комнаты и чаты по темам — находи людей до первого свидания.",
    color: "from-green-400 to-emerald-600",
  },
];

const STATS = [
  { value: "29 000", label: "MAU к концу года", suffix: "+" },
  { value: "94", label: "NPS платформы", suffix: "%" },
  { value: "48", label: "Часов до первого мэтча", suffix: "ч" },
  { value: "75", label: "Заполненных профилей", suffix: "%" },
];

const TESTIMONIALS = [
  {
    name: "Анастасия, 27",
    city: "Москва",
    text: "После двух лет на Tinder и Bumble — наконец-то платформа, где встречаешь реальных людей. Познакомилась с Артёмом на кулинарном мастер-классе MeetWave. Уже 5 месяцев вместе.",
    rating: 5,
    color: "from-rose-400 to-pink-500",
  },
  {
    name: "Михаил, 31",
    city: "Санкт-Петербург",
    text: "Верификация профилей — это то, чего не хватало другим приложениям. Здесь ты уверен, что общаешься с реальным человеком. Тест совместимости реально работает.",
    rating: 5,
    color: "from-violet-400 to-purple-500",
  },
  {
    name: "Дарья, 25",
    city: "Москва",
    text: "Нашла свою аудиторию через группы по интересам. Мы с Кириллом познакомились в чате любителей трекинга. Сейчас планируем первый поход вместе.",
    rating: 5,
    color: "from-teal-400 to-cyan-500",
  },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Создай профиль",
    desc: "Биография, интересы, фото и краткое видео-приветствие. Пройди верификацию личности.",
  },
  {
    step: "02",
    title: "Пройди тест совместимости",
    desc: "7 вопросов о ценностях, стиле жизни и целях. Алгоритм подберёт тебе подходящих людей.",
  },
  {
    step: "03",
    title: "Знакомься и общайся",
    desc: "Лайкай профили, участвуй в событиях, общайся в чатах. Первый шаг — за тобой.",
  },
  {
    step: "04",
    title: "Встречайся офлайн",
    desc: "Кофе, выставки, активности — переводи онлайн в реальную жизнь с поддержкой платформы.",
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-gray-100/80">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl gradient-bg flex items-center justify-center">
              <Heart className="w-4 h-4 text-white fill-white" />
            </div>
            <span className="font-bold text-xl bg-gradient-to-r from-rose-500 to-violet-600 bg-clip-text text-transparent">
              MeetWave
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors">Возможности</a>
            <a href="#how" className="text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors">Как работает</a>
            <a href="#events" className="text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors">События</a>
            <a href="#testimonials" className="text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors">Отзывы</a>
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/auth/login" className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
              Войти
            </Link>
            <Link
              href="/auth/register"
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-rose-500 to-violet-600 text-white text-sm font-semibold hover:opacity-90 transition-opacity shadow-lg shadow-rose-200"
            >
              Начать бесплатно
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-rose-50 via-white to-violet-50" />
        <div className="absolute top-20 right-0 w-96 h-96 bg-rose-100 rounded-full blur-3xl opacity-40" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-violet-100 rounded-full blur-3xl opacity-30" />

        <div className="relative max-w-6xl mx-auto">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-50 border border-rose-100 text-rose-600 text-sm font-medium mb-8">
              <Sparkles className="w-4 h-4" />
              Знакомства нового поколения · Верифицированные профили
            </div>

            <h1 className="text-5xl md:text-7xl font-black text-gray-900 leading-tight mb-6">
              Найди того,{" "}
              <span className="bg-gradient-to-r from-rose-500 to-violet-600 bg-clip-text text-transparent">
                с кем хочется
              </span>{" "}
              расти
            </h1>

            <p className="text-xl text-gray-500 mb-10 max-w-xl leading-relaxed">
              MeetWave — платформа для осознанных знакомств. Реальные люди, тест совместимости,
              живые события. Без фейков. Без свайп-фреззи.
            </p>

            <div className="flex flex-col sm:flex-row items-start gap-4 mb-16">
              <Link
                href="/auth/register"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-rose-500 to-violet-600 text-white font-bold text-lg hover:opacity-90 transition-all shadow-2xl shadow-rose-200 hover:shadow-rose-300 hover:-translate-y-0.5"
              >
                Начать бесплатно
                <ArrowRight className="w-5 h-5" />
              </Link>
              <button className="inline-flex items-center gap-2 px-6 py-4 rounded-2xl border border-gray-200 text-gray-700 font-semibold text-lg hover:bg-gray-50 transition-all">
                <Play className="w-5 h-5 fill-gray-700" />
                Смотреть видео
              </button>
            </div>

            {/* Social proof */}
            <div className="flex items-center gap-6">
              <div className="flex -space-x-3">
                {["rose", "violet", "teal", "amber", "blue"].map((color, i) => (
                  <div
                    key={i}
                    className={`w-10 h-10 rounded-full border-2 border-white bg-gradient-to-br from-${color}-400 to-${color}-600 flex items-center justify-center text-white text-xs font-bold`}
                  >
                    {String.fromCharCode(65 + i)}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-gray-500">
                  <span className="font-semibold text-gray-800">12 000+</span> довольных пользователей
                </p>
              </div>
            </div>
          </div>

          {/* Hero cards */}
          <div className="absolute right-0 top-0 hidden lg:flex flex-col gap-4 w-72">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-4 animate-float">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-rose-400 to-pink-600 flex items-center justify-center text-white font-bold">А</div>
                <div>
                  <div className="font-semibold text-sm">Анастасия, 27</div>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <MapPin className="w-3 h-3" />Москва · 2 км
                  </div>
                </div>
                <div className="ml-auto text-xs font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">94% совпадение</div>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {["Арт", "Кофе", "Путешествия"].map(t => (
                  <span key={t} className="text-xs bg-gray-100 px-2 py-0.5 rounded-full text-gray-600">{t}</span>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-4 ml-8" style={{ animationDelay: "1s" }}>
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center">
                  <Heart className="w-4 h-4 text-white fill-white" />
                </div>
                <span>Это <strong>мэтч!</strong> 🎉 Напиши первым</span>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-4">
              <div className="text-xs text-gray-500 mb-1">Ближайшее событие</div>
              <div className="font-semibold text-sm">Speed Dating в Арт-кафе</div>
              <div className="text-xs text-rose-500 font-medium mt-1">Завтра, 19:00 · 9 мест</div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-gray-950">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map(({ value, label, suffix }) => (
              <div key={label} className="text-center">
                <div className="text-4xl font-black text-white mb-2">
                  {value}
                  <span className="text-rose-400">{suffix}</span>
                </div>
                <div className="text-gray-400 text-sm">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-gray-900 mb-4">
              Почему MeetWave{" "}
              <span className="bg-gradient-to-r from-rose-500 to-violet-600 bg-clip-text text-transparent">
                работает
              </span>
            </h2>
            <p className="text-lg text-gray-500 max-w-xl mx-auto">
              Мы решили главные проблемы современных приложений для знакомств
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map(({ icon: Icon, title, desc, color }) => (
              <div
                key={title}
                className="group p-6 rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="py-24 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-gray-900 mb-4">Как это работает</h2>
            <p className="text-lg text-gray-500">4 шага к значимым знакомствам</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {HOW_IT_WORKS.map(({ step, title, desc }, i) => (
              <div key={step} className="relative">
                {i < HOW_IT_WORKS.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-rose-200 to-violet-200 z-0" style={{ width: "calc(100% - 2rem)", left: "calc(50% + 2rem)" }} />
                )}
                <div className="relative text-center">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-rose-500 to-violet-600 flex items-center justify-center text-white font-black text-xl mx-auto mb-4 shadow-lg shadow-rose-200">
                    {step}
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Events preview */}
      <section id="events" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-4xl font-black text-gray-900 mb-3">
                События и встречи
              </h2>
              <p className="text-gray-500 text-lg">Знакомься в живом формате</p>
            </div>
            <Link href="/events" className="hidden md:flex items-center gap-1.5 text-rose-500 font-semibold hover:text-rose-600 transition-colors">
              Все события <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "Speed Dating: Умные люди", date: "Пт, 14 марта · 19:00", place: "Арт-кафе «Сцена»", price: "1 200 ₽", spots: "9 мест", color: "from-rose-400 to-pink-600", online: false },
              { title: "Вебинар: Первое свидание без стресса", date: "Вс, 16 марта · 20:00", place: "Онлайн", price: "Бесплатно", spots: "53 места", color: "from-violet-400 to-purple-600", online: true },
              { title: "Пикник в Парке Горького", date: "Сб, 22 марта · 14:00", place: "Парк Горького, Москва", price: "800 ₽", spots: "16 мест", color: "from-teal-400 to-cyan-600", online: false },
            ].map(({ title, date, place, price, spots, color, online }) => (
              <div key={title} className="group rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white">
                <div className={`h-40 bg-gradient-to-br ${color} relative`}>
                  {online && (
                    <div className="absolute top-3 left-3 px-2 py-1 bg-white/90 rounded-full text-xs font-medium text-gray-700">
                      🎥 Онлайн
                    </div>
                  )}
                  <div className="absolute top-3 right-3 px-2 py-1 bg-black/30 rounded-full text-xs font-medium text-white">
                    {spots}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-gray-900 mb-1 line-clamp-2">{title}</h3>
                  <p className="text-sm text-gray-500 mb-1">{date}</p>
                  <p className="text-xs text-gray-400 flex items-center gap-1">
                    <MapPin className="w-3 h-3" />{place}
                  </p>
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                    <span className="font-semibold text-rose-500">{price}</span>
                    <button className="text-xs font-semibold text-gray-600 hover:text-rose-500 transition-colors">
                      Зарегистрироваться →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 px-6 bg-gradient-to-br from-rose-50 to-violet-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-gray-900 mb-4">Истории успеха</h2>
            <p className="text-gray-500 text-lg">Реальные люди, реальные знакомства</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map(({ name, city, text, rating, color }) => (
              <div key={name} className="bg-white rounded-2xl p-6 shadow-sm border border-white hover:shadow-lg transition-all">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-gray-700 text-sm leading-relaxed mb-6">&ldquo;{text}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${color} flex items-center justify-center text-white font-bold`}>
                    {name[0]}
                  </div>
                  <div>
                    <div className="font-semibold text-sm text-gray-900">{name}</div>
                    <div className="text-xs text-gray-500 flex items-center gap-1">
                      <CheckCircle className="w-3 h-3 text-green-500" /> {city} · Верифицированный
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-50 border border-rose-100 text-rose-600 text-sm font-medium mb-8">
            <Heart className="w-4 h-4 fill-rose-500" />
            Регистрация бесплатна
          </div>
          <h2 className="text-5xl font-black text-gray-900 mb-6">
            Готов начать?{" "}
            <span className="bg-gradient-to-r from-rose-500 to-violet-600 bg-clip-text text-transparent">
              Один шаг.
            </span>
          </h2>
          <p className="text-xl text-gray-500 mb-10">
            Создай профиль за 5 минут, пройди тест совместимости и получи первые мэтчи сегодня.
          </p>
          <Link
            href="/auth/register"
            className="inline-flex items-center gap-2 px-10 py-5 rounded-2xl bg-gradient-to-r from-rose-500 to-violet-600 text-white font-bold text-xl hover:opacity-90 transition-all shadow-2xl shadow-rose-200 hover:-translate-y-1"
          >
            Начать бесплатно
            <ArrowRight className="w-6 h-6" />
          </Link>
          <p className="text-sm text-gray-400 mt-4">Уже 12 000+ пользователей · Без спама · Удалить можно в любой момент</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-gray-950 text-gray-400">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl gradient-bg flex items-center justify-center">
                <Heart className="w-4 h-4 text-white fill-white" />
              </div>
              <span className="font-bold text-white text-lg">MeetWave</span>
            </div>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <a href="#" className="hover:text-white transition-colors">О нас</a>
              <a href="#" className="hover:text-white transition-colors">Безопасность</a>
              <a href="#" className="hover:text-white transition-colors">Конфиденциальность</a>
              <a href="#" className="hover:text-white transition-colors">Условия использования</a>
              <a href="#" className="hover:text-white transition-colors">Поддержка</a>
            </div>
            <div className="text-sm">© 2025 MeetWave. GDPR-compliant.</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
