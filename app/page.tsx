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
import { NavSidebar } from "@/components/layout/NavSidebar";

/**
 * Portada — composición «Hoja de contactos» (DESIGN.md v3):
 * hero a sangre → bandas con rejilla masonry → bio del fotógrafo → colofón.
 *
 * v3: añade NavSidebar con conteo de fotos por sección.
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
      {/* El h1 único de la portada vive en Hero: el nombre del sitio entra como
          prefijo `sr-only` para que el encabezado accesible y el SEO sigan
          hablando de la galería sin duplicar encabezados. */}
      <Hero photo={hero} name={site.name} />
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

      {/* Sidebar flotante de navegación con scroll-spy */}
      <NavSidebar
        sections={sections.map(({ category, photos }) => ({
          id: category.id,
          title: category.title,
          count: photos.length,
        }))}
      />
    </main>
  );
}
