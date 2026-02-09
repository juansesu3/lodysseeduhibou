"use client";
import React from "react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { fadeSmokeWind } from "@/app/components/utils/animations"; // <-- importamos animación

const CTASection = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const bgColor = isDark ? "bg-transparent" : "bg-[#F3EFEA]";
  const titleColor = isDark ? "text-gray-200" : "text-[#5C4B6C]";
  const textColor = isDark ? "text-gray-400" : "text-[#4B2E4B]";
  const buttonBg = isDark ? "bg-gray-700" : "bg-[#5C4B6C]";
  const buttonHover = isDark ? "hover:bg-gray-600" : "hover:bg-[#A57C8C]";
  const dotsBg = isDark
    ? "opacity-[0.08] [background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:28px_28px]"
    : "opacity-[0.10] [background-image:radial-gradient(circle_at_1px_1px,#5C4B6C_1px,transparent_0)] [background-size:28px_28px]";

  return (
    <section
      className={`py-20 px-6 flex flex-col items-center text-center relative ${bgColor}`}
    >
        <div className="pointer-events-none absolute inset-0">
      
      <div className={`absolute inset-0 ${dotsBg}`} />
    </div>
      <motion.h2
        className={`text-3xl md:text-5xl font-bold mb-6 ${titleColor}`}
        variants={fadeSmokeWind("right")}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        custom={0.1}
      >
        Prêt pour ton voyage magique ?
      </motion.h2>

      <motion.p
        className={`max-w-3xl text-lg md:text-xl mb-6 ${textColor}`}
        variants={fadeSmokeWind("left")}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        custom={0.3}
      >
        Contacte-moi ou explore mes tirages pour découvrir ton chemin.
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
        Contacte-moi
      </motion.a>
    </section>
  );
};

export default CTASection;
