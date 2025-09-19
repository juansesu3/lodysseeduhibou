'use client';
import React from "react";
import { useTheme } from "next-themes";

const CTASection = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const bgColor = isDark ? "bg-gray-900" : "bg-[#F3EFEA]";
  const titleColor = isDark ? "text-gray-200" : "text-[#5C4B6C]";
  const textColor = isDark ? "text-gray-400" : "text-[#4B2E4B]";
  const buttonBg = isDark ? "bg-gray-700" : "bg-[#5C4B6C]";
  const buttonHover = isDark ? "hover:bg-gray-600" : "hover:bg-[#A57C8C]";

  return (
    <section className={`py-20 px-6 flex flex-col items-center text-center ${bgColor}`}>
      <h2 className={`text-3xl md:text-5xl font-bold mb-6 ${titleColor}`}>
        Prêt pour votre voyage magique ?
      </h2>
      <p className={`max-w-3xl text-lg md:text-xl mb-6 ${textColor}`}>
        Contactez-nous ou explorez nos tirages pour découvrir votre chemin.
      </p>
      <a
        href="#contact"
        className={`px-6 py-3 rounded-full shadow-lg text-white transition-colors duration-300 ${buttonBg} ${buttonHover}`}
      >
        Contactez-nous
      </a>
    </section>
  );
};

export default CTASection;
