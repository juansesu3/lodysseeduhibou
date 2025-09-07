'use client'
import React from "react";

const CTASection = () => (
  <section className="py-20 px-6 bg-[#F3EFEA] flex flex-col items-center text-center">
    <h2 className="text-3xl md:text-5xl font-bold text-[#5C4B6C] mb-6">
      Prêt pour votre voyage magique ?
    </h2>
    <p className="max-w-3xl text-lg md:text-xl text-[#4B2E4B] mb-6">
      Contactez-nous ou explorez nos tirages pour découvrir votre chemin.
    </p>
    <a
      href="#contact"
      className="px-6 py-3 bg-[#5C4B6C] text-white rounded-full shadow-lg hover:bg-[#A57C8C] transition-colors duration-300"
    >
      Contactez-nous
    </a>
  </section>
);

export default CTASection;
