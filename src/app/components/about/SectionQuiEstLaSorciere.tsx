"use client";

import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fadeSmokeWind, staggerContainer } from "@/app/components/utils/animations";

export default function SectionQuiEstLaSorciere() {
  const router = useRouter();
  const { resolvedTheme } = useTheme();

  // Evita mismatch/hydration flicker
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const isDark = mounted ? resolvedTheme === "dark" : true;

  // Base palette
  const bgColor = isDark ? "bg-transparent" : "bg-[#F3EFEA]";
  const titleColor = isDark ? "text-white" : "text-[#5C4B6C]";
  const textColor = isDark ? "text-white/75" : "text-[#4B2E4B]";

  // UI helpers
  const kickerColor = isDark ? "text-white/60" : "text-[#5C4B6C]/70";
  const leadColor = isDark ? "text-white/70" : "text-[#4B2E4B]/80";

  const cardBg = isDark ? "bg-white/5" : "bg-white/70";
  const cardBorder = isDark ? "border-white/10" : "border-black/10";

  const softPanelBg = isDark ? "bg-black/10" : "bg-black/5";
  const softPanelBorder = isDark ? "border-white/10" : "border-black/10";

  const dotsBg = isDark
    ? "opacity-[0.08] [background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:28px_28px]"
    : "opacity-[0.10] [background-image:radial-gradient(circle_at_1px_1px,#5C4B6C_1px,transparent_0)] [background-size:28px_28px]";

  // Buttons
  const primaryBtn = isDark
    ? "bg-white/10 text-white hover:bg-white/15"
    : "bg-[#5C4B6C] text-white hover:bg-[#4c3d59]";
  const secondaryBtn = isDark
    ? "border-white/15 text-white/90 hover:bg-white/5"
    : "border-[#5C4B6C]/30 text-[#5C4B6C] hover:bg-[#5C4B6C]/10";

  return (
    <section id="a-propos" className={`relative overflow-hidden py-20 sm:py-28 ${bgColor}`}>
      {/* Background accents */}
      <div className="pointer-events-none absolute inset-0">
        <div className={`absolute inset-0 ${dotsBg}`} />
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-6">
        {/* Header (smoke) */}
        <motion.div
          className="mx-auto max-w-2xl text-center"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
        >
          <motion.p
            className={`text-sm tracking-[0.2em] ${kickerColor}`}
            variants={fadeSmokeWind("right")}
            custom={0.05}
          >
            À PROPOS
          </motion.p>

          <motion.h2
            className={`mt-3 text-3xl font-semibold tracking-tight sm:text-4xl ${titleColor}`}
            variants={fadeSmokeWind("right")}
            custom={0.12}
          >
            Qui est la Sorcière?
          </motion.h2>

          <motion.p
            className={`mt-4 text-base leading-relaxed ${leadColor}`}
            variants={fadeSmokeWind("right")}
            custom={0.18}
          >
            « Je ne lis pas ton futur pour t’imposer un destin.
            Je lis les énergies pour t’aider à retrouver ta clarté. »
          </motion.p>
        </motion.div>

        {/* Content */}
        <motion.div
          className="mt-12 grid items-center gap-10 lg:grid-cols-2 lg:gap-14"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
        >
          {/* Image (smoke left) */}
          <motion.div className="relative" variants={fadeSmokeWind("left")} custom={0.12}>
            <div className={`relative overflow-hidden rounded-3xl border ${cardBorder} ${cardBg} shadow-2xl`}>
              <div className="relative aspect-[4/5] w-full">
                <img
                  src="/assets/romi.jpeg"
                  alt="Portrait de la praticienne"
                  className="h-full w-full object-cover"
                  sizes="(max-width: 1024px) 100vw, 520px"
                />
              </div>

              <div className="flex items-center justify-between gap-4 p-5">
                <p className={`text-sm ${isDark ? "text-white/70" : "text-[#4B2E4B]/70"}`}>
                  Tarot & Oracles • Guidance bienveillante
                </p>
                <span className={`${isDark ? "text-white/50" : "text-[#5C4B6C]/50"} text-xs`}>✦</span>
              </div>
            </div>
          </motion.div>

          {/* Text card (smoke right) */}
          <motion.div className="relative" variants={fadeSmokeWind("right")} custom={0.18}>
            <div className={`rounded-3xl border ${cardBorder} ${cardBg} p-7 shadow-2xl backdrop-blur sm:p-10`}>
              <motion.p className={`${textColor} leading-[1.75]`} variants={fadeSmokeWind("right")} custom={0.08}>
                Avant tout, je suis une femme amoureuse de la vie, en perpétuel
                mouvement, passionnée par l’humain. Travailleuse sociale depuis
                de nombreuses années, j’ai accompagné des personnes en situation
                de handicap avec bienveillance et engagement.
              </motion.p>

              <motion.p className={`mt-5 ${textColor} leading-[1.75]`} variants={fadeSmokeWind("right")} custom={0.14}>
                Après la naissance de ma fille, une période de bouleversement a
                ouvert la voie du changement. J’ai choisi de suivre mon intuition
                et ma médiumnité. Mes alliés sont le Tarot et les Oracles, que je
                travaille de manière intuitive, complétés par le Reiki et
                d’autres soins énergétiques.
              </motion.p>

              <motion.p className={`mt-5 ${textColor} leading-[1.75]`} variants={fadeSmokeWind("right")} custom={0.2}>
                Mon accompagnement vise à t’aider à retrouver clarté, apaisement
                et stabilité, tout en respectant ton libre arbitre et ton chemin
                personnel.
              </motion.p>

              {/* Highlights (stagger) */}
              <motion.div
                className="mt-7 grid gap-3"
                variants={staggerContainer}
                initial={false}
                animate="visible"
              >
                {[
                  "Approche douce & bienveillante",
                  "Tarot & Oracles travaillés intuitivement",
                  "Tu restes libre et responsable de tes choix",
                ].map((item, idx) => (
                  <motion.div
                    key={item}
                    className={`flex items-start gap-3 rounded-2xl border ${softPanelBorder} ${softPanelBg} p-4`}
                    variants={fadeSmokeWind("left")}
                    custom={0.08 + idx * 0.08}
                  >
                    <span className={`mt-0.5 ${isDark ? "text-white/70" : "text-[#5C4B6C]/70"}`}>☾</span>
                    <p className={`text-sm leading-relaxed ${isDark ? "text-white/70" : "text-[#4B2E4B]/75"}`}>
                      {item}
                    </p>
                  </motion.div>
                ))}
              </motion.div>

              {/* Buttons (smoke) */}
              <motion.div className="mt-8 flex flex-wrap gap-3" variants={fadeSmokeWind("right")} custom={0.22}>
                <button
                  onClick={() => {
                    router.push("/#tirages");
                    setTimeout(() => {
                      document.getElementById("tirages")?.scrollIntoView({ behavior: "smooth" });
                    }, 0);
                  }}
                  className={`inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium transition ${primaryBtn}`}
                >
                  Découvrir les tirages
                </button>

                <a
                  href="#contact"
                  className={`inline-flex items-center justify-center rounded-full border bg-transparent px-6 py-3 text-sm font-medium transition ${secondaryBtn}`}
                >
                  Me contacter
                </a>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
