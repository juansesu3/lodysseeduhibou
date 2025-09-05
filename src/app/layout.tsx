
import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/NavBar";
import FloatingChat from "./components/TarotBot/FloatingChat";
import { Alegreya, Fondamento } from 'next/font/google';
import MagicCursor from "./components/magic/MagicCursor";

// Configuramos las fuentes
const alegreya = Alegreya({ subsets: ['latin'], weight: ['400','700','900'] });
const fondamento = Fondamento({ subsets: ['latin'], weight: '400' });

export const metadata: Metadata = {
  title: "L’Odyssée du Hibou",
  description: "J’accompagne avec bienveillance et amour l’Humain en métamorphose. ",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className={`${alegreya.className} bg-efe7dd text-gray-800`}>
        <MagicCursor/>
        <Navbar />
        <main className="pt-16">{children}</main>
        <FloatingChat/>
      </body>
    </html>
  );
}
