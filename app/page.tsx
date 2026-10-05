import { getCategories, getFeatured, getPhotosByCategory, getSite } from "@/lib/albums";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Bio } from "@/components/layout/Bio";
import { HomeGallery } from "@/components/gallery/HomeGallery";

/**
 * Portada (T4) — composición «Hoja de contactos» (DESIGN.md):
 * cabecera fija con anclas por categoría → hero a sangre → bandas con rejilla
 * → bio del fotógrafo → colofón. Server Component: solo pasa datos por props;
 * la interacción (hero, rejillas, lightbox) vive en `HomeGallery` (cliente).
 */
export default function Home() {
  const site = getSite();
  const categories = getCategories();
  const featured = getFeatured();
  const sections = categories.map((category) => ({
    category,
    photos: getPhotosByCategory(category.id),
  }));

  return (
    <>
      <SiteHeader
        name={site.name}
        sections={categories.map(({ id, title }) => ({ id, title }))}
      />
      <main className="flex-1">
        <HomeGallery featured={featured} sections={sections} />
        <Bio site={site} />
      </main>
      <SiteFooter credit={site.credit} />
    </>
  );
}
