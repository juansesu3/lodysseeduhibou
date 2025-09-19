'use client';
import React from "react";
import { useTheme } from "next-themes";

const AboutSection = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const bgColor = isDark ? "bg-gray-900" : "bg-[#F3EFEA]";
  const titleColor = isDark ? "text-gray-200" : "text-[#5C4B6C]";
  const textColor = isDark ? "text-gray-400" : "text-[#4B2E4B]";

  return (
    <section className={`relative flex flex-col items-center text-center py-20 px-6 ${bgColor}`}>
      <h2 className={`text-3xl md:text-5xl font-bold mb-6 ${titleColor}`}>
        La Philosophie
      </h2>
      <p className={`max-w-3xl text-lg md:text-xl mb-6 ${textColor}`}>
        J’accompagne l’Humain dans sa métamorphose, avec bienveillance et magie, en explorant les chemins du tarot et des oracles.
      </p>
    </section>
  );
};

export default AboutSection;
