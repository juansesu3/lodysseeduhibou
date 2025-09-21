"use client";
import React from "react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { fadeSmokeWind, staggerContainer } from "@/app/components/utils/animations"; // <-- importamos animación

const CTASection = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const bgColor = isDark ? "bg-transparent" : "bg-[#F3EFEA]";
  const titleColor = isDark ? "text-gray-200" : "text-[#5C4B6C]";
  const textColor = isDark ? "text-gray-400" : "text-[#4B2E4B]";
  const buttonBg = isDark ? "bg-gray-700" : "bg-[#5C4B6C]";
  const buttonHover = isDark ? "hover:bg-gray-600" : "hover:bg-[#A57C8C]";

  return (
    <section
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
        Prêt pour votre voyage magique ?
      </motion.h2>

      <motion.p
        className={`max-w-3xl text-lg md:text-xl mb-6 ${textColor}`}
        variants={fadeSmokeWind("left")}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        custom={0.3}
      >
        Contactez-nous ou explorez nos tirages pour découvrir votre chemin.
      </motion.p>

      <motion.a
        href="#contact"
        className={`px-6 py-3 rounded-full shadow-lg text-white transition-colors duration-300 ${buttonBg} ${buttonHover}`}
        variants={fadeSmokeWind("right")}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        custom={0.5}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Contactez-nous
      </motion.a>
    </section>
  );
};

export default CTASection;
