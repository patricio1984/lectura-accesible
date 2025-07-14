import { Toaster } from "sonner";
import "./globals.css";
import type { Metadata } from "next";
import { Header } from "@/common/ui/Header";

export const metadata: Metadata = {
  title: "Lectura Accesible",
  description:
    "Aplicación web accesible que convierte texto a voz para todas las personas, con opciones personalizables y soporte para múltiples formatos.",
  authors: [{ name: "Patricio D. Mainero" }],
  metadataBase: new URL("https://lectura-accesible-bn4p.vercel.app"),
  icons: {
    icon: [
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", rel: "shortcut icon" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "Lectura Accesible",
    description:
      "Aplicación web accesible que convierte texto a voz para todas las personas, con opciones de velocidad y soporte para PDF y TXT.",
    url: "https://lectura-accesible-bn4p.vercel.app",
    siteName: "Lectura Accesible",
    images: [
      {
        url: "/og-image.webp",
        width: 1200,
        height: 630,
        alt: "Imagen representativa de Lectura Accesible",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lectura Accesible",
    description:
      "Convierte texto en voz de forma accesible, clara y con controles personalizables.",
    images: ["/og-image.webp"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <Header />
        {children}
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
