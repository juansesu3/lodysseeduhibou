"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { fadeSmokeWind } from "@/app/components/utils/animations"; // 👈 importamos la animación

const HeroSection = () => {
  const { resolvedTheme } = useTheme();
      const [mounted, setMounted] = useState(false);
      useEffect(() => setMounted(true), []);
      const isDark = mounted ? resolvedTheme === "dark" : true;

  const bgColor = isDark ? "bg-transparent" : "bg-[#F3EFEA]";
  const titleColor = isDark ? "text-gray-200" : "text-[#5C4B6C]";
  const textColor = isDark ? "text-gray-400" : "text-[#4B2E4B]";
  const buttonBg = isDark ? "bg-gray-700" : "bg-[#5C4B6C]";
  const buttonHover = isDark ? "hover:bg-gray-600" : "hover:bg-[#A57C8C]";
  

      // Mantenemos los puntos, cambiando el color en tema claro para que se vea sobre #F3EFEA
      const dotsBg = isDark
      ? "opacity-[0.08] [background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:28px_28px]"
      : "opacity-[0.10] [background-image:radial-gradient(circle_at_1px_1px,#5C4B6C_1px,transparent_0)] [background-size:28px_28px]";
  
    const topBlob = isDark ? "bg-violet-400/10" : "bg-violet-500/10";
    const rightBlob = isDark ? "bg-indigo-400/10" : "bg-indigo-500/10";

  return (
    <section
      className={`relative flex flex-col items-center justify-center text-center min-h-screen font-body px-6 overflow-hidden ${bgColor}`}
    >
       <div className="pointer-events-none absolute inset-0">
      
        <div className={`absolute inset-0 ${dotsBg}`} />
      </div>
      {/* Icono */}
      <motion.div
        className="mb-6 flex flex-col items-center justify-center gap-9"
        variants={fadeSmokeWind("right")}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        custom={0.1}
      >
        <Image
          src="/assets/hero-image.png"
          alt="Logo Hibou"
          width={500}
          height={500}
          priority
        />
      </motion.div>

      {/* Título */}
      <motion.h1
        className={`text-4xl md:text-6xl font-bold mb-4 ${titleColor}`}
        variants={fadeSmokeWind("left")}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        custom={0.3}
      >
        L’Odyssée du Hibou
      </motion.h1>

      {/* Subtítulo */}
      <motion.p
        className={`text-lg md:text-xl max-w-2xl ${textColor}`}
        variants={fadeSmokeWind("right")}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        custom={0.5}
      >
        J'aide les femmes à transformer leurs blocages en force grâce au tarot.
      </motion.p>

      {/* Botón */}
      <motion.a
        href="#tirages"
        className={`mt-8 px-6 py-3 rounded-full shadow-lg text-white transition-colors duration-300 ${buttonBg} ${buttonHover}`}
        variants={fadeSmokeWind("left")}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        custom={0.7}
      >
        Découvrir les tirages
      </motion.a>
    </section>
  );
};

export default HeroSection;
