import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    /**
     * Candidatos de srcset afinados (T5, fase ≥95 móvil):
     * sin los tamaños menores de 160px (nadie muestra una tarjeta a 16px)
     * ni por encima de 1920 (las fotos de origen no superan ese ancho).
     * Cada atributo srcSet baja de ~10 candidatos a ~5 y el HTML de la
     * portada pierde ~45 KB, que en slow-4G son ~0,25 s de FCP.
     */
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [160, 320, 480],
    // Next 16 solo admite calidades permitidas; 60 aligera la imagen del
    // hero (LCP) y 75 es la de las tarjetas.
    qualities: [60, 75],
  },
};

export default nextConfig;
