import Image from "next/image";
import type { Photo } from "@/lib/albums";

export interface HeroProps {
  photo: Photo;
}

/**
 * Hero de la portada: foto a sangre en 60 vh (T5 → v2).
 * Server Component: se renderiza en `app/page.tsx`.
 *
 * v2: añade nombre del fotógrafo sobre el velo inferior y un indicador
 * de scroll con punto pulsante en lugar del ChevronDown original.
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
        quality={60}
        className="object-cover object-[50%_55%]"
      />

      {/* Velo superior: cabecera fija legible sobre cualquier imagen */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-linear-to-b from-canvas/80 to-transparent"
      />

      {/* Velo inferior más profundo: permite leer el nombre sobre la foto */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-64 bg-linear-to-t from-canvas via-canvas/60 to-transparent"
      />

      {/* Nombre del fotógrafo — sobre el velo inferior */}
      <div className="absolute bottom-16 left-0 right-0 z-10 px-6 md:px-12">
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent/70 mb-2">
          Galería personal
        </p>
        <p className="font-display text-4xl font-medium tracking-[-0.02em] text-ink md:text-6xl">
          Eduardo
        </p>
      </div>

      {/* Indicador de scroll: línea + punto pulsante */}
      <div
        aria-hidden="true"
        className="absolute bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
      >
        <div className="h-6 w-px rounded-full bg-linear-to-b from-transparent to-muted/50" />
        <div className="relative flex items-center justify-center">
          {/* Anillo pulsante */}
          <span className="absolute h-3 w-3 rounded-full bg-accent/40 motion-safe:animate-ping" />
          {/* Dot estático */}
          <span className="relative h-1.5 w-1.5 rounded-full bg-accent" />
        </div>
      </div>
    </section>
  );
}
