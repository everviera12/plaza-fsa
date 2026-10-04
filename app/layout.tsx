import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/header";

export const metadata: Metadata = {
  title: "Plaza Fiesta San Agustín",
  description: "Tu lugar en el corazón de San Agustín. Compras, comida, entretenimiento y más.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="antialiased">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}