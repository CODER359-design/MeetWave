import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatAge(birthYear: number): number {
  return new Date().getFullYear() - birthYear;
}

export function formatDistance(km: number): string {
  if (km < 1) return "< 1 км";
  if (km < 10) return `${km.toFixed(1)} км`;
  return `${Math.round(km)} км`;
}

export function formatTimeAgo(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 60) return "только что";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} мин`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} ч`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days} д`;
  return date.toLocaleDateString("ru-RU");
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function getCompatibilityLabel(score: number): { label: string; color: string } {
  if (score >= 90) return { label: "Идеальное совпадение", color: "text-green-600" };
  if (score >= 75) return { label: "Отличная совместимость", color: "text-emerald-600" };
  if (score >= 60) return { label: "Хорошая совместимость", color: "text-blue-600" };
  if (score >= 45) return { label: "Средняя совместимость", color: "text-yellow-600" };
  return { label: "Низкая совместимость", color: "text-gray-500" };
}
