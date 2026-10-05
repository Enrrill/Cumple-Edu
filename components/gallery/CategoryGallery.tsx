"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import type { Photo } from "@/lib/albums";
import { GalleryGrid } from "./GalleryGrid";

/**
 * El lightbox se importa bajo demanda con `ssr: false`; Next solo lo admite
 * dentro de un Client Component, de ahí este envoltorio (misma técnica que
 * la importación dinámica prevista para page.tsx en T4).
 */
const Lightbox = dynamic(() => import("./Lightbox").then((mod) => mod.Lightbox), {
  ssr: false,
});

/**
 * Rejilla + visor para la página de categoría. El estado del lightbox vive
 * aquí (igual que vive en page.tsx en la portada): la página de categoría
 * sigue siendo Server Component y solo monta este bloque cliente.
 * Sin interfaz nueva: el tipo viene de lib/albums.ts, como pide el plan.
 */
export function CategoryGallery({ photos }: { photos: Photo[] }) {
  const [index, setIndex] = useState<number | null>(null);

  function handleOpen(id: string) {
    const found = photos.findIndex((photo) => photo.id === id);
    setIndex(found >= 0 ? found : null);
  }

  return (
    <>
      <GalleryGrid photos={photos} onOpen={handleOpen} />
      <Lightbox
        photos={photos}
        index={index}
        onClose={() => setIndex(null)}
        onNavigate={setIndex}
      />
    </>
  );
}
