import { notFound } from "next/navigation";
import { getDedications } from "@/lib/dedications";
import { DedicationThread } from "@/components/layout/DedicationThread";
import { FloatingBackButton } from "@/components/layout/FloatingBackButton";

export async function generateMetadata() {
  const count = getDedications().length;

  if (count === 0) {
    return { title: "Dedicatorias no encontradas" };
  }

  return {
    // El sufijo «· Galería de fotos de cumpleaños» lo añade la plantilla del layout
    title: "Dedicatorias",
    description:
      "Los mensajes que han dejado quienes le quieren, reunidos para su cumpleaños: familia, amigos y compañeros en un mismo hilo.",
  };
}

/**
 * Página propia del hilo de dedicatorias — v1.
 *
 * Reproduce la estructura de `/categoria/[slug]` (cabecera con `h1`, contador
 * en mono y descripción + el contenido a ancho de columna) para que las
 * dedicatorias sigan el mismo flujo que el resto de secciones de la galería.
 * El hilo es el mismo componente que en la portada (`DedicationThread`),
 * igual que `GalleryGrid` se comparte entre portada y página de categoría.
 *
 * El retorno es el botón flotante persistente, ya sin enlace textual: la
 * cabecera es solo título y contenido. Si no hay dedicatorias, 404.
 */
export default function DedicationsPage() {
  const dedications = getDedications();

  if (dedications.length === 0) {
    notFound();
  }

  const count = dedications.length;

  return (
    <main className="flex-1">
      {/* pt-20 mínimo: el encabezado fijo (h-16) no debe pisar el título */}
      <header className="mx-auto max-w-7xl px-4 sm:px-6 pt-20 pb-8 md:pt-24 md:pb-10">
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
          <h1 className="font-display text-[32px] font-medium tracking-tight text-ink md:text-[48px]">
            Dedicatorias
          </h1>
          <p className="font-mono text-xs uppercase tracking-wider text-muted">
            {count === 1 ? "1 dedicatoria" : `${count} dedicatorias`}
          </p>
        </div>

        <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted">
          Los mensajes que han dejado quienes le quieren, reunidos para su
          cumpleaños.
        </p>
      </header>

      <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 md:pb-24">
        <DedicationThread dedications={dedications} />
      </div>

      {/* Retorno persistente: mismo sitio, tamaño y estilo que el FAB de la portada */}
      <FloatingBackButton />
    </main>
  );
}
