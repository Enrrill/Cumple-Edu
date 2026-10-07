import type { Metadata } from "next";
import { Syne, Plus_Jakarta_Sans, Geist_Mono } from "next/font/google";
import { getCategories, getSite } from "@/lib/albums";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import "./globals.css";

/** Display: Syne — geométrica, contundente y con carácter de galería. */
const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  preload: false,
});

export const metadata: Metadata = {
  title: {
    default: "Eduardo · Galería de fotos de cumpleaños",
    template: "%s · Galería de fotos de cumpleaños",
  },
  description:
    "Un regalo de cumpleaños para Eduardo: retratos, paisajes, ciudades y amigos, más las dedicatorias de quienes le quieren.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const site = getSite();
  const categories = getCategories();

  return (
    <html
      lang="es"
      data-theme="light"
      suppressHydrationWarning
      className={`${syne.variable} ${plusJakarta.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('edu-theme')||'light';document.documentElement.setAttribute('data-theme',t);}catch(e){}})();`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-canvas text-ink transition-colors duration-300">
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
