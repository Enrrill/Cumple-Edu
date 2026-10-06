import type { Photo } from "@/lib/albums";
import { PhotoCard } from "./PhotoCard";

export interface GalleryGridProps {
  photos: Photo[];
  columns?: 1 | 2 | 3 | 4;
}

/**
 * Rejilla tipo masonry usando CSS Columns — Server Component seguro, sin JS.
 *
 * v3 — Mejoras de inmersión:
 * - Gap mínimo en móvil (0.5rem → gap casi invisible) para sensación full-bleed
 * - Gap mayor en desktop (1.5rem) para respirar entre fotos
 * - Columnas: 2 en móvil/tablet, 3 en lg, 4 en xl+
 * - `group` necesario para el efecto de atenuación de hermanas en PhotoCard
 */

/** Clases para `columns-N` fijas cuando el padre lo pide explícitamente. */
const COLUMN_CLASS: Record<NonNullable<GalleryGridProps["columns"]>, string> = {
  1: "columns-1",
  2: "columns-2",
  3: "columns-3",
  4: "columns-4",
};

export function GalleryGrid({ photos, columns }: GalleryGridProps) {
  const layout = columns
    ? COLUMN_CLASS[columns]
    : "columns-2 lg:columns-3 xl:columns-4";

  return (
    <div className={`group ${layout} gap-x-1 md:gap-x-3 xl:gap-x-4`}>
      {photos.map((photo, i) => (
        <PhotoCard key={photo.id} photo={photo} index={i} />
      ))}
    </div>
  );
}
