import Image from "next/image";
import type { Photo } from "@/lib/albums";

export interface HeroProps {
  photo: Photo;
  /** Nombre del sitio: encabeza (oculto a la vista) el h1 único de la portada. */
  name?: string;
}

/**
 * Hero de la portada: foto a sangre en 60 vh con el título conceptual.
 * Server Component: se renderiza en `app/page.tsx`.
 *
 * v3: lleva el **h1 único de la portada**. El nombre del sitio se inyecta como
 * prefijo `sr-only`, así el encabezado accesible habla de la galería sin que
 * exista un segundo `<h1>` en la página.
 */
export function Hero({ photo, name }: HeroProps) {
  return (
    <section className="relative h-[60vh] min-h-105 w-full overflow-hidden bg-canvas">
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

      {/* Título conceptual: aquí vive el h1 único de la portada */}
      <div className="absolute bottom-16 left-0 right-0 z-10 px-6 md:px-12">
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent font-semibold mb-2">
          Edición Especial · Cumpleaños
        </p>
        <h1 className="font-display text-4xl font-semibold tracking-tight text-ink md:text-6xl">
          {name && (
            <span className="sr-only">{`${name} · Galería de fotos de cumpleaños — `}</span>
          )}
          Historias &amp; Miradas
        </h1>
        <p className="mt-2 text-sm md:text-base text-muted max-w-md">
          Una recopilación visual de Eduardo
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
