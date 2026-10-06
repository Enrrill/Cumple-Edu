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
        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
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

          {/* Dedicatoria con letra capital en accent */}
          <p
            className={[
              "mt-8 font-display text-xl leading-relaxed text-ink md:text-[25px]",
              // Letra capital: la primera letra en accent y más grande
              "first-letter:float-left first-letter:mr-2 first-letter:text-5xl",
              "first-letter:font-medium first-letter:leading-none first-letter:text-accent",
            ].join(" ")}
          >
            {site.dedication}
          </p>
        </div>
      </div>
    </section>
  );
}
