'use client';
import React from "react";
import { motion } from "framer-motion";

const AboutSection = () => (
  <section className="relative  flex flex-col items-center text-center py-20 px-6 bg-[#F3EFEA]">
    <h2 className="text-3xl md:text-5xl font-bold text-[#5C4B6C] mb-6">
      La Philosophie
    </h2>
    <p className="max-w-3xl text-lg md:text-xl text-[#4B2E4B] mb-6">
      J’accompagne l’Humain dans sa métamorphose, avec bienveillance et magie, en explorant les chemins du tarot et des oracles.
    </p>
    {/* <motion.img
      src="/assets/owl-magic.png"
      alt="Owl Magic"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="w-64 md:w-96"
    /> */}
  </section>
);

export default AboutSection;
