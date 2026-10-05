import Link from "next/link";
import type { Category, Photo } from "@/lib/albums";
import { GalleryGrid } from "./GalleryGrid";

export interface CategorySectionProps {
  category: Category;
  photos: Photo[];
  onOpen: (id: string) => void;
}

/**
 * Entrada de la placa (fundido + 16-24 px de DESIGN.md) en CSS puro para
 * respetar la frontera Server Component del plan: framer-motion convertiría
 * esta sección en cliente. Animación por scroll (progressive enhancement)
 * con parada total si el sistema pide prefers-reduced-motion.
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

export function CategorySection({ category, photos, onOpen }: CategorySectionProps) {
  const count = photos.length;

  return (
    <section id={category.id} aria-labelledby={`${category.id}-title`} className="pt-14 pb-10 md:pt-24 md:pb-16">
      <style href="category-section-plate" precedence="low">
        {SECTION_CSS}
      </style>

      <div className="mx-auto max-w-7xl px-6">
        <header className="category-plate mb-8 md:mb-12">
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
            <h2
              id={`${category.id}-title`}
              className="font-display text-[32px] font-medium tracking-tight text-ink md:text-[48px]"
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
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted">
            {category.description}
          </p>
        </header>

        <GalleryGrid photos={photos} onOpen={onOpen} />
      </div>
    </section>
  );
}
