import { Toaster } from "sonner";
import "./globals.css";
import type { Metadata } from "next";
import { Header } from "@/common/ui/Header";

export const metadata: Metadata = {
  title: "Lectura Accesible",
  description: "Convierte texto a voz de forma accesible y profesional.",
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
