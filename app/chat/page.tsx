"use client";
import { useState, useRef, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Send, ArrowLeft, Phone, Video, MoreVertical,
  CheckCheck, Check, Smile, Image as ImageIcon, Mic,
  Heart, Shield, Zap
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { useAppStore } from "@/store/useAppStore";
import { formatTimeAgo } from "@/lib/utils";

const AVATAR_GRADIENTS = [
  "from-rose-400 to-pink-600",
  "from-violet-400 to-purple-600",
  "from-teal-400 to-cyan-600",
];

const ICE_BREAKERS = [
  "Если бы ты мог посетить одно место на планете прямо сейчас, куда бы поехал?",
  "Что тебя больше всего вдохновляет в жизни?",
  "Какой была твоя самая необычная работа или подработка?",
  "Если бы ты мог освоить любой навык за один день, что бы это было?",
  "Какой фильм или книга изменила твой взгляд на жизнь?",
];

function ChatContent() {
  const searchParams = useSearchParams();
  const activeId = searchParams.get("id");
  const { conversations, messages, sendMessage, setActiveConversation, fetchConversations } = useAppStore();
  const [newMessage, setNewMessage] = useState("");
  const [showIceBreakers, setShowIceBreakers] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeConv = conversations.find((c) => c.id === activeId);
  const activeMessages = activeId ? (messages[activeId] || []) : [];

  useEffect(() => {
    fetchConversations();
  }, [fetchConversations]);

  useEffect(() => {
    if (activeId) setActiveConversation(activeId);
  }, [activeId, setActiveConversation]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeMessages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !activeId) return;
    await sendMessage(activeId, newMessage.trim());
    setNewMessage("");
  };

  const handleIceBreaker = async (text: string) => {
    if (!activeId) return;
    await sendMessage(activeId, text);
    setShowIceBreakers(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <div className="pt-16 md:pt-20 pb-16 md:pb-0 flex flex-1 max-w-6xl mx-auto w-full">
        
        {/* Conversations list */}
        <div className={`${activeId ? "hidden md:flex" : "flex"} flex-col w-full md:w-80 bg-white border-r border-gray-100 flex-shrink-0`}>
          <div className="p-4 border-b border-gray-100">
            <h1 className="text-xl font-black text-gray-900 mb-3">Сообщения</h1>
            <input
              type="text"
              placeholder="Поиск…"
              className="w-full px-3 py-2 rounded-xl bg-gray-100 text-sm outline-none focus:bg-gray-50 transition-all"
            />
          </div>

          <div className="flex-1 overflow-y-auto">
            {conversations.map((conv, i) => (
              <Link
                key={conv.id}
                href={`/chat?id=${conv.id}`}
                className={`flex items-center gap-3 p-4 hover:bg-gray-50 transition-colors border-b border-gray-50 ${
                  activeId === conv.id ? "bg-rose-50 border-l-2 border-l-rose-400" : ""
                }`}
              >
                <div className="relative flex-shrink-0">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${AVATAR_GRADIENTS[i % AVATAR_GRADIENTS.length]} flex items-center justify-center text-white font-bold text-lg`}>
                    {conv.user.name[0]}
                  </div>
                  {i === 0 && <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-400 rounded-full border-2 border-white" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-sm text-gray-900">{conv.user.name}</span>
                    <span className="text-xs text-gray-400">{conv.lastMessage ? formatTimeAgo(conv.lastMessage.timestamp) : ""}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {conv.lastMessage?.senderId === "me" && (
                      conv.lastMessage?.read
                        ? <CheckCheck className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
                        : <Check className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                    )}
                    <p className="text-xs text-gray-500 truncate">{conv.lastMessage?.text || "Начните общение"}</p>
                  </div>
                </div>
                {conv.unreadCount > 0 && (
                  <span className="w-5 h-5 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0">
                    {conv.unreadCount}
                  </span>
                )}
              </Link>
            ))}
          </div>
        </div>

        {/* Chat area */}
        {activeId && activeConv ? (
          <div className="flex-1 flex flex-col bg-white">
            {/* Chat header */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100 bg-white sticky top-16 z-10">
              <Link href="/chat" className="md:hidden p-1.5 rounded-lg hover:bg-gray-100 transition-all">
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </Link>
              <div className="relative">
                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${AVATAR_GRADIENTS[0]} flex items-center justify-center text-white font-bold`}>
                  {activeConv.user.name[0]}
                </div>
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-gray-900">{activeConv.user.name}</span>
                  {activeConv.user.verified && (
                    <Shield className="w-3.5 h-3.5 text-blue-500" />
                  )}
                </div>
                <p className="text-xs text-green-500 font-medium">Онлайн</p>
              </div>
              <div className="flex items-center gap-1">
                <button className="p-2 rounded-xl hover:bg-gray-100 transition-all text-gray-600">
                  <Phone className="w-5 h-5" />
                </button>
                <button className="p-2 rounded-xl hover:bg-gray-100 transition-all text-gray-600">
                  <Video className="w-5 h-5" />
                </button>
                <button className="p-2 rounded-xl hover:bg-gray-100 transition-all text-gray-600">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Compatibility hint */}
            <div className="px-4 py-2 bg-gradient-to-r from-rose-50 to-violet-50 border-b border-rose-100">
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <Zap className="w-3.5 h-3.5 text-rose-500" />
                <span>Совместимость <span className="font-semibold text-rose-500">{activeConv.user.compatibilityScore}%</span></span>
                <span className="text-gray-400">·</span>
                <span>Общие интересы: <span className="font-semibold">Арт, Кофе</span></span>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
              {/* Match notification */}
              <div className="flex justify-center">
                <div className="flex items-center gap-2 px-4 py-2 bg-rose-50 rounded-full text-xs text-rose-600 font-medium">
                  <Heart className="w-3.5 h-3.5 fill-rose-500" />
                  Вы сделали мэтч {formatTimeAgo(activeConv.matchedAt)}
                </div>
              </div>

              {activeMessages.map((msg) => {
                const isMine = msg.senderId === "me";
                return (
                  <div key={msg.id} className={`flex ${isMine ? "justify-end" : "justify-start"} gap-2`}>
                    {!isMine && (
                      <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${AVATAR_GRADIENTS[0]} flex items-center justify-center text-white text-xs font-bold flex-shrink-0 self-end`}>
                        {activeConv.user.name[0]}
                      </div>
                    )}
                    <div className={`max-w-[75%] group`}>
                      <div className={`px-4 py-2.5 text-sm leading-relaxed ${isMine ? "chat-bubble-sent" : "chat-bubble-received"}`}>
                        {msg.text}
                      </div>
                      <div className={`flex items-center gap-1 mt-1 ${isMine ? "justify-end" : "justify-start"}`}>
                        <span className="text-[10px] text-gray-400">{formatTimeAgo(msg.timestamp)}</span>
                        {isMine && (
                          msg.read
                            ? <CheckCheck className="w-3 h-3 text-blue-400" />
                            : <Check className="w-3 h-3 text-gray-400" />
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}

              {activeMessages.length === 0 && (
                <div className="text-center py-8">
                  <div className="text-4xl mb-3">👋</div>
                  <p className="text-gray-500 text-sm mb-4">Начни разговор с {activeConv.user.name}!</p>
                  <button
                    onClick={() => setShowIceBreakers(true)}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-rose-500 to-violet-600 text-white text-sm font-semibold hover:opacity-90 transition-opacity"
                  >
                    ❄️ Использовать ледокол
                  </button>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Ice breakers */}
            {showIceBreakers && (
              <div className="px-4 py-3 bg-violet-50 border-t border-violet-100">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-4 h-4 text-violet-500" />
                  <span className="text-sm font-semibold text-violet-700">Ледоколы</span>
                  <button onClick={() => setShowIceBreakers(false)} className="ml-auto text-xs text-gray-400">✕</button>
                </div>
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {ICE_BREAKERS.map((ib, i) => (
                    <button
                      key={i}
                      onClick={() => handleIceBreaker(ib)}
                      className="flex-shrink-0 max-w-[200px] px-3 py-2 bg-white rounded-xl text-xs text-gray-700 border border-violet-100 hover:border-violet-300 hover:bg-violet-50 transition-all text-left line-clamp-2"
                    >
                      {ib}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Message input */}
            <div className="px-4 py-3 border-t border-gray-100 bg-white">
              <form onSubmit={handleSend} className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowIceBreakers(!showIceBreakers)}
                  className="p-2.5 rounded-xl hover:bg-gray-100 transition-all text-gray-500"
                  title="Ледоколы"
                >
                  <Zap className="w-5 h-5" />
                </button>
                <button type="button" className="p-2.5 rounded-xl hover:bg-gray-100 transition-all text-gray-500">
                  <ImageIcon className="w-5 h-5" />
                </button>
                <div className="flex-1 flex items-center bg-gray-100 rounded-xl px-4 py-2.5 gap-2">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Сообщение…"
                    className="flex-1 bg-transparent text-sm outline-none text-gray-900 placeholder-gray-400"
                  />
                  <button type="button" className="text-gray-400 hover:text-gray-600">
                    <Smile className="w-5 h-5" />
                  </button>
                </div>
                {newMessage.trim() ? (
                  <button
                    type="submit"
                    className="p-2.5 rounded-xl bg-gradient-to-br from-rose-500 to-violet-600 text-white hover:opacity-90 transition-opacity shadow-md"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                ) : (
                  <button type="button" className="p-2.5 rounded-xl hover:bg-gray-100 transition-all text-gray-500">
                    <Mic className="w-5 h-5" />
                  </button>
                )}
              </form>
            </div>
          </div>
        ) : (
          <div className="hidden md:flex flex-1 items-center justify-center bg-white">
            <div className="text-center">
              <div className="text-6xl mb-4">💬</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Выбери диалог</h3>
              <p className="text-gray-500">Выбери разговор из списка слева</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ChatPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-rose-500 border-t-transparent rounded-full animate-spin" />
    </div>}>
      <ChatContent />
    </Suspense>
  );
}
