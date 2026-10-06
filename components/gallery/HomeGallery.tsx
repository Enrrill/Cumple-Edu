"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import type { Category, Photo } from "@/lib/albums";
import { CategorySection } from "./CategorySection";

/**
 * El lightbox se importa bajo demanda con `ssr: false`; Next 16 solo lo
 * admite dentro de un Client Component (mismo patrón que `CategoryGallery`).
 */
const Lightbox = dynamic(() => import("./Lightbox").then((mod) => mod.Lightbox), {
  ssr: false,
});

interface HomeGalleryProps {
  sections: { category: Category; photos: Photo[] }[];
}

/**
 * Bloque interactivo de la portada (T4): bandas de categoría + visor.
 * El hero vive fuera (`app/page.tsx`, Server Component sin JS).
 * Vive en el lado cliente porque `onOpen` cruza la frontera server→client y
 * el estado del lightbox no puede vivir en un Server Component; `app/page.tsx`
 * sigue siendo servidor y solo le pasa datos serializables por props.
 * Cada colección (fotos de una categoría) abre su propio lightbox: la
 * navegación con ← → nunca sale de la colección clicada.
 */
export function HomeGallery({ sections }: HomeGalleryProps) {
  // Estado del visor: la colección activa + su índice (null = cerrado).
  const [viewer, setViewer] = useState<{ photos: Photo[]; index: number } | null>(
    null,
  );

  function openWith(photos: Photo[]) {
    return (id: string) => {
      const index = photos.findIndex((photo) => photo.id === id);
      if (index >= 0) setViewer({ photos, index });
    };
  }

  return (
    <>
      {sections.map(({ category, photos }) => (
        <CategorySection
          key={category.id}
          category={category}
          photos={photos}
          onOpen={openWith(photos)}
        />
      ))}
      <Lightbox
        photos={viewer?.photos ?? []}
        index={viewer?.index ?? null}
        onClose={() => setViewer(null)}
        onNavigate={(index) =>
          setViewer((current) => (current ? { ...current, index } : current))
        }
      />
    </>
  );
}
