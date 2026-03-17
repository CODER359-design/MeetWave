import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { SessionProvider } from "@/components/providers/SessionProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MeetWave — знакомства для людей, которые ценят глубину",
  description: "Платформа для осознанных знакомств с верификацией личности, тестом совместимости и тематическими событиями. 29 000 активных пользователей к 2025 году.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${geistSans.variable} antialiased`}>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
