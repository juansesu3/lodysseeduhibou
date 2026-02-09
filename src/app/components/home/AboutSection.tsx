"use client";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { fadeSmokeWind, staggerContainer } from "@/app/components/utils/animations"; // <-- importa tus animaciones

const AboutSection = () => {
  // Evita mismatch/hydration flicker
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const isDark = mounted ? resolvedTheme === "dark" : true;
  // Mantenemos los puntos, cambiando el color en tema claro para que se vea sobre #F3EFEA
  const dotsBg = isDark
    ? "opacity-[0.08] [background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:28px_28px]"
    : "opacity-[0.10] [background-image:radial-gradient(circle_at_1px_1px,#5C4B6C_1px,transparent_0)] [background-size:28px_28px]";

  const bgColor = isDark ? "bg-transparent" : "bg-[#F3EFEA]";
  const titleColor = isDark ? "text-gray-200" : "text-[#5C4B6C]";
  const textColor = isDark ? "text-gray-400" : "text-[#4B2E4B]";

  return (
    <section
      className={`py-20 px-6 flex flex-col items-center text-center relative ${bgColor}`}
    >
      <div className="pointer-events-none absolute inset-0">
        <div className={`absolute inset-0 ${dotsBg}`} />
      </div>
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
          Ma Philosophie
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
