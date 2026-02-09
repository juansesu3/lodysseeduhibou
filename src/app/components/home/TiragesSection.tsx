"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useTheme } from "next-themes";
import { fadeSmokeWind, staggerContainer } from "@/app/components/utils/animations";

type Price =
  | { label: string; value: string }
  | { label?: undefined; value: string };

type Tirage = {
  id: string;
  title: string;
  description: string;
  image: string;
  href: string;
  bullets: string[];
  prices: Price[];
};

const tirages: Tirage[] = [
  {
    id: "nouvelle-lune",
    title: "Tirage Nouvelle Lune",
    description: "Commencez un nouveau cycle avec guidance et clarté.",
    image: "/assets/nnew-moon.png",
    href: "#luna-nueva",
    bullets: [
      "Ton énergie actuelle",
      "Ce que cette Nouvelle Lune t'apporte",
      "Ce à quoi t'ouvrir",
      "Ce qui peut se manifester concrètement",
      "Comment en tirer le meilleur",
    ],
    prices: [
      { label: "Version classique", value: "11 CHF" },
      { label: "Version approfondie", value: "22 CHF" },
    ],
  },
  {
    id: "pleine-lune",
    title: "Tirage Pleine Lune",
    description: "Éclairez votre chemin pendant la plénitude lunaire.",
    image: "/assets/full-moon.png",
    href: "#luna-llena",
    bullets: [
      "Ce qui arrive à son apogée dans ta vie",
      "Ce que tu dois éclairer ou comprendre",
      "Ce qui doit être libéré",
      "Comment canaliser l'énergie de cette lunaison",
    ],
    prices: [
      { label: "Version classique", value: "11 CHF" },
      { label: "Version approfondie", value: "22 CHF" },
    ],
  },
  {
    id: "rencontre-destinee",
    title: "Tirage La Rencontre Destinée",
    description: "Comprenez vos relations et émotions profondes.",
    image: "/assets/love.png",
    href: "#sentimental",
    bullets: ["Quand une rencontre arrive", "Qui tu attires", "Comment t'y préparer"],
    prices: [{ value: "33 CHF" }],
  },
  {
    id: "fortune-cachee",
    title: "Tirage La Fortune Cachée",
    description: "Obtenez des conseils pour votre carrière et vos projets.",
    image: "/assets/work.png",
    href: "#profesional",
    bullets: ["Tes talents et ressources cachées", "Les opportunités à saisir", "Comment attirer l'abondance"],
    prices: [{ value: "33 CHF" }],
  },
  {
    id: "shadow-work",
    title: "Tirage Shadow Work",
    description: "Explorez votre côté obscur pour libérer votre potentiel caché.",
    image: "/assets/shadow.png",
    href: "#shadow",
    bullets: ["Comprendre ton ombre", "Savoir ce que tu dois libérer", "Retrouver ton pouvoir intérieur"],
    prices: [{ value: "44 CHF" }],
  },
  {
    id: "eveil-sorciere",
    title: "Tirage L’Éveil de la Sorcière",
    description: "Recevez un message des forces naturelles et de votre intuition.",
    image: "/assets/message-sauvage.png",
    href: "#message-sauvage",
    bullets: ["Révéler ton potentiel spirituel", "Débloquer tes intuitions", "Avancer sur ton chemin magique"],
    prices: [{ value: "44 CHF" }],
  },
];

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 60 : -60,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -60 : 60,
    opacity: 0,
  }),
};

function TirageModal({
  isOpen,
  index,
  onClose,
  onChangeIndex,
  isDark,
}: {
  isOpen: boolean;
  index: number;
  onClose: () => void;
  onChangeIndex: (nextIndex: number) => void;
  isDark: boolean;
}) {
  const maxIndex = tirages.length - 1;
  const [direction, setDirection] = useState(0);

  const cardBg = isDark ? "bg-gray-900/60" : "bg-white/55";
  const titleColor = isDark ? "text-gray-100" : "text-[#5C4B6C]";
  const textColor = isDark ? "text-gray-300" : "text-[#6B5A7A]";
  const borderColor = isDark ? "border-white/10" : "border-[#5C4B6C]/15";

  const active = tirages[index];

  const go = (dir: number) => {
    const next = clamp(index + dir, 0, maxIndex);
    if (next === index) return;
    setDirection(dir);
    onChangeIndex(next);
  };

  // ESC + arrows + bloquear scroll
  useEffect(() => {
    if (!isOpen) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, index]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onMouseDown={(e) => {
          // cerrar si clic fuera (backdrop)
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <div className={`absolute inset-0 ${isDark ? "bg-black/60" : "bg-black/40"}`} />

        {/* Contenedor */}
        <motion.div
          className={`relative w-full max-w-3xl rounded-3xl border ${borderColor} ${cardBg} backdrop-blur-md shadow-2xl`}
          initial={{ scale: 0.98, y: 10, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.98, y: 10, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 26 }}
          role="dialog"
          aria-modal="true"
          aria-label="Détails du tirage"
        >
          {/* Header actions */}
          <div className="absolute right-3 top-3 flex items-center gap-2 z-10">
            <button
              type="button"
              onClick={onClose}
              className={`h-10 w-10 rounded-full border ${borderColor} ${isDark ? "text-gray-100" : "text-[#5C4B6C]"} hover:opacity-90`}
              aria-label="Fermer"
              title="Fermer"
            >
              ✕
            </button>
          </div>

          {/* Arrows (desktop) */}
          <div className="hidden md:flex">
            <button
              type="button"
              onClick={() => go(-1)}
              disabled={index === 0}
              className={`absolute left-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full border ${borderColor} ${isDark ? "text-gray-100" : "text-[#5C4B6C]"} disabled:opacity-40`}
              aria-label="Précédent"
            >
              ←
            </button>

            <button
              type="button"
              onClick={() => go(1)}
              disabled={index === maxIndex}
              className={`absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full border ${borderColor} ${isDark ? "text-gray-100" : "text-[#5C4B6C]"} disabled:opacity-40`}
              aria-label="Suivant"
            >
              →
            </button>
          </div>

          {/* Content (swipe) */}
          <div className="p-7 md:p-10">
            <motion.div
              key={active.id}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: "spring", stiffness: 280, damping: 28 }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.18}
              onDragEnd={(_, info) => {
                const offset = info.offset.x;
                const velocity = info.velocity.x;

                const offsetThreshold = 90;
                const velocityThreshold = 600;

                if (offset < -offsetThreshold || velocity < -velocityThreshold) go(1);
                else if (offset > offsetThreshold || velocity > velocityThreshold) go(-1);
              }}
            >
              <div className="text-center">
                <div className="flex items-center justify-center">
                  <Image
                    src={active.image}
                    alt={active.title}
                    width={520}
                    height={520}
                    className="w-40 h-40 md:w-48 md:h-48 object-contain select-none"
                    draggable={false}
                    priority
                  />
                </div>

                <h3 className={`mt-5 text-2xl md:text-3xl font-semibold ${titleColor}`}>
                  {active.title}
                </h3>
                <p className={`mt-2 text-base md:text-lg ${textColor}`}>
                  {active.description}
                </p>
              </div>

              {/* Details */}
              <div className="mt-7 text-left max-w-xl mx-auto">
                <p className={`text-sm uppercase tracking-wider ${isDark ? "text-gray-400" : "text-[#5C4B6C]/80"}`}>
                  Ce tirage te révèle
                </p>

                <ul className={`mt-3 space-y-2 ${textColor}`}>
                  {active.bullets.map((b) => (
                    <li key={b} className="flex gap-3">
                      <span className={`mt-2 h-1.5 w-1.5 rounded-full ${isDark ? "bg-gray-400" : "bg-[#5C4B6C]"}`} />
                      <span className="leading-relaxed">{b}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex flex-wrap gap-2">
                  {active.prices.map((p) => (
                    <span
                      key={`${p.label ?? "prix"}-${p.value}`}
                      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border ${borderColor} ${
                        isDark ? "text-gray-200" : "text-[#5C4B6C]"
                      } text-sm`}
                    >
                      {p.label ? (
                        <span className={`${isDark ? "text-gray-400" : "text-[#5C4B6C]/70"}`}>{p.label}</span>
                      ) : null}
                      <span className="font-semibold">{p.value}</span>
                    </span>
                  ))}
                </div>

                <div className="mt-7 flex items-center justify-center gap-3">
                  <a
                    href={active.href}
                    className={`inline-flex items-center justify-center rounded-full px-5 py-2.5 border ${borderColor} ${
                      isDark ? "text-gray-100" : "text-[#5C4B6C]"
                    } hover:opacity-90 transition`}
                  >
                    Choisir ce tirage
                  </a>

                  <button
                    type="button"
                    onClick={onClose}
                    className={`inline-flex items-center justify-center rounded-full px-5 py-2.5 border ${borderColor} ${
                      isDark ? "text-gray-100" : "text-[#5C4B6C]"
                    } hover:opacity-90 transition`}
                  >
                    Retour
                  </button>
                </div>

                {/* Dots */}
                <div className="mt-6 flex items-center justify-center gap-2">
                  {tirages.map((t, i) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => {
                        setDirection(i > index ? 1 : -1);
                        onChangeIndex(i);
                      }}
                      aria-label={`Aller à ${t.title}`}
                      className={`h-2.5 rounded-full transition-all ${
                        i === index ? "w-8" : "w-2.5"
                      } ${isDark ? "bg-white/60" : "bg-[#5C4B6C]/60"}`}
                    />
                  ))}
                </div>

                <p className={`mt-3 text-center text-xs ${isDark ? "text-gray-500" : "text-[#5C4B6C]/60"}`}>
                  Swipe ou flèches pour naviguer · ESC pour fermer
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

const TiragesSection = () => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const bgColor = isDark ? "bg-transparent" : "bg-[#F3EFEA]";
  const cardBg = isDark ? "bg-gray-800/80 backdrop-blur-md" : "bg-white/30 backdrop-blur-md";
  const titleColor = isDark ? "text-gray-200" : "text-[#5C4B6C]";

  const dotsBg = isDark
    ? "opacity-[0.08] [background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:28px_28px]"
    : "opacity-[0.10] [background-image:radial-gradient(circle_at_1px_1px,#5C4B6C_1px,transparent_0)] [background-size:28px_28px]";

  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const maxIndex = useMemo(() => tirages.length - 1, []);

  const openTirage = (idx: number) => {
    setSelectedIndex(clamp(idx, 0, maxIndex));
    setOpen(true);
  };

  return (
    <section id="tirages" className={`py-20 px-6 relative ${bgColor}`}>
      <div className="pointer-events-none absolute inset-0">
        <div className={`absolute inset-0 ${dotsBg}`} />
      </div>

      <motion.h2
        className={`text-3xl md:text-5xl font-bold text-center mb-12 ${titleColor}`}
        variants={fadeSmokeWind("right")}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        custom={0.1}
      >
        Mes Tirages
      </motion.h2>

      {/* GRID: se ven todas */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {tirages.map((t, idx) => (
          <motion.button
            key={t.id}
            type="button"
            onClick={() => openTirage(idx)}
            variants={fadeSmokeWind("left")}
            custom={0.12 * idx}
            whileHover={{ y: -8, scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className={`rounded-2xl shadow-lg p-6 flex flex-col items-center text-center cursor-pointer ${cardBg}`}
            aria-label={`Ouvrir ${t.title}`}
          >
            <Image
              src={t.image}
              alt={t.title}
              width={500}
              height={500}
              className="mb-4 w-32 h-32 object-contain"
            />
            <h3 className={`text-xl font-semibold ${titleColor}`}>{t.title}</h3>
            <p className={`mt-2 text-sm ${isDark ? "text-gray-400" : "text-[#6B5A7A]"}`}>
              {t.description}
            </p>
            <span className={`mt-4 text-xs ${isDark ? "text-gray-500" : "text-[#5C4B6C]/70"}`}>
              Cliquez pour voir les détails
            </span>
          </motion.button>
        ))}
      </motion.div>

      {/* MODAL: centrado + detalles + swipe */}
      <TirageModal
        isOpen={open}
        index={selectedIndex}
        onClose={() => setOpen(false)}
        onChangeIndex={(i) => setSelectedIndex(clamp(i, 0, maxIndex))}
        isDark={isDark}
      />
    </section>
  );
};

export default TiragesSection;
