"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useTheme } from "next-themes";

interface Message {
  sender: "user" | "bot";
  text: string;
}

export default function FloatingChat() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => setMounted(true), []);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!mounted) return null; // evita mismatch

  const isDark = theme === "dark";
  const panelBg = isDark ? "bg-gray-800 text-gray-200" : "bg-[#F3EFEA] text-[#5C4B6B]";
  const headerBg = isDark
    ? "bg-gradient-to-r from-gray-700 via-gray-900 to-gray-800 text-white"
    : "bg-gradient-to-r from-[#C8B8D7] to-[#5C4B6C] text-white";
  const userMsgBg = isDark ? "bg-[#7C3AED] text-white" : "bg-[#D4A373] text-white";
  const botMsgBg = isDark ? "bg-gray-700 text-gray-200" : "bg-[#D6E2E9] text-[#5C4B6C]";
  const inputBg = isDark ? "bg-gray-700 text-gray-200 border-gray-600" : "bg-white text-[#5C4B6C] border-[#EED6D3]";

  const sendMessage = () => {
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { sender: "user", text: input }]);
    setInput("");

    setTimeout(() => {
      const response = `Carta del día: ${
        ["El Mago", "La Sacerdotisa", "La Luna"][
          Math.floor(Math.random() * 3)
        ]
      }`;
      setMessages((prev) => [...prev, { sender: "bot", text: response }]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Fondo mágico */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.35 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-gradient-to-br from-[#5C4B6C]/60 via-[#C8B8D7]/40 to-[#EED6D3]/50 z-30 backdrop-blur-md"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Botón / Panel */}
      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.button
            key="button"
            onClick={() => setIsOpen(true)}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="w-16 h-16 rounded-full flex items-center justify-center cursor-pointer
                       transition transform hover:scale-110 motion-safe:animate-pulse relative z-40
                       bg-gradient-to-tr from-[#C8B8D7] to-[#5C4B6C] shadow-lg"
          >
            <Image src="/assets/witch-ball.png" className="w-10 h-10" alt="Mi ícono" width={500} height={500}/>
          </motion.button>
        ) : (
          <motion.div
            key="chat"
            initial={{ scale: 0.9, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 30 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={`flex flex-col w-96 h-[500px] shadow-2xl rounded-xl overflow-hidden z-40 relative ${panelBg}`}
          >
            {/* Header */}
            <div className={`p-4 flex justify-between items-center font-bold text-lg shadow-md ${headerBg}`}>
              <span className="flex items-center gap-2">🔮 L’Oracle ✨</span>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-[#EED6D3] transition cursor-pointer"
              >
                ✖
              </button>
            </div>

            {/* Mensajes */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`p-3 rounded-xl max-w-xs shadow-md ${msg.sender === "user" ? userMsgBg : botMsgBg}`}>
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className={`p-3 flex gap-2 border-t ${isDark ? "border-gray-600" : "border-[#EED6D3]"} ${panelBg}`}>
              <input
                className={`flex-1 p-2 rounded-full border focus:outline-none focus:ring-2 focus:ring-[#C8B8D7] ${inputBg}`}
                type="text"
                placeholder="Escribe tu pregunta..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              />
              <button
                onClick={sendMessage}
                className="bg-[#5C4B6C] text-white px-5 py-2 rounded-full hover:bg-[#C8B8D7] transition"
              >
                ➤
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
