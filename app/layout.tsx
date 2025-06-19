import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/contexts/AppContext";

const inter = Inter({
  subsets: ["latin"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "UniPlanner - Organiza tu semestre, cuida tu salud mental",
  description: "La plataforma estudiantil que te ayuda a mantener el equilibrio perfecto entre tus estudios y tu bienestar emocional.",
  keywords: "universidad, planificador, estudiantes, salud mental, organización, estudios",
  icons: {
    icon: '/mascota.png',
    shortcut: '/mascota.png',
    apple: '/mascota.png',
  },
  openGraph: {
    title: "UniPlanner - Tu compañero académico inteligente",
    description: "Organiza tu semestre y cuida tu salud mental con UniPlanner",
    type: "website",
    images: ['/mascota.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#ec4899" />
      </head>
      <body
        className={`${inter.className} antialiased`}
      >
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
