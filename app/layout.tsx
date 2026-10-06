import type { Metadata } from "next";
import { Fraunces, Geist, Geist_Mono } from "next/font/google";
import { getCategories, getSite } from "@/lib/albums";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Título y descripción con el nombre real del fotógrafo (Eduardo).
export const metadata: Metadata = {
  title: "Eduardo · Galería de fotos de cumpleaños",
  description:
    "Galería de fotografías de Eduardo: retratos, paisajes, rincones urbanos y amigos — regalo de cumpleaños.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const site = getSite();
  const categories = getCategories();

  return (
    <html
      lang="es"
      className={`${fraunces.variable} ${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-canvas text-ink">
        {/* Chrome compartido por todas las rutas (portada, categoría y 404) */}
        <SiteHeader
          name={site.name}
          sections={categories.map(({ id, title }) => ({ id, title }))}
        />
        {children}
        <SiteFooter credit={site.credit} />
      </body>
    </html>
  );
}
