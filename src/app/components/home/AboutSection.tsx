"use client";
import React from "react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { fadeSmokeWind, staggerContainer } from "@/app/components/utils/animations"; // <-- importa tus animaciones

const AboutSection = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const bgColor = isDark ? "bg-transparent" : "bg-[#F3EFEA]";
  const titleColor = isDark ? "text-gray-200" : "text-[#5C4B6C]";
  const textColor = isDark ? "text-gray-400" : "text-[#4B2E4B]";

  return (
    <section
      className={`relative flex flex-col items-center text-center py-20 px-6 ${bgColor}`}
    >
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.h2
          className={`text-3xl md:text-5xl font-bold mb-6 ${titleColor}`}
          variants={fadeSmokeWind("right")}
          custom={0.1}
        >
          La Philosophie
        </motion.h2>
        <motion.p
          className={`max-w-3xl text-lg md:text-xl mb-6 ${textColor}`}
          variants={fadeSmokeWind("left")}
          custom={0.3}
        >
          J’accompagne l’Humain dans sa métamorphose, avec bienveillance et magie,
          en explorant les chemins du tarot et des oracles.
        </motion.p>
      </motion.div>
    </section>
  );
};

export default AboutSection;
