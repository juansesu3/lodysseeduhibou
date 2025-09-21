"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function OracleLandingPage() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";
  const [mounted, setMounted] = useState(false);

  // evitar problemas de SSR/CSR con next-themes
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <main
      className={`min-h-screen transition-colors duration-500 ${
        isDark
          ? "bg-gradient-to-b from-gray-900 via-gray-950 to-gray-900 text-gray-100"
          : "bg-[#F3EFEA] text-gray-800"
      }`}
    >
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center text-center px-6 py-20">
        {/* Toggle Theme */}
      
        <h1 className="text-4xl md:text-6xl font-bold mb-6 font-titles">
          Bienvenue à <span className="text-purple-600">L’Oracle</span>
        </h1>
        <p className="max-w-2xl text-lg md:text-xl mb-8">
          Une expérience mystique à portée de main.  
          Connectez-vous, explorez votre chemin spirituel et recevez des tirages de tarot personnalisés grâce à notre application web progressive (PWA).
        </p>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link
            href="#download"
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg transition"
          >
            🚀 Installer l’application
          </Link>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-16 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 font-titles">Fonctionnalités principales</h2>
        <div className="grid md:grid-cols-3 gap-10">
          <div
            className={`p-6 rounded-2xl shadow-md hover:shadow-xl transition ${
              isDark ? "bg-gray-800" : "bg-white"
            }`}
          >
            <h3 className="text-xl font-semibold mb-3">🔮 Tirages de Tarot</h3>
            <p>Accédez à des tirages pour la nouvelle lune, la pleine lune, l’amour, le travail et plus encore.</p>
          </div>
          <div
            className={`p-6 rounded-2xl shadow-md hover:shadow-xl transition ${
              isDark ? "bg-gray-800" : "bg-white"
            }`}
          >
            <h3 className="text-xl font-semibold mb-3">🧑‍🤝‍🧑 Profils personnalisés</h3>
            <p>Créez votre compte, sauvegardez vos tirages et suivez votre parcours spirituel.</p>
          </div>
          <div
            className={`p-6 rounded-2xl shadow-md hover:shadow-xl transition ${
              isDark ? "bg-gray-800" : "bg-white"
            }`}
          >
            <h3 className="text-xl font-semibold mb-3">📱 Expérience native</h3>
            <p>Installez l’app comme une application native (PWA) sur votre smartphone ou ordinateur.</p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        className={`px-6 py-16 ${
          isDark ? "bg-transparent" : "bg-[#F3EFEA]"
        } transition-colors duration-500`}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 font-titles">Pourquoi L’Oracle ?</h2>
          <p className="text-lg leading-relaxed">
            Notre mission est de rendre la sagesse du tarot accessible à tous, partout.  
            Que vous cherchiez des réponses, une guidance ou simplement un moment de connexion intérieure,  
            <span className="text-purple-600 font-semibold"> L’Odyssée du Hibou</span> vous accompagne dans votre voyage spirituel.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section id="download" className="px-6 py-20 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 font-titles">
          🌙 Prêt à commencer votre voyage ?
        </h2>
        <p className="mb-8 text-lg">Installez l’application et explorez votre destin dès aujourd’hui.</p>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link
            href="/pwa-download"
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-8 py-4 rounded-xl shadow-lg text-lg transition"
          >
            ⬇️ Télécharger L’Oracle
          </Link>
        </motion.div>
      </section>
    </main>
  );
}
