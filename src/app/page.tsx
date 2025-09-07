import AboutSection from "./components/home/AboutSection";
import AIOracleSection from "./components/home/AIOracleSection";
import CTASection from "./components/home/CTASection";
import HeroSection from "./components/home/HeroSection";
import TiragesSection from "./components/home/TiragesSection";


export default function Home() {
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
