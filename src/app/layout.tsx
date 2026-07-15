import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "El Vacío — Podcast",
  description:
    "Sitio oficial de El Vacío, una transmisión desde una estación liminal con Andrés e Iván.",
  metadataBase: new URL("https://elvacio.fm"),
  openGraph: {
    title: "El Vacío — Podcast",
    description:
      "Transmisiones, archivo y comunidad del podcast El Vacío.",
    type: "website",
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
