"use client";

import React, { useEffect, useState } from "react";
import { GiOwl } from "react-icons/gi";
import { FaInstagram, FaFacebookF } from "react-icons/fa";
import ThemeToggle from "./ThemeToggle";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import Link from "next/link";

const Footer = () => {
  const { theme } = useTheme();
  const pathname = usePathname();

  const hideOnOracle = pathname === "/oracle" || pathname.startsWith("/oracle/");
  const isDark = theme === "dark";

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  if (hideOnOracle) return null;

  // ✅ Label y href independientes
  const quickLinks: { label: string; href: string; external?: boolean }[] = [
    { label: "Accueil", href: "/" },
    { label: "Tirages", href: "/#tirages" },
    { label: "Oracle intelligent", href: "/oracle" },
    { label: "À propos", href: "/qui-est-la-sorciere" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <footer
      className={`py-12 px-6 pt-20 border-t transition-colors
        ${
          isDark
            ? "bg-gray-900 text-gray-200 border-gray-700"
            : "bg-gradient-to-t from-[#EDE8E2] to-[#F3EFEA] text-[#5C4B6C] border-[#d2d2d2]"
        }`}
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Logo */}
        <div className="flex items-center text-2xl font-bold">
          <GiOwl className="mr-2" /> L’Odyssée du Hibou
        </div>

        {/* Links rápidos */}
        <div className="flex flex-col md:flex-row gap-4 md:gap-8 text-center">
          {quickLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="hover:text-[#A57C8C] transition-colors duration-300"
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Redes sociales + Toggle */}
        <div className="flex items-center gap-4 text-xl">
          <a
            href="https://www.instagram.com/lodysseeduhibou/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#A57C8C]"
            aria-label="Instagram"
          >
            <FaInstagram />
          </a>

          <a
            href="https://www.facebook.com/profile.php?id=61556417047034"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#A57C8C]"
            aria-label="Facebook"
          >
            <FaFacebookF />
          </a>

          <ThemeToggle />
        </div>
      </div>

      <div className={`mt-8 text-center text-sm ${isDark ? "text-gray-400" : "text-[#4B2E4B]/80"}`}>
        &copy; {new Date().getFullYear()} L’Odyssée du Hibou. Tous droits réservés.
      </div>
    </footer>
  );
};

export default Footer;
