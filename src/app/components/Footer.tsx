'use client';
import React from "react";
import { GiOwl } from "react-icons/gi";
import { FaInstagram, FaFacebookF, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-t from-[#EDE8E2] to-[#F3EFEA] text-[#5C4B6C] py-12 px-6 mt-20 border-t border-[#d2d2d2]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Logo */}
        <div className="flex items-center text-2xl font-bold">
          <GiOwl className="mr-2" /> L’Odyssée du Hibou
        </div>

        {/* Links rápidos */}
        <div className="flex flex-col md:flex-row gap-4 md:gap-8 text-center">
          <a href="#accueil" className="hover:text-[#A57C8C] transition-colors duration-300">
            Accueil
          </a>
          <a href="#tirages" className="hover:text-[#A57C8C] transition-colors duration-300">
            Tirages
          </a>
          <a href="#l-oracle" className="hover:text-[#A57C8C] transition-colors duration-300">
            Oráculo IA
          </a>
          <a href="#apropos" className="hover:text-[#A57C8C] transition-colors duration-300">
            À propos
          </a>
          <a href="#contact" className="hover:text-[#A57C8C] transition-colors duration-300">
            Contact
          </a>
        </div>

        {/* Redes sociales */}
        <div className="flex gap-4 text-xl">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#A57C8C]">
            <FaInstagram />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#A57C8C]">
            <FaFacebookF />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#A57C8C]">
            <FaTwitter />
          </a>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-8 text-center text-sm text-[#4B2E4B]/80">
        &copy; {new Date().getFullYear()} L’Odyssée du Hibou. Tous droits réservés.
      </div>
    </footer>
  );
};

export default Footer;
