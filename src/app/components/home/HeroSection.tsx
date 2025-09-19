'use client';
import React from 'react';
import Image from "next/image";
import { useTheme } from "next-themes";

const HeroSection = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const bgColor = isDark ? "bg-gray-900" : "bg-[#F3EFEA]";
  const titleColor = isDark ? "text-gray-200" : "text-[#5C4B6C]";
  const textColor = isDark ? "text-gray-400" : "text-[#4B2E4B]";
  const buttonBg = isDark ? "bg-gray-700" : "bg-[#5C4B6C]";
  const buttonHover = isDark ? "hover:bg-gray-600" : "hover:bg-[#A57C8C]";

  return (
    <section className={`relative flex flex-col items-center justify-center text-center min-h-screen font-body px-6 ${bgColor}`}>
      {/* Icono */}
      <div className="mb-6 flex flex-col items-center justify-center gap-9">
        <Image
          src="/assets/hero-image.png"
          alt="Logo Hibou"
          width={500}
          height={500}
          priority
        />
      </div>

      {/* Título */}
      <h1 className={`text-4xl md:text-6xl font-bold mb-4 ${titleColor}`}>
        L’Odyssée du Hibou
      </h1>

      {/* Subtítulo */}
      <p className={`text-lg md:text-xl max-w-2xl ${textColor}`}>
        J’accompagne avec bienveillance et amour l’Humain en métamorphose.
      </p>

      {/* Botón */}
      <a
        href="#tirages"
        className={`mt-8 px-6 py-3 rounded-full shadow-lg text-white transition-colors duration-300 ${buttonBg} ${buttonHover}`}
      >
        Découvrir les tirages
      </a>
    </section>
  );
};

export default HeroSection;
