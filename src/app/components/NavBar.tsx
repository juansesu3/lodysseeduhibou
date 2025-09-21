"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GiOwl } from "react-icons/gi";
import { IoMdArrowDropdown } from "react-icons/io";
import { useTheme } from "next-themes";
import Link from "next/link";

const MotionArrow = motion(IoMdArrowDropdown);

export default function Navbar() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const menuItems = [
    { label: "Accueil", href: "/" },
    {
      label: "Tirages de Tarot",
      href: "#tirages",
      subItems: [
        { label: "Tarot Nouvelle Lune", href: "#luna-nueva" },
        { label: "Tarot Pleine Lune", href: "#luna-llena" },
        { label: "Tarot Sentimental", href: "#sentimental" },
        { label: "Tarot Professionnel", href: "#profesional" },
        { label: "Tarot Shadow Work", href: "#shadow" },
        { label: "Message Sauvage", href: "#message-sauvage" },
      ],
    },
    { label: "L’Oracle", href: "/oracle" },
    { label: "À propos", href: "#apropos" },
    { label: "Contact", href: "#contact" },
  ];

  const bgColor = isDark ? "bg-gray-900 text-gray-200" : "bg-[#F3EFEA] text-[#6B4C6B]";
  const menuHover = "hover:text-[#A57C8C] transition-colors duration-300";
  const mobileBg = isDark ? "bg-gray-800" : "bg-[#EFE7DD]";
  const dropdownBg = isDark ? "bg-gray-800/80 backdrop-blur-md" : "bg-white/30 backdrop-blur-md";

  return (
    <nav className={`fixed top-0 left-0 w-full shadow-md z-50 ${bgColor}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between items-center">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold flex items-center gap-2">
            <GiOwl className="shrink-0" />
            L’Odyssée du Hibou
          </Link>

          {/* Botón Hamburguesa Mobile */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-2xl">
            {isOpen ? "✖" : "☰"}
          </button>

          {/* Menú Desktop */}
          <div className="hidden md:flex space-x-6 items-center">
            {menuItems.map((item) => (
              <div
                key={item.href}
                className="relative flex items-center"
                onMouseEnter={() => item.subItems && setActiveDropdown(item.href)}
                onMouseLeave={() => item.subItems && setActiveDropdown(null)}
              >
                {item.subItems ? (
                  <button
                    onClick={() =>
                      setActiveDropdown(activeDropdown === item.href ? null : item.href)
                    }
                    className={`flex items-center gap-1 cursor-pointer font-titles ${menuHover}`}
                  >
                    {item.label}
                    <MotionArrow
                      animate={{ rotate: activeDropdown === item.href ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-lg"
                    />
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    className={`flex items-center gap-1 font-titles ${menuHover}`}
                  >
                    {item.label}
                  </Link>
                )}

                {/* Dropdown Desktop */}
                {item.subItems && (
                  <AnimatePresence>
                    {activeDropdown === item.href && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className={`absolute top-full left-0 mt-2 rounded-2xl shadow-lg flex flex-col w-48 p-2 space-y-1 z-50 ${dropdownBg}`}
                      >
                        {item.subItems.map((sub) => (
                          <Link
                            key={sub.href}
                            href={sub.href}
                            className={`cursor-pointer px-3 py-2 rounded-lg ${menuHover}`}
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Fondo oscuro Mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-30"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Menú Mobile con animación */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "-100%", opacity: 0, scale: 0.8, filter: "blur(8px)" }}
            animate={{ x: 0, opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ x: "-100%", opacity: 0, scale: 0.8, filter: "blur(8px)" }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className={`fixed top-0 left-0 h-full w-64 shadow-lg z-40 p-6 flex flex-col space-y-4 rounded-tr-3xl rounded-br-3xl ${mobileBg}`}
          >
            {menuItems.map((item, index) => (
              <div key={item.href} className="flex flex-col">
                <motion.div
                  initial={{ x: -30, opacity: 0, filter: "blur(4px)" }}
                  animate={{ x: 0, opacity: 1, filter: "blur(0px)" }}
                  exit={{ x: -30, opacity: 0, filter: "blur(4px)" }}
                  transition={{ delay: 0.1 * index, duration: 0.4 }}
                  className="flex justify-between items-center"
                >
                  <Link
                    href={item.href}
                    className={`font-titles ${menuHover}`}
                    onClick={(e) => {
                      if (item.subItems) {
                        e.preventDefault();
                        setActiveDropdown(activeDropdown === item.href ? null : item.href);
                      } else {
                        setIsOpen(false);
                      }
                    }}
                  >
                    {item.label}
                  </Link>
                  {item.subItems && (
                    <button
                      type="button"
                      className="ml-2"
                      onClick={() =>
                        setActiveDropdown(activeDropdown === item.href ? null : item.href)
                      }
                    >
                      <MotionArrow
                        animate={{ rotate: activeDropdown === item.href ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      />
                    </button>
                  )}
                </motion.div>

                {item.subItems && activeDropdown === item.href && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="ml-4 flex flex-col space-y-1"
                  >
                    {item.subItems.map((sub) => (
                      <Link
                        key={sub.href}
                        href={sub.href}
                        className={`${menuHover} px-2 py-1 rounded-lg`}
                        onClick={() => setIsOpen(false)}
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
