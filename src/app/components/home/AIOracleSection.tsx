'use client'
import React from "react";

const AIOracleSection = () => (
  <section
    id="l-oracle"
    className="py-20 px-6 bg-[#F3EFEA] flex flex-col items-center text-center"
  >
    <h2 className="text-3xl md:text-5xl font-bold text-[#5C4B6C] mb-6">
      Oracle Intélligent
    </h2>
    <p className="max-w-3xl text-lg md:text-xl text-[#4B2E4B] mb-6">
      Posez votre question et laissez notre agent Tarot IA révéler ce que les cartes ont à vous dire.
    </p>
    <div className="bg-white/30 backdrop-blur-md rounded-3xl shadow-lg p-6 w-full max-w-lg flex flex-col items-center">
      {/* Aquí se puede integrar el chat del Oráculo IA */}
      <button className="mt-4 px-6 py-3 bg-[#5C4B6C] text-white rounded-full hover:bg-[#A57C8C] transition-colors duration-300">
        Démarrer la tirade
      </button>
    </div>
  </section>
);

export default AIOracleSection;
