"use client";
import React from "react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { fadeSmokeWind } from "@/app/components/utils/animations"; 

const AIOracleSection = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const bgColor = isDark ? "bg-transparent" : "bg-[#F3EFEA]";
  const titleColor = isDark ? "text-gray-200" : "text-[#5C4B6C]";
  const textColor = isDark ? "text-gray-400" : "text-[#4B2E4B]";
  const cardBg = isDark
    ? "bg-gray-800/80 backdrop-blur-md"
    : "bg-white/30 backdrop-blur-md";
  const buttonBg = isDark ? "bg-gray-700" : "bg-[#5C4B6C]";
  const buttonHover = isDark ? "hover:bg-gray-600" : "hover:bg-[#A57C8C]";

  return (
    <section
      id="l-oracle"
      className={`py-20 px-6 flex flex-col items-center text-center ${bgColor}`}
    >
      <motion.h2
        className={`text-3xl md:text-5xl font-bold mb-6 ${titleColor}`}
        variants={fadeSmokeWind("right")}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        custom={0.1}
      >
        Oracle Intelligent
      </motion.h2>

      <motion.p
        className={`max-w-3xl text-lg md:text-xl mb-6 ${textColor}`}
        variants={fadeSmokeWind("left")}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        custom={0.3}
      >
        Posez votre question et laissez notre agent Tarot IA révéler ce que les
        cartes ont à vous dire.
      </motion.p>

      <motion.div
        className={`rounded-3xl shadow-lg p-6 w-full max-w-lg flex flex-col items-center ${cardBg}`}
        variants={fadeSmokeWind("right")}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        custom={0.5}
      >
        <motion.button
          className={`mt-4 px-6 py-3 rounded-full text-white transition-colors duration-300 ${buttonBg} ${buttonHover}`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Démarrer la tirade
        </motion.button>
      </motion.div>
    </section>
  );
};

export default AIOracleSection;
