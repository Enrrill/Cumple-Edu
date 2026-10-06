import Image from "next/image";
import type { SiteInfo } from "@/lib/albums";

export interface BioProps {
  site: SiteInfo;
}

/**
 * Sección bio del fotógrafo — v2:
 * - Retrato con `rounded-2xl` y marco de esquina esmeralda (acento de marca)
 * - Las dos líneas decorativas de la esquina superior derecha replican la
 *   "marca de selección" del sistema de diseño (DESIGN.md)
 * - La dedicatoria con letra capital en accent y tipografía Fraunces
 * - Animación de entrada igual que las placas de categoría (CSS puro)
 */
export function Bio({ site }: BioProps) {
  return (
    <section className="category-plate mx-auto max-w-7xl px-6 py-16 md:py-24">
      <div className="grid gap-8 md:grid-cols-2 md:gap-16">
        {/* Retrato con marco de esquina esmeralda */}
        <div className="relative aspect-4/5 overflow-hidden rounded-2xl">
          {/* Borde base del frame */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-10 rounded-2xl border border-line/50"
          />

          {/* Acento esmeralda en la esquina superior derecha */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-0 top-0 z-20"
          >
            {/* Línea horizontal */}
            <div className="absolute right-0 top-0 h-px w-16 bg-linear-to-l from-accent/65 to-transparent" />
            {/* Línea vertical */}
            <div className="absolute right-0 top-0 h-16 w-px bg-linear-to-b from-accent/65 to-transparent" />
          </div>

          {/* Acento esmeralda en la esquina inferior izquierda (eco) */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-0 left-0 z-20"
          >
            <div className="absolute bottom-0 left-0 h-px w-10 bg-linear-to-r from-accent/30 to-transparent" />
            <div className="absolute bottom-0 left-0 h-10 w-px bg-linear-to-t from-accent/30 to-transparent" />
          </div>

          <Image
            src={site.portrait.src}
            alt={site.portrait.alt}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>

        {/* Texto */}
        <div className="self-center">
          <h2 className="font-display text-[25px] font-medium tracking-tight text-ink md:text-[32px]">
            {site.name}
          </h2>
          <p className="mt-6 text-base leading-7 text-muted">{site.bio}</p>

          {/* Tarjeta de Dedicatoria de Cumpleaños */}
          <div className="mt-8 relative overflow-hidden rounded-2xl border border-line/70 bg-surface/70 p-6 md:p-8 shadow-sm backdrop-blur-xs">
            {/* Cabecera de la nota */}
            <div className="flex items-center gap-2 mb-4">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/15 px-3 py-1 text-xs font-semibold text-accent">
                <span>🎂</span> Dedicatoria Especial
              </span>
            </div>

            {/* Texto de la dedicatoria limpio y moderno */}
            <blockquote className="font-sans text-lg md:text-xl font-medium leading-relaxed text-ink italic">
              “{site.dedication}”
            </blockquote>

            {/* Pie de la dedicatoria */}
            <div className="mt-5 flex items-center justify-between border-t border-line/40 pt-4">
              <span className="font-mono text-xs uppercase tracking-wider text-muted">
                Con cariño · Feliz Cumpleaños
              </span>
              <span className="text-sm">✨</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
