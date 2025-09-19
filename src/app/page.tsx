'use client';
import { useEffect, useState } from "react";
import AboutSection from "./components/home/AboutSection";
import AIOracleSection from "./components/home/AIOracleSection";
import CTASection from "./components/home/CTASection";
import HeroSection from "./components/home/HeroSection";
import TiragesSection from "./components/home/TiragesSection";


export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null; // evita mismatch

  return (
    
   <>
   <HeroSection/>
   <AboutSection />
      <TiragesSection />
      <AIOracleSection />
      <CTASection />
   </>
  );
}
