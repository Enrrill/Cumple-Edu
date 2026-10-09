import Image from "next/image";
import type { SiteInfo } from "@/lib/albums";

export interface BioProps {
  site: SiteInfo;
}

/**
 * Sección bio del fotógrafo — v3:
 * - Retrato con `rounded-2xl` y marco de esquina esmeralda (acento de marca)
 * - Las dos líneas decorativas de la esquina superior derecha replican la
 *   "marca de selección" del sistema de diseño (DESIGN.md)
 * - La dedicatoria como **bloque editorial sin caja**: filete superior,
 *   etiqueta mono versalitas en `accent-strong`, cita a tamaño display en
 *   Syne con comilla de apertura en esmeralda y firma alineada a la derecha.
 *   Sin emojis: la identidad va por tipografía y filetes, como el resto.
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

          {/* Dedicatoria — bloque editorial sin caja */}
          <div className="mt-10 border-t border-line pt-6">
            {/* Etiqueta mono versalitas + filete que se desvanece */}
            <div className="flex items-center gap-3">
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.25em] text-accent-strong">
                Dedicatoria especial
              </p>
              <span
                aria-hidden="true"
                className="h-px flex-1 bg-linear-to-r from-line to-transparent"
              />
            </div>

            {/* Cita a tamaño display, con la comilla de apertura en esmeralda */}
            <blockquote className="mt-5">
              <p className="font-display text-[21px] font-medium leading-snug tracking-tight text-ink md:text-[26px]">
                <span aria-hidden="true" className="text-accent">
                  “
                </span>
                {site.dedication}
                <span aria-hidden="true">”</span>
              </p>
            </blockquote>

            {/* Firma alineada a la derecha, con filete corto de entrada */}
            <div className="mt-6 flex items-center justify-end gap-3">
              <span
                aria-hidden="true"
                className="h-px w-12 bg-linear-to-l from-line to-transparent"
              />
              <span className="font-mono text-xs uppercase tracking-wider text-muted">
                Con cariño
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
