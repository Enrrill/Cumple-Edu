import type { Photo } from "@/lib/albums";
import { PhotoCard } from "./PhotoCard";

export interface GalleryGridProps {
  photos: Photo[];
  columns?: 1 | 2 | 3 | 4;
}

/**
 * Rejilla tipo masonry usando CSS Columns — Server Component seguro, sin JS.
 * Las fotos fluyen por columnas respetando su aspect ratio nativo (alto y
 * apaisados se alternan orgánicamente como en Pinterest).
 *
 * Sin `columns`: responsive 2→3→4 desde móvil.
 * Con `columns`: fijado por el padre (p. ej. página de categoría).
 *
 * DESIGN.md v2: CSS Columns reemplaza al grid de filas homogéneas para lograr
 * composición dinámica donde cada foto ocupa exactamente su altura natural.
 */

/** Clases para `columns-N` fijas cuando el padre lo pide explícitamente. */
const COLUMN_CLASS: Record<NonNullable<GalleryGridProps["columns"]>, string> = {
  1: "columns-1",
  2: "columns-2",
  3: "columns-3",
  4: "columns-4",
};

export function GalleryGrid({ photos, columns }: GalleryGridProps) {
  /*
   * Sin `columns` prop: 2 columnas en móvil, 3 en tablet, 4 en desktop.
   * `group` sigue siendo necesario: PhotoCard atenúa a sus hermanas con
   * `group-hover` para enfocarse en la tarjeta activa.
   */
  const layout = columns
    ? COLUMN_CLASS[columns]
    : "columns-2 sm:columns-2 lg:columns-3 xl:columns-4";

  return (
    <div className={`group ${layout} gap-x-3 md:gap-x-5`}>
      {photos.map((photo, i) => (
        <PhotoCard key={photo.id} photo={photo} index={i} />
      ))}
    </div>
  );
}
