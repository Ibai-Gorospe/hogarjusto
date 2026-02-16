import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HogarJusto — ¿Es justo el precio de tu piso?",
  description: "Herramienta gratuita para saber si el precio de una vivienda es justo. Precios por barrio, calculadora de costes, simulador de hipoteca y guía de compra. Vitoria-Gasteiz y más ciudades de España.",
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🏡</text></svg>",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
