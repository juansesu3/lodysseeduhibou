"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GiOwl } from "react-icons/gi";
import { useTheme } from "next-themes";
import Link from "next/link";

export default function Navbar() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => setMounted(true), []);
  useEffect(() => {
    if (!isOpen) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen]);

  if (!mounted) return null;

  const menuItems = [
    { label: "Accueil", href: "/" },
    { label: "L’Oracle", href: "/oracle" },
    { label: "À propos", href: "/qui-est-la-sorciere" },
    { label: "Contact", href: "#contact" },
  ];

  const bgColor = isDark ? "bg-gray-900 text-gray-200" : "bg-[#F3EFEA] text-[#6B4C6B]";
  const menuHover = "hover:text-[#A57C8C] transition-colors duration-300";
  const mobileBg = isDark ? "bg-gray-800" : "bg-[#EFE7DD]";
  const border = isDark ? "border-white/10" : "border-black/10";

  return (
    <nav className={`fixed top-0 left-0 w-full shadow-md z-50 ${bgColor}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between items-center">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold flex items-center gap-2">
            <GiOwl className="shrink-0" />
            L’Odyssée du Hibou
          </Link>

          {/* Botón hamburguesa (mobile) */}
          <button
            type="button"
            onClick={() => setIsOpen((v) => !v)}
            className={`md:hidden text-2xl rounded-xl px-3 py-1 border ${border}`}
            aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
          >
            {isOpen ? "✖" : "☰"}
          </button>

          {/* Menú desktop */}
          <div className="hidden md:flex space-x-6 items-center">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-1 font-titles ${menuHover}`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Overlay (mobile) */}
      <AnimatePresence>
        {isOpen && (
          <motion.button
            type="button"
            aria-label="Fermer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-30"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Drawer mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "-100%", opacity: 0, scale: 0.92, filter: "blur(8px)" }}
            animate={{ x: 0, opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ x: "-100%", opacity: 0, scale: 0.92, filter: "blur(8px)" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className={`fixed top-0 left-0 h-full w-72 shadow-lg z-40 p-6 flex flex-col rounded-tr-3xl rounded-br-3xl ${mobileBg}`}
          >
            <div className={`pb-4 mb-4 border-b ${border}`}>
              <div className="text-lg font-semibold flex items-center gap-2">
                <GiOwl />
                Menu
              </div>
              <p className={`mt-1 text-sm ${isDark ? "text-gray-400" : "text-[#6B4C6B]/70"}`}>
                Navigation rapide
              </p>
            </div>

            <div className="flex flex-col space-y-4">
              {menuItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ x: -20, opacity: 0, filter: "blur(4px)" }}
                  animate={{ x: 0, opacity: 1, filter: "blur(0px)" }}
                  exit={{ x: -20, opacity: 0, filter: "blur(4px)" }}
                  transition={{ delay: 0.08 * index, duration: 0.35 }}
                >
                  <Link
                    href={item.href}
                    className={`font-titles text-lg ${menuHover}`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="mt-auto pt-6">
              <p className={`text-xs ${isDark ? "text-gray-500" : "text-[#6B4C6B]/60"}`}>
                Astuce: appuie sur <span className="font-semibold">ESC</span> pour fermer.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
