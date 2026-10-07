import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getCategories, getCategory, getPhotosByCategory } from "@/lib/albums";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { PhotoLightbox } from "@/components/gallery/PhotoLightbox";
import { FloatingBackButton } from "@/components/layout/FloatingBackButton";

export function generateStaticParams() {
  return getCategories().map((category) => ({ slug: category.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = getCategory(slug);

  if (!category) {
    return { title: "Categoría no encontrada" };
  }

  return {
    // El sufijo «· Galería de fotos de cumpleaños» lo añade la plantilla del layout
    title: category.title,
    description: category.description,
  };
}

export default async function CategoryPage({ params }: PageProps<"/categoria/[slug]">) {
  const { slug } = await params;
  const category = getCategory(slug);

  if (!category) {
    notFound();
  }

  const photos = getPhotosByCategory(category.id);
  const count = photos.length;

  return (
    <main className="flex-1">
      {/* pt-20 mínimo: el encabezado fijo (h-16) no debe pisar el contenido */}
      <header className="mx-auto max-w-7xl px-4 sm:px-6 pt-20 pb-8 md:pt-24 md:pb-10">
        {/* Único ← de la página (junto al botón flotante): oculto a la vista
            para no duplicar retorno, pero visible al recibir foco de teclado
            y presente para buscadores y lectores de pantalla. */}
        <Link
          href="/"
          className="sr-only mb-6 inline-flex h-11 items-center gap-2 text-base text-accent transition-colors hover:text-accent-strong focus:not-sr-only"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Volver a la portada
        </Link>

        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
          <h1 className="font-display text-[32px] font-medium tracking-tight text-ink md:text-[48px]">
            {category.title}
          </h1>
          <p className="font-mono text-xs uppercase tracking-wider text-muted">
            {count === 1 ? "1 foto" : `${count} fotos`}
          </p>
        </div>

        <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted">
          {category.description}
        </p>
      </header>

      <div className="mx-auto max-w-7xl px-1 sm:px-3 md:px-6 pb-16 md:pb-24">
        <GalleryGrid photos={photos} />
        <PhotoLightbox />
      </div>

      {/* Retorno persistente: mismo sitio, tamaño y estilo que el FAB de la portada.
          Es el único retorno visible de la página. */}
      <FloatingBackButton slug={category.id} />
    </main>
  );
}
