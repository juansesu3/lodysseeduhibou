import { Variants } from "framer-motion";

/**
 * Animación estilo humo mágico:
 * - Empieza borroso, con ligera opacidad y desplazamiento.
 * - Se desvanece y aparece suavemente con efecto etéreo.
 */
export const fadeSmokeWind = (direction: "left" | "right" = "right"): Variants => ({
    hidden: { 
      opacity: 0,
      x: direction === "right" ? 40 : -40, // 👈 desplazamiento lateral
      y: 20,
      filter: "blur(12px)",
      scale: 1.05,
    },
    visible: (delay: number = 0) => ({
      opacity: 1,
      x: 0,
      y: 0,
      filter: "blur(0px)",
      scale: 1,
      transition: { duration: 1.4, ease: "easeOut", delay },
    }),
  });

/**
 * Variante para elementos que aparecen uno tras otro como "cadena".
 * Muy útil para listas, grids o cartas de tarot.
 */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};
