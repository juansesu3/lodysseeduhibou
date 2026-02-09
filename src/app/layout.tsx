import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/NavBar";
import { Alegreya } from "next/font/google";
import MagicCursor from "./components/magic/MagicCursor";
import Footer from "./components/Footer";
import { Providers } from "./Providers";

const alegreya = Alegreya({ subsets: ["latin"], weight: ["400", "700", "900"] });

// ✅ IMPORTANTE: define NEXT_PUBLIC_SITE_URL en .env
// Ej: NEXT_PUBLIC_SITE_URL="https://ton-domaine.ch"
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.startsWith("http")
    ? process.env.NEXT_PUBLIC_SITE_URL
    : "https://lodhibou.ch";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "L’Odyssée du Hibou",
    template: "%s · L’Odyssée du Hibou",
  },

  description:
    "J’aide les femmes à transformer leurs blocages en force intérieure grâce au tarot — avec clarté, douceur et guidance.",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    url: "https://lodhibou.ch/",
    siteName: "L’Odyssée du Hibou",
    locale: "fr_FR",
    title: "L’Odyssée du Hibou",
    description:
      "J’aide les femmes à transformer leurs blocages en force intérieure grâce au tarot — avec clarté, douceur et guidance.",
    images: [
      {
        url: "/og/og-default.jpg", // se vuelve absoluto con metadataBase
        width: 1200,
        height: 630,
        alt: "L’Odyssée du Hibou — Tarot & Guidance",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "L’Odyssée du Hibou",
    description:
      "J’aide les femmes à transformer leurs blocages en force intérieure grâce au tarot — avec clarté, douceur et guidance.",
    images: ["/og/og-default.jpg"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body
        className={`${alegreya.className} bg-customLight text-gray-800 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300`}
      >
        <Providers>
          <MagicCursor />
          <Navbar />
          <main className="pt-16">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
