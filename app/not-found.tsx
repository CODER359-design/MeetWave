"use client";
import Link from "next/link";
import { Heart, ArrowLeft, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-violet-50 flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 rounded-2xl gradient-bg flex items-center justify-center mx-auto mb-6 shadow-xl shadow-rose-200">
          <Heart className="w-10 h-10 text-white fill-white" />
        </div>
        <h1 className="text-8xl font-black text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-bold text-gray-700 mb-3">Страница не найдена</h2>
        <p className="text-gray-500 mb-8">
          Похоже, эта страница исчезла, как непрочитанное сообщение. Давай найдём что-нибудь получше.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-rose-500 to-violet-600 text-white font-semibold hover:opacity-90 transition-opacity shadow-lg shadow-rose-200"
          >
            <ArrowLeft className="w-4 h-4" /> На главную
          </Link>
          <Link
            href="/discover"
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-gray-200 text-gray-700 font-semibold hover:bg-gray-50 transition-all"
          >
            <Compass className="w-4 h-4" /> К знакомствам
          </Link>
        </div>
      </div>
    </div>
  );
}
