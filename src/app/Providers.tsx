// app/components/Providers.tsx
"use client";

import { ThemeProvider } from "next-themes";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"          // 👈 usa class en <html>
      defaultTheme="light"       // 👈 tema inicial
      enableSystem={true}        // 👈 permite tema del sistema
      disableTransitionOnChange  // 👈 evita flashes raros
    >
      {children}
    </ThemeProvider>
  );
}
