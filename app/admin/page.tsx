"use client";
import { useState } from "react";
import Link from "next/link";
import {
  Users, Heart, MessageCircle, TrendingUp, Shield, AlertTriangle,
  CheckCircle, Clock, BarChart3, ArrowUp, ArrowDown, Eye,
  Flag, UserCheck, Crown, Calendar, Star
} from "lucide-react";
import { ADMIN_STATS } from "@/lib/mock-data";

const TABS = ["Обзор", "Пользователи", "Модерация", "Аналитика", "Монетизация"];

const METRIC_CARDS = [
  { label: "Всего пользователей", value: ADMIN_STATS.totalUsers.toLocaleString(), change: +12.4, icon: Users, color: "from-blue-400 to-indigo-600" },
  { label: "MAU", value: ADMIN_STATS.mau.toLocaleString(), change: +8.2, icon: TrendingUp, color: "from-rose-400 to-pink-600" },
  { label: "Мэтчи всего", value: ADMIN_STATS.totalMatches.toLocaleString(), change: +15.7, icon: Heart, color: "from-rose-500 to-violet-600" },
  { label: "Premium пользователей", value: ADMIN_STATS.premiumUsers.toLocaleString(), change: +22.1, icon: Crown, color: "from-amber-400 to-orange-500" },
  { label: "Активных событий", value: String(ADMIN_STATS.activeEvents), change: +3, icon: Calendar, color: "from-teal-400 to-cyan-600" },
  { label: "Retention D30", value: `${ADMIN_STATS.retentionD30}%`, change: +2.1, icon: BarChart3, color: "from-green-400 to-emerald-600" },
  { label: "NPS", value: String(ADMIN_STATS.nps), change: +5, icon: Star, color: "from-violet-400 to-purple-600" },
  { label: "ARPU", value: `$${ADMIN_STATS.arpu}`, change: +8.3, icon: TrendingUp, color: "from-rose-400 to-orange-500" },
];

const MOCK_USERS = [
  { id: "1", name: "Анастасия К.", email: "a.k@mail.ru", city: "Москва", status: "active", verified: true, premium: true, joined: "10 янв 2025", reports: 0 },
  { id: "2", name: "Михаил П.", email: "m.p@gmail.com", city: "Москва", status: "active", verified: true, premium: false, joined: "15 янв 2025", reports: 0 },
  { id: "3", name: "Дарья В.", email: "d.v@yandex.ru", city: "Москва", status: "pending", verified: false, premium: false, joined: "20 фев 2025", reports: 2 },
  { id: "4", name: "Иван О.", email: "i.o@mail.ru", city: "СПб", status: "blocked", verified: false, premium: false, joined: "5 фев 2025", reports: 7 },
  { id: "5", name: "Полина К.", email: "p.k@gmail.com", city: "Москва", status: "active", verified: true, premium: true, joined: "22 янв 2025", reports: 0 },
];

const MOCK_REPORTS = [
  { id: "r1", reporter: "Мария Т.", reported: "Игорь С.", reason: "Фейковый профиль", status: "pending", date: "Сегодня 14:23" },
  { id: "r2", reporter: "Алексей К.", reported: "Анна Р.", reason: "Спам / нежелательные сообщения", status: "pending", date: "Сегодня 11:05" },
  { id: "r3", reporter: "Ольга М.", reported: "Виктор Д.", reason: "Оскорбительное поведение", status: "reviewed", date: "Вчера 18:47" },
  { id: "r4", reporter: "Николай В.", reported: "Светлана П.", reason: "NSFW контент", status: "banned", date: "Вчера 09:15" },
];

const GROWTH_DATA = [
  { month: "Окт", users: 2800 },
  { month: "Ноя", users: 4200 },
  { month: "Дек", users: 6100 },
  { month: "Янв", users: 7800 },
  { month: "Фев", users: 9200 },
  { month: "Мар", users: 12847 },
];

const maxUsers = Math.max(...GROWTH_DATA.map((d) => d.users));

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("Обзор");
  const [searchUser, setSearchUser] = useState("");

  const filteredUsers = MOCK_USERS.filter(
    (u) => u.name.toLowerCase().includes(searchUser.toLowerCase()) || u.email.toLowerCase().includes(searchUser.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900 border-b border-gray-700 h-14">
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg gradient-bg flex items-center justify-center">
              <Heart className="w-3.5 h-3.5 text-white fill-white" />
            </div>
            <span className="font-bold text-white">MeetWave</span>
            <span className="px-2 py-0.5 bg-rose-500 text-white text-xs font-bold rounded-md">ADMIN</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <AlertTriangle className="w-5 h-5 text-amber-400" />
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 rounded-full text-[9px] text-white font-bold flex items-center justify-center">
                {ADMIN_STATS.reportsToday}
              </span>
            </div>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-rose-400 to-violet-600 flex items-center justify-center text-white font-bold text-sm">
              A
            </div>
          </div>
        </div>
      </nav>

      <div className="pt-14 max-w-7xl mx-auto px-6 py-6">
        {/* Tabs */}
        <div className="flex gap-1 bg-white border border-gray-200 rounded-xl p-1 mb-6 overflow-x-auto">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab
                  ? "bg-gradient-to-r from-rose-500 to-violet-600 text-white shadow-sm"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Overview */}
        {activeTab === "Обзор" && (
          <div className="space-y-6">
            {/* KPI cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {METRIC_CARDS.map(({ label, value, change, icon: Icon, color }) => (
                <div key={label} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div className={`flex items-center gap-1 text-xs font-semibold ${change >= 0 ? "text-green-600" : "text-red-500"}`}>
                      {change >= 0 ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                      {Math.abs(change)}%
                    </div>
                  </div>
                  <div className="text-2xl font-black text-gray-900 mb-0.5">{value}</div>
                  <div className="text-xs text-gray-500">{label}</div>
                </div>
              ))}
            </div>

            {/* Growth chart */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-bold text-gray-900">Рост пользователей</h3>
                  <p className="text-sm text-gray-500">Цель: 29 000 MAU к Q4 2025</p>
                </div>
                <div className="px-3 py-1 bg-green-50 text-green-600 text-sm font-semibold rounded-full">
                  +44% vs прошлый месяц
                </div>
              </div>
              <div className="flex items-end gap-3 h-40">
                {GROWTH_DATA.map(({ month, users }) => (
                  <div key={month} className="flex-1 flex flex-col items-center gap-1">
                    <span className="text-xs text-gray-500">{(users / 1000).toFixed(1)}k</span>
                    <div
                      className="w-full rounded-t-lg bg-gradient-to-t from-rose-500 to-violet-500 transition-all"
                      style={{ height: `${(users / maxUsers) * 100}%` }}
                    />
                    <span className="text-xs text-gray-500">{month}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex items-center gap-2 text-sm text-gray-500 bg-rose-50 rounded-xl px-4 py-3">
                <TrendingUp className="w-4 h-4 text-rose-500" />
                <span>При текущем темпе роста цель 29 000 MAU будет достигнута к <strong className="text-rose-600">ноябрю 2025</strong></span>
              </div>
            </div>

            {/* Quick stats */}
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <h3 className="font-bold text-gray-900 mb-4">Верификация</h3>
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-green-400 to-emerald-600 rounded-full" style={{ width: "69%" }} />
                  </div>
                  <span className="text-sm font-bold text-gray-800">69%</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Верифицировано</span>
                    <span className="font-semibold text-green-600">{ADMIN_STATS.verifiedProfiles.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Ожидает проверки</span>
                    <span className="font-semibold text-amber-500">{ADMIN_STATS.pendingVerification}</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <h3 className="font-bold text-gray-900 mb-4">Качество платформы</h3>
                <div className="space-y-3">
                  {[
                    { label: "NPS", value: ADMIN_STATS.nps, max: 100, color: "from-violet-400 to-purple-600", target: 45 },
                    { label: "CSAT", value: ADMIN_STATS.csat * 20, max: 100, color: "from-teal-400 to-cyan-600", target: 90 },
                    { label: "D30 Retention", value: ADMIN_STATS.retentionD30, max: 100, color: "from-rose-400 to-pink-600", target: 40 },
                  ].map(({ label, value, color, target }) => (
                    <div key={label}>
                      <div className="flex justify-between text-xs text-gray-600 mb-1">
                        <span>{label}</span>
                        <span className="font-semibold">{label === "CSAT" ? (value / 20).toFixed(1) : value}{label === "CSAT" ? "/5" : label === "NPS" ? "" : "%"}</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className={`h-full bg-gradient-to-r ${color} rounded-full`} style={{ width: `${value}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <h3 className="font-bold text-gray-900 mb-4">Безопасность сегодня</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-amber-50 rounded-xl">
                    <div className="flex items-center gap-2">
                      <Flag className="w-4 h-4 text-amber-500" />
                      <span className="text-sm font-medium text-gray-700">Жалоб сегодня</span>
                    </div>
                    <span className="font-bold text-amber-600">{ADMIN_STATS.reportsToday}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-xl">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-blue-500" />
                      <span className="text-sm font-medium text-gray-700">На верификации</span>
                    </div>
                    <span className="font-bold text-blue-600">{ADMIN_STATS.pendingVerification}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-xl">
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-green-500" />
                      <span className="text-sm font-medium text-gray-700">Нарушения &lt;0.5%</span>
                    </div>
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Users */}
        {activeTab === "Пользователи" && (
          <div className="space-y-4">
            <div className="flex gap-3">
              <input
                type="text"
                value={searchUser}
                onChange={(e) => setSearchUser(e.target.value)}
                placeholder="Поиск по имени или email…"
                className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-rose-300"
              />
              <button className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-violet-600 text-white text-sm font-semibold">
                Экспорт
              </button>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-100">
                    <tr>
                      {["Пользователь", "Email", "Город", "Статус", "Верификация", "Premium", "Жалобы", "Действия"].map((h) => (
                        <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-600">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {filteredUsers.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-rose-400 to-violet-600 flex items-center justify-center text-white text-xs font-bold">
                              {user.name[0]}
                            </div>
                            <span className="text-sm font-medium text-gray-900">{user.name}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-500">{user.email}</td>
                        <td className="px-4 py-3 text-sm text-gray-500">{user.city}</td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                            user.status === "active" ? "bg-green-100 text-green-600" :
                            user.status === "pending" ? "bg-amber-100 text-amber-600" :
                            "bg-red-100 text-red-600"
                          }`}>
                            {user.status === "active" ? "Активен" : user.status === "pending" ? "Ожидание" : "Заблокирован"}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-center">
                          {user.verified ? <CheckCircle className="w-4 h-4 text-green-500 mx-auto" /> : <Clock className="w-4 h-4 text-gray-300 mx-auto" />}
                        </td>
                        <td className="px-4 py-3 text-center">
                          {user.premium ? <Crown className="w-4 h-4 text-amber-500 mx-auto" /> : <span className="text-gray-300 text-sm">—</span>}
                        </td>
                        <td className="px-4 py-3 text-center">
                          {user.reports > 0 ? (
                            <span className="text-sm font-semibold text-red-500">{user.reports}</span>
                          ) : <span className="text-gray-300 text-sm">0</span>}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1">
                            <button className="p-1.5 rounded-lg hover:bg-gray-100 transition-all text-gray-500" title="Просмотр">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="p-1.5 rounded-lg hover:bg-gray-100 transition-all text-gray-500" title="Верифицировать">
                              <UserCheck className="w-4 h-4" />
                            </button>
                            {user.status !== "blocked" && (
                              <button className="p-1.5 rounded-lg hover:bg-red-50 transition-all text-gray-500 hover:text-red-500" title="Заблокировать">
                                <Shield className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Moderation */}
        {activeTab === "Модерация" && (
          <div className="space-y-4">
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { label: "Жалоб на рассмотрении", value: "8", color: "bg-amber-50 border-amber-200", textColor: "text-amber-600" },
                { label: "Заблокировано сегодня", value: "3", color: "bg-red-50 border-red-200", textColor: "text-red-600" },
                { label: "На верификации", value: String(ADMIN_STATS.pendingVerification), color: "bg-blue-50 border-blue-200", textColor: "text-blue-600" },
              ].map(({ label, value, color, textColor }) => (
                <div key={label} className={`p-4 rounded-2xl border ${color} flex items-center gap-3`}>
                  <div className={`text-3xl font-black ${textColor}`}>{value}</div>
                  <div className="text-sm text-gray-600">{label}</div>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
                <h3 className="font-bold text-gray-900">Последние жалобы</h3>
                <select className="text-sm border border-gray-200 rounded-lg px-2 py-1 outline-none text-gray-600">
                  <option>Все типы</option>
                  <option>Фейк</option>
                  <option>Спам</option>
                  <option>NSFW</option>
                </select>
              </div>
              <div className="divide-y divide-gray-50">
                {MOCK_REPORTS.map((report) => (
                  <div key={report.id} className="px-5 py-4 flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      report.status === "pending" ? "bg-amber-100" : report.status === "reviewed" ? "bg-blue-100" : "bg-red-100"
                    }`}>
                      <Flag className={`w-5 h-5 ${
                        report.status === "pending" ? "text-amber-500" : report.status === "reviewed" ? "text-blue-500" : "text-red-500"
                      }`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm font-medium text-gray-900">{report.reporter}</span>
                        <span className="text-gray-400 text-xs">→</span>
                        <span className="text-sm font-medium text-gray-900">{report.reported}</span>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                          report.status === "pending" ? "bg-amber-100 text-amber-600" :
                          report.status === "reviewed" ? "bg-blue-100 text-blue-600" :
                          "bg-red-100 text-red-600"
                        }`}>
                          {report.status === "pending" ? "Новая" : report.status === "reviewed" ? "Рассмотрена" : "Заблокирован"}
                        </span>
                      </div>
                      <div className="text-sm text-gray-500">{report.reason}</div>
                      <div className="text-xs text-gray-400">{report.date}</div>
                    </div>
                    {report.status === "pending" && (
                      <div className="flex gap-2 flex-shrink-0">
                        <button className="px-3 py-1.5 rounded-lg bg-green-50 text-green-600 text-xs font-semibold hover:bg-green-100 transition-all">
                          Отклонить
                        </button>
                        <button className="px-3 py-1.5 rounded-lg bg-red-50 text-red-600 text-xs font-semibold hover:bg-red-100 transition-all">
                          Заблокировать
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Analytics */}
        {activeTab === "Аналитика" && (
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { label: "Конверсия регистрация → профиль", value: "71%", target: "75%", color: "from-rose-400 to-pink-600", progress: 71 },
                { label: "Среднее время до первого мэтча", value: "31 ч", target: "≤ 48 ч", color: "from-green-400 to-emerald-600", progress: 85 },
                { label: "D30 Retention", value: "42%", target: "40%", color: "from-violet-400 to-purple-600", progress: 100 },
                { label: "Профилей с ≥ 1 мэтч/мес", value: "58%", target: "50%", color: "from-teal-400 to-cyan-600", progress: 100 },
              ].map(({ label, value, target, color, progress }) => (
                <div key={label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">{label}</span>
                    <span className={`text-xs font-semibold ${progress >= 100 ? "text-green-600" : "text-amber-500"}`}>
                      {progress >= 100 ? "✅ Выполнено" : `🎯 Цель: ${target}`}
                    </span>
                  </div>
                  <div className="text-3xl font-black text-gray-900 mb-3">{value}</div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className={`h-full bg-gradient-to-r ${color} rounded-full`} style={{ width: `${Math.min(progress, 100)}%` }} />
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <h3 className="font-bold text-gray-900 mb-4">Квартальный план роста</h3>
              <div className="space-y-3">
                {[
                  { quarter: "Q1", target: "5 000 рег.", current: 5000, max: 5000, done: true },
                  { quarter: "Q2", target: "12 000 MAU", current: 9234, max: 12000, done: false },
                  { quarter: "Q3", target: "20 000 MAU", current: 0, max: 20000, done: false },
                  { quarter: "Q4", target: "29 000 MAU", current: 0, max: 29000, done: false },
                ].map(({ quarter, target, current, max, done }) => (
                  <div key={quarter} className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xs font-black flex-shrink-0 ${
                      done ? "bg-green-100 text-green-600" : current > 0 ? "bg-rose-100 text-rose-600" : "bg-gray-100 text-gray-400"
                    }`}>
                      {quarter}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-700 font-medium">{target}</span>
                        <span className="text-gray-500">{current > 0 ? current.toLocaleString() : "—"}</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${done ? "bg-green-400" : current > 0 ? "bg-gradient-to-r from-rose-400 to-violet-500" : "bg-gray-200"}`}
                          style={{ width: `${(current / max) * 100}%` }}
                        />
                      </div>
                    </div>
                    {done && <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Monetization */}
        {activeTab === "Монетизация" && (
          <div className="space-y-4">
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { label: "ARPU", value: `$${ADMIN_STATS.arpu}`, target: "$5", icon: TrendingUp, color: "from-green-400 to-emerald-600" },
                { label: "Premium конверсия", value: `${((ADMIN_STATS.premiumUsers / ADMIN_STATS.totalUsers) * 100).toFixed(1)}%`, target: "7%", icon: Crown, color: "from-amber-400 to-orange-500" },
                { label: "MRR", value: `$${(ADMIN_STATS.premiumUsers * 6.99).toLocaleString()}`, target: "Рост +15%", icon: BarChart3, color: "from-violet-400 to-purple-600" },
              ].map(({ label, value, target, icon: Icon, color }) => (
                <div key={label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-3`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-2xl font-black text-gray-900 mb-1">{value}</div>
                  <div className="text-sm text-gray-500">{label}</div>
                  <div className="text-xs text-gray-400 mt-1">Цель: {target}</div>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <h3 className="font-bold text-gray-900 mb-4">OKR — Монетизация (Q2)</h3>
              <div className="space-y-4">
                {[
                  { kr: "ARPU ≥ $5", current: 5.8, target: 5, unit: "$", done: true },
                  { kr: "7% пользователей на подписке", current: 9.4, target: 7, unit: "%", done: true },
                  { kr: "LTV ≥ $60", current: 48, target: 60, unit: "$", done: false },
                  { kr: "CAC ≤ $12", current: 11.2, target: 12, unit: "$", done: true },
                ].map(({ kr, current, target, unit, done }) => (
                  <div key={kr} className="flex items-center gap-4">
                    <div className={`w-2 h-2 rounded-full flex-shrink-0 ${done ? "bg-green-400" : "bg-amber-400"}`} />
                    <div className="flex-1">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-700">{kr}</span>
                        <span className={`font-semibold ${done ? "text-green-600" : "text-amber-500"}`}>
                          {unit}{current} {done ? "✅" : `/ цель ${unit}${target}`}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
