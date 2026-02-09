import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/NavBar";
import { Alegreya } from "next/font/google";
import MagicCursor from "./components/magic/MagicCursor";
import Footer from "./components/Footer";
import { Providers } from "./Providers";
import { GoogleAnalytics } from "@next/third-parties/google";

const alegreya = Alegreya({ subsets: ["latin"], weight: ["400", "700", "900"] });

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
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "https://lodhibou.ch/",
    siteName: "L’Odyssée du Hibou",
    locale: "fr_FR",
    title: "L’Odyssée du Hibou",
    description:
      "J’aide les femmes à transformer leurs blocages en force intérieure grâce au tarot — avec clarté, douceur et guidance.",
    images: [{ url: "/assets/romi.jpeg", width: 1200, height: 630, alt: "L’Odyssée du Hibou — Tarot & Guidance" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "L’Odyssée du Hibou",
    description:
      "J’aide les femmes à transformer leurs blocages en force intérieure grâce au tarot — avec clarté, douceur et guidance.",
    images: ["/assets/romi.jpeg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  icons: { icon: "/favicon.ico", apple: "/assets/romi.jpeg" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={`${alegreya.className} bg-customLight text-gray-800 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300`}>
        {/* ✅ Google Analytics (GA4) */}
        {gaId && process.env.NODE_ENV === "production" && <GoogleAnalytics gaId={gaId} />}

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
