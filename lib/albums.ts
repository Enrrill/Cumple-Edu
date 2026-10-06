import album from "@/content/albums.json";

/**
 * Modelo de datos de la galería — autoridad de contratos (plan de equipo, T3).
 * Los componentes NO importan albums.json directamente: reciben estos tipos por props.
 */

export interface Category {
  id: string;
  title: string;
  description: string;
}

export interface Photo {
  id: string;
  src: string;
  title: string;
  category: string;
  featured: boolean;
  alt: string;
  width: number;
  height: number;
}

export interface SiteInfo {
  name: string;
  /** Id de la foto fija del hero (una de `photos`). */
  heroPhotoId: string;
  bio: string;
  dedication: string;
  credit: string;
  portrait: { src: string; alt: string };
}

export interface Album {
  syntheticImages?: boolean;
  site: SiteInfo;
  categories: Category[];
  photos: Photo[];
}

/** Información del sitio: nombre, bio, dedicatoria, crédito y retrato. */
export function getSite(): SiteInfo {
  return album.site;
}

/** Todas las categorías, en orden de aparición. */
export function getCategories(): Category[] {
  return album.categories;
}

/** Foto fija del hero: `site.heroPhotoId`, con reserva en la primera foto. */
export function getHeroPhoto(): Photo {
  return (
    album.photos.find((photo) => photo.id === album.site.heroPhotoId) ??
    album.photos[0]
  );
}

/** Categoría por id, o undefined si no existe. */
export function getCategory(id: string): Category | undefined {
  return album.categories.find((category) => category.id === id);
}

/** Fotos de una categoría, en orden. */
export function getPhotosByCategory(id: string): Photo[] {
  return album.photos.filter((photo) => photo.category === id);
}

/** true mientras el contenido sea sintético (muestra de desarrollo). */
export function isSyntheticContent(): boolean {
  return album.syntheticImages === true;
}
