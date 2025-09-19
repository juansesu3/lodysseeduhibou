'use client';
import React, { useEffect, useState } from "react";
import { GiOwl } from "react-icons/gi";
import { FaInstagram, FaFacebookF, FaTwitter } from "react-icons/fa";
import ThemeToggle from "./ThemeToggle";
import { useTheme } from "next-themes";

const Footer = () => {
  const { theme } = useTheme();

  const isDark = theme === "dark";
    const [mounted, setMounted] = useState(false);
  
    useEffect(() => setMounted(true), []);
  
    if (!mounted) return null; // evita mismatch
  

  return (
    <footer
      className={`py-12 px-6 pt-20 border-t transition-colors
        ${isDark 
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
          {["Accueil", "Tirages", "Oráculo IA", "À propos", "Contact"].map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase().replace(/\s+/g, "")}`}
              className={`hover:text-[#A57C8C] transition-colors duration-300`}
            >
              {link}
            </a>
          ))}
        </div>

        {/* Redes sociales + Toggle */}
        <div className="flex items-center gap-4 text-xl">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#A57C8C]">
            <FaInstagram />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#A57C8C]">
            <FaFacebookF />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#A57C8C]">
            <FaTwitter />
          </a>

          <ThemeToggle />
        </div>
      </div>

      {/* Copyright */}
      <div className={`mt-8 text-center text-sm ${isDark ? "text-gray-400" : "text-[#4B2E4B]/80"}`}>
        &copy; {new Date().getFullYear()} L’Odyssée du Hibou. Tous droits réservés.
      </div>
    </footer>
  );
};

export default Footer;
