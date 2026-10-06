import {
  getCategories,
  getHeroPhoto,
  getPhotosByCategory,
  getSite,
} from "@/lib/albums";
import { Bio } from "@/components/layout/Bio";
import { Hero } from "@/components/gallery/Hero";
import { HomeGallery } from "@/components/gallery/HomeGallery";

/**
 * Portada (T4) — composición «Hoja de contactos» (DESIGN.md):
 * hero a sangre → bandas con rejilla → bio del fotógrafo → colofón.
 * El encabezado y el pie fijos viven en `app/layout.tsx` para que todas las
 * rutas (categoría y 404 incluidas) compartan la navegación.
 * Server Component: solo pasa datos por props; el hero es HTML estático y
 * la interacción (rejillas, lightbox) vive en `HomeGallery` (cliente).
 */
export default function Home() {
  const site = getSite();
  const hero = getHeroPhoto();
  const categories = getCategories();
  const sections = categories.map((category) => ({
    category,
    photos: getPhotosByCategory(category.id),
  }));

  return (
    <main className="flex-1">
      {/* h1 único de la portada: el nombre visible vive en el encabezado fijo */}
      <h1 className="sr-only">{`${site.name} · Galería de fotos de cumpleaños`}</h1>
      <Hero photo={hero} />
      <HomeGallery sections={sections} />
      <Bio site={site} />
    </main>
  );
}
