import Image from "next/image";
import { ChevronDown } from "lucide-react";
import type { Photo } from "@/lib/albums";

export interface HeroProps {
  photo: Photo;
}

/**
 * Hero fijo de la portada: una foto «a sangre» en banda de 60vh (T5):
 * sin carrusel ni JS, la imagen se sirve con `priority` para que sea LCP.
 * Server Component: se renderiza en `app/page.tsx` y no entra en el bundle
 * cliente de las rejillas. La foto se elige con `site.heroPhotoId`.
 * Los velos garantizan que el encabezado fijo y el scroll-hint se lean
 * sobre cualquier imagen.
 */
export function Hero({ photo }: HeroProps) {
  return (
    <section className="relative h-[60vh] min-h-[420px] w-full overflow-hidden bg-canvas">
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        sizes="100vw"
        priority
        fetchPriority="high"
        // q=60: en slow-4G la imagen del LCP pesa ~90 KB en vez de ~136 KB
        // y la diferencia de nitidez en una banda de 60vh es imperceptible.
        quality={60}
        className="object-cover object-[50%_55%]"
      />

      {/* Velos: el encabezado fijo debe leerse sobre fotos claras (arriba)
          y el scroll-hint sobre cualquier imagen (abajo). */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-linear-to-b from-canvas/80 to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-44 bg-linear-to-t from-canvas to-transparent"
      />

      <div
        aria-hidden="true"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-muted"
      >
        <ChevronDown className="h-6 w-6 motion-safe:animate-[scroll-hint_2.6s_ease-in-out_infinite]" />
      </div>
    </section>
  );
}
