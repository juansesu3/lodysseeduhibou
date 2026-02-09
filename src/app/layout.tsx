
import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/NavBar";
import { Alegreya } from 'next/font/google';
import MagicCursor from "./components/magic/MagicCursor";
import Footer from "./components/Footer";
import { Providers } from "./Providers";


// Configuramos las fuentes
const alegreya = Alegreya({ subsets: ['latin'], weight: ['400', '700', '900'] });


export const metadata: Metadata = {
  title: "L’Odyssée du Hibou",
  description: "J’accompagne avec bienveillance et amour l’Humain en métamorphose. ",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning >

      <body
        className={`${alegreya.className} bg-customLight text-gray-800 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300`}
      >
        <Providers>
          {/* <StarsBackground /> */}
          <MagicCursor />
          <Navbar />
          <main className="pt-16">{children}</main>
          {/* <FloatingChat /> */}
          <Footer />
        </Providers>
      </body>

    </html>
  );
}
