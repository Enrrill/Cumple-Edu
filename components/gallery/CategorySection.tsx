import Link from "next/link";
import type { Category, Photo } from "@/lib/albums";
import { GalleryGrid } from "./GalleryGrid";

export interface CategorySectionProps {
  category: Category;
  photos: Photo[];
  /** Índice 0-based de la sección en la página (para el separador numérico). */
  sectionIndex?: number;
}

/**
 * Sección de categoría — v3:
 * - Separador con gradiente + número de sección en mono (ritmo editorial)
 * - Encabezado con padding de texto para legibilidad óptima
 * - Rejilla de fotos con margen lateral mínimo en móvil (px-1) para inmersión total
 * - `scroll-mt-20` para compensar el header fijo al navegar con anclas
 */
const SECTION_CSS = `
@keyframes category-plate-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

@media (prefers-reduced-motion: no-preference) {
  .category-plate {
    animation: category-plate-in 600ms ease-out both;
  }
}

@supports (animation-timeline: view()) {
  @media (prefers-reduced-motion: no-preference) {
    .category-plate {
      animation-timeline: view();
      animation-range: entry 0% cover 25%;
    }
  }
}
`;

export function CategorySection({
  category,
  photos,
  sectionIndex = 0,
}: CategorySectionProps) {
  const count = photos.length;

  return (
    <section
      id={category.id}
      aria-labelledby={`${category.id}-title`}
      className="scroll-mt-20 pb-10 md:pb-16"
    >
      <style href="category-section-plate" precedence="low">
        {SECTION_CSS}
      </style>

      {/* Encabezado y separador con padding para legibilidad de textos */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Separador con número de sección — solo entre categorías */}
        {sectionIndex > 0 && (
          <div
            aria-hidden="true"
            className="flex items-center gap-4 pt-10 pb-10 md:pt-16 md:pb-16"
          >
            <div className="flex-1 h-px bg-linear-to-r from-transparent via-line/50 to-transparent" />
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted/40">
              {String(sectionIndex + 1).padStart(2, "0")}
            </span>
            <div className="flex-1 h-px bg-linear-to-r from-transparent via-line/50 to-transparent" />
          </div>
        )}

        {/* Placa de entrada de la categoría con animación */}
        <header
          className={`category-plate mb-6 md:mb-10 ${sectionIndex === 0 ? "pt-10 md:pt-16" : ""}`}
        >
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
            <h2
              id={`${category.id}-title`}
              className="font-display text-[28px] font-medium tracking-[-0.02em] text-ink md:text-[44px]"
            >
              <Link
                href={`/categoria/${category.id}`}
                className="inline-flex min-h-11 items-center transition-colors hover:text-accent"
              >
                {category.title}
              </Link>
            </h2>
            <p className="font-mono text-xs uppercase tracking-wider text-muted">
              {count === 1 ? "1 foto" : `${count} fotos`}
            </p>
          </div>
          <p className="mt-3 max-w-2xl text-base leading-7 text-muted">
            {category.description}
          </p>
        </header>
      </div>

      {/* Grid de fotos: full-bleed / margen mínimo (px-1) en móvil para máxima inmersión */}
      <div className="mx-auto max-w-7xl px-1 sm:px-3 md:px-6">
        <GalleryGrid photos={photos} />
      </div>
    </section>
  );
}
