import type { Photo } from "@/lib/albums";
import { PhotoCard } from "./PhotoCard";

export interface GalleryGridProps {
  photos: Photo[];
  onOpen: (id: string) => void;
  columns?: 1 | 2 | 3 | 4;
}

/**
 * Columnas fijas cuando el contrato las pide; sin `columns` la rejilla
 * es responsive según DESIGN.md: <640 1 columna, 640-1024 2, >1024 3-4.
 * Los literales viven aquí (no se construyen con concatenación) para que
 * Tailwind los detecte al escanear el código.
 */
const COLUMN_CLASS: Record<NonNullable<GalleryGridProps["columns"]>, string> = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4",
};

export function GalleryGrid({ photos, onOpen, columns }: GalleryGridProps) {
  const layout = columns
    ? COLUMN_CLASS[columns]
    : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";

  return (
    // `group` es obligatorio: PhotoCard atenúa a sus hermanas con group-hover.
    <div className={`group grid gap-4 md:gap-6 ${layout}`}>
      {photos.map((photo) => (
        <PhotoCard key={photo.id} photo={photo} onOpen={onOpen} />
      ))}
    </div>
  );
}
