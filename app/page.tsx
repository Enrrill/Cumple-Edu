import {
  getCategories,
  getHeroPhoto,
  getPhotosByCategory,
  getSite,
} from "@/lib/albums";
import { Bio } from "@/components/layout/Bio";
import { Hero } from "@/components/gallery/Hero";
import { CategorySection } from "@/components/gallery/CategorySection";
import { PhotoLightbox } from "@/components/gallery/PhotoLightbox";

/**
 * Portada — composición «Hoja de contactos» (DESIGN.md v2):
 * hero a sangre → bandas con rejilla masonry → bio del fotógrafo → colofón.
 *
 * v2: pasa `sectionIndex` a cada CategorySection para los separadores
 * numerados entre categorías.
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
      {/* h1 único de la portada: el nombre visible vive en el hero y en el header */}
      <h1 className="sr-only">{`${site.name} · Galería de fotos de cumpleaños`}</h1>
      <Hero photo={hero} />
      {sections.map(({ category, photos }, index) => (
        <CategorySection
          key={category.id}
          category={category}
          photos={photos}
          sectionIndex={index}
        />
      ))}
      <PhotoLightbox />
      <Bio site={site} />
    </main>
  );
}
