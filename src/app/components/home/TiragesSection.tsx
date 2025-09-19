'use client';
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useTheme } from "next-themes";

const tirages = [
  {
    title: "Tarot Nouvelle Lune",
    description: "Commencez un nouveau cycle avec guidance et clarté.",
    image: "/assets/nnew-moon.png",
    href: "#luna-nueva",
  },
  {
    title: "Tarot Pleine Lune",
    description: "Éclairez votre chemin pendant la plénitude lunaire.",
    image: "/assets/full-moon.png",
    href: "#luna-llena",
  },
  {
    title: "Tarot Sentimental",
    description: "Comprenez vos relations et émotions profondes.",
    image: "/assets/love.png",
    href: "#sentimental",
  },
  {
    title: "Tarot Professionnel",
    description: "Obtenez des conseils pour votre carrière et vos projets.",
    image: "/assets/work.png",
    href: "#profesional",
  },
  {
    title: "Tarot Shadow Work",
    description: "Explorez votre côté obscur pour libérer votre potentiel caché.",
    image: "/assets/shadow.png",
    href: "#shadow",
  },
  {
    title: "Message Sauvage",
    description: "Recevez un message des forces naturelles et de votre intuition.",
    image: "/assets/message-sauvage.png",
    href: "#message-sauvage",
  },
];

const TiragesSection = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const bgColor = isDark ? "bg-gray-900" : "bg-[#F3EFEA]";
  const cardBg = isDark ? "bg-gray-800/80 backdrop-blur-md" : "bg-white/30 backdrop-blur-md";
  const titleColor = isDark ? "text-gray-200" : "text-[#5C4B6C]";
  const textColor = isDark ? "text-gray-400" : "text-[#4B2E4B]";
  const buttonBg = isDark ? "bg-gray-700" : "bg-[#5C4B6C]";
  const buttonHover = isDark ? "hover:bg-gray-600" : "hover:bg-[#A57C8C]";

  return (
    <section id="tirages" className={`py-20 px-6 ${bgColor}`}>
      <h2 className={`text-3xl md:text-5xl font-bold text-center mb-12 ${titleColor}`}>
        Nos Tirages
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {tirages.map((tirage) => (
          <motion.div
            key={tirage.title}
            whileHover={{ y: -10, scale: 1.05 }}
            className={`rounded-2xl shadow-lg p-6 flex flex-col items-center text-center cursor-pointer ${cardBg}`}
          >
            <Image
              src={tirage.image}
              alt={tirage.title}
              width={500}
              height={500}
              className="mb-4 w-32 h-32 object-contain"
            />
            <h3 className={`text-xl font-semibold mb-2 ${titleColor}`}>{tirage.title}</h3>
            <p className={`mb-4 ${textColor}`}>{tirage.description}</p>
            <a
              href={tirage.href}
              className={`px-4 py-2 rounded-full text-white transition-colors duration-300 ${buttonBg} ${buttonHover}`}
            >
              Découvrir
            </a>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default TiragesSection;
