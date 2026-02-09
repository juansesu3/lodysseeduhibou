"use client";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { fadeSmokeWind } from "@/app/components/utils/animations";
import Link from "next/link";

const AIOracleSection = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const bgColor = isDark ? "bg-transparent" : "bg-[#F3EFEA]";
  const titleColor = isDark ? "text-gray-200" : "text-[#5C4B6C]";
  const textColor = isDark ? "text-gray-400" : "text-[#4B2E4B]";
  const cardBg = isDark
    ? ""
    : "";
  const buttonBg = isDark ? "bg-gray-700" : "bg-[#5C4B6C]";
  const buttonHover = isDark ? "hover:bg-gray-600" : "hover:bg-[#A57C8C]";
  const dotsBg = isDark
  ? "opacity-[0.08] [background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:28px_28px]"
  : "opacity-[0.10] [background-image:radial-gradient(circle_at_1px_1px,#5C4B6C_1px,transparent_0)] [background-size:28px_28px]";

  return (
    <section
      id="l-oracle"
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
        Pose ta question et laisse l'agent Tarot IA révéler ce que les
        cartes ont à te dire.
      </motion.p>

      <motion.div
        className={`rounded-3xl  p-6 w-full max-w-lg flex flex-col items-center ${cardBg}`}
        variants={fadeSmokeWind("right")}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        custom={0.5}
      >
       <Link href="/oracle" aria-label="Aller à la page de l'oracle">
          <motion.a
            className={`mt-4 px-6 py-3 rounded-full text-white transition-colors duration-300 ${buttonBg} ${buttonHover}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Découvrir
          </motion.a>
        </Link>
      </motion.div>
    </section>
  );
};

export default AIOracleSection;
