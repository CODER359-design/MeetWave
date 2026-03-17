"use client";
import { useState } from "react";
import { Calendar, MapPin, Users, Clock, Filter, Search, Globe, CheckCircle } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { MOCK_EVENTS } from "@/lib/mock-data";
import { formatDate } from "@/lib/utils";

const CATEGORIES = ["Все", "Speed Dating", "Вебинар", "Outdoor", "Кулинария", "Квест", "Coffee Date"];
const CITIES = ["Все города", "Москва", "Санкт-Петербург", "Онлайн"];

const EVENT_GRADIENTS = [
  "from-rose-400 to-pink-600",
  "from-violet-400 to-purple-600",
  "from-teal-400 to-cyan-500",
  "from-amber-400 to-orange-500",
  "from-blue-400 to-indigo-600",
  "from-green-400 to-emerald-600",
];

export default function EventsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Все");
  const [city, setCity] = useState("Все города");
  const [registeredEvents, setRegisteredEvents] = useState<string[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<typeof MOCK_EVENTS[0] | null>(null);

  const filtered = MOCK_EVENTS.filter((e) => {
    const matchSearch = e.title.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === "Все" || e.category === category;
    const matchCity = city === "Все города" || e.city === city || (city === "Онлайн" && e.isOnline);
    return matchSearch && matchCat && matchCity;
  });

  const handleRegister = (id: string) => {
    setRegisteredEvents((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="pt-16 md:pt-20 pb-20 md:pb-6 max-w-6xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-black text-gray-900 mb-1">События и встречи</h1>
          <p className="text-sm text-gray-500">Знакомства в живом формате</p>
        </div>

        {/* Search & filters */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 mb-6">
          <div className="flex gap-3 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Поиск событий…"
                className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-gray-100 text-sm outline-none focus:bg-gray-50 transition-all"
              />
            </div>
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="px-3 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-700 bg-white outline-none focus:border-rose-300"
            >
              {CITIES.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                  category === cat
                    ? "bg-gradient-to-r from-rose-500 to-violet-600 text-white shadow-sm"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Events grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((event, i) => {
            const isRegistered = registeredEvents.includes(event.id);
            const spotsLeft = event.capacity - event.registered;
            const fillPercent = (event.registered / event.capacity) * 100;

            return (
              <div
                key={event.id}
                className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1 group"
              >
                {/* Event banner */}
                <div
                  className={`h-44 bg-gradient-to-br ${EVENT_GRADIENTS[i % EVENT_GRADIENTS.length]} relative cursor-pointer`}
                  onClick={() => setSelectedEvent(event)}
                >
                  {event.isOnline && (
                    <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 bg-white/90 rounded-full text-xs font-medium text-gray-700">
                      <Globe className="w-3 h-3 text-blue-500" /> Онлайн
                    </div>
                  )}
                  <div className="absolute top-3 right-3 px-2.5 py-1 bg-black/30 backdrop-blur-sm rounded-full text-white text-xs font-bold">
                    {spotsLeft > 0 ? `${spotsLeft} мест` : "Всё занято"}
                  </div>
                  <div className="absolute bottom-3 left-3 right-3">
                    <div className="text-white/70 text-xs mb-1">{event.category}</div>
                    <h3 className="text-white font-bold text-sm leading-tight line-clamp-2">{event.title}</h3>
                  </div>
                </div>

                {/* Info */}
                <div className="p-4">
                  <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-rose-400" />
                      {formatDate(event.date)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-violet-400" />
                      {event.time}
                    </span>
                  </div>

                  {!event.isOnline && (
                    <div className="flex items-center gap-1 text-xs text-gray-500 mb-3">
                      <MapPin className="w-3.5 h-3.5 text-gray-400" /> {event.city}
                    </div>
                  )}

                  {/* Capacity bar */}
                  <div className="mb-3">
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span className="flex items-center gap-1">
                        <Users className="w-3 h-3" /> {event.registered}/{event.capacity}
                      </span>
                      <span>{Math.round(fillPercent)}% заполнено</span>
                    </div>
                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${fillPercent > 80 ? "bg-rose-400" : "bg-gradient-to-r from-rose-400 to-violet-500"}`}
                        style={{ width: `${fillPercent}%` }}
                      />
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {event.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="text-xs bg-gray-100 px-2 py-0.5 rounded-full text-gray-600">{tag}</span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <span className={`font-bold ${event.price === 0 ? "text-green-600" : "text-rose-500"}`}>
                      {event.price === 0 ? "Бесплатно" : `${event.price.toLocaleString()} ₽`}
                    </span>
                    <button
                      onClick={() => handleRegister(event.id)}
                      disabled={spotsLeft === 0 && !isRegistered}
                      className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                        isRegistered
                          ? "bg-green-50 text-green-600 border border-green-200 hover:bg-green-100"
                          : spotsLeft === 0
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                          : "bg-gradient-to-r from-rose-500 to-violet-600 text-white hover:opacity-90 shadow-sm"
                      }`}
                    >
                      {isRegistered ? (
                        <><CheckCircle className="w-3.5 h-3.5" /> Зарегистрирован</>
                      ) : spotsLeft === 0 ? "Нет мест" : "Записаться"}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">События не найдены</h3>
            <p className="text-gray-500">Попробуй изменить фильтры поиска</p>
          </div>
        )}
      </div>

      {/* Event detail modal */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setSelectedEvent(null)}>
          <div
            className="bg-white rounded-t-3xl sm:rounded-3xl w-full sm:max-w-lg mx-0 sm:mx-4 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className={`h-52 bg-gradient-to-br ${EVENT_GRADIENTS[MOCK_EVENTS.indexOf(selectedEvent) % EVENT_GRADIENTS.length]} relative`}>
              <button
                onClick={() => setSelectedEvent(null)}
                className="absolute top-4 right-4 w-8 h-8 bg-black/30 rounded-full flex items-center justify-center text-white hover:bg-black/50 transition-all"
              >✕</button>
              <div className="absolute bottom-4 left-4 right-4">
                <span className="px-2.5 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs">{selectedEvent.category}</span>
                <h2 className="text-white font-black text-xl mt-1">{selectedEvent.title}</h2>
              </div>
            </div>
            <div className="p-6">
              <p className="text-gray-600 text-sm leading-relaxed mb-5">{selectedEvent.description}</p>
              <div className="space-y-3 mb-5">
                <div className="flex items-center gap-3 text-sm text-gray-700">
                  <div className="w-8 h-8 rounded-lg bg-rose-50 flex items-center justify-center">
                    <Calendar className="w-4 h-4 text-rose-500" />
                  </div>
                  <span>{formatDate(selectedEvent.date)} в {selectedEvent.time}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-700">
                  <div className="w-8 h-8 rounded-lg bg-violet-50 flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-violet-500" />
                  </div>
                  <span>{selectedEvent.isOnline ? "Онлайн (ссылка после регистрации)" : selectedEvent.city}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-700">
                  <div className="w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center">
                    <Users className="w-4 h-4 text-teal-500" />
                  </div>
                  <span>{selectedEvent.registered} из {selectedEvent.capacity} мест занято</span>
                </div>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div>
                  <div className="text-xs text-gray-500">Организатор</div>
                  <div className="font-semibold text-sm">{selectedEvent.organizer}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-500">Цена</div>
                  <div className={`font-bold ${selectedEvent.price === 0 ? "text-green-600" : "text-rose-500"}`}>
                    {selectedEvent.price === 0 ? "Бесплатно" : `${selectedEvent.price.toLocaleString()} ₽`}
                  </div>
                </div>
              </div>
              <button
                onClick={() => { handleRegister(selectedEvent.id); setSelectedEvent(null); }}
                className="w-full mt-4 py-3.5 rounded-2xl bg-gradient-to-r from-rose-500 to-violet-600 text-white font-bold hover:opacity-90 transition-opacity shadow-lg"
              >
                {registeredEvents.includes(selectedEvent.id) ? "Отменить регистрацию" : "Зарегистрироваться"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
