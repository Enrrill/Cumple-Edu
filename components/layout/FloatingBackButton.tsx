import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export interface FloatingBackButtonProps {
  /** Slug de la categoría: el retorno se ancla a su sección en la portada. */
  slug?: string;
}

/**
 * FloatingBackButton — botón flotante de retorno en páginas de colección.
 *
 * Coherencia con el FAB de `NavSidebar`: misma coordenada (`fixed bottom-6
 * right-5`), mismo tamaño (48 px) y misma paleta, para que el «←» viva
 * siempre en el mismo sitio y no desaparezca al hacer scroll.
 *
 * - Server Component: sin `"use client"`, sin JS propio ni estado; solo un
 *   `next/link` (el ocultado con el lightbox es CSS puro).
 * - Si se pasa `slug`, vuelve a la portada anclada a la sección de esa
 *   categoría (`/#<slug>`); sin `slug`, a la raíz.
 * - El enlace textual «Volver a la portada» del encabezado se mantiene por
 *   SEO y semántica; este botón es el acceso persistente durante el scroll.
 */
export function FloatingBackButton({ slug }: FloatingBackButtonProps) {
  return (
    <Link
      href={slug ? `/#${slug}` : "/"}
      aria-label="Volver a la portada"
      title="Volver a la portada"
      className={[
        // Misma coordenada que el FAB de NavSidebar
        "fixed bottom-6 right-5 z-50",
        "flex h-12 w-12 items-center justify-center",
        "rounded-full shadow-2xl shadow-black/20",
        // Colores reactivos al tema activo
        "bg-accent text-white",
        "border border-white/20",
        "transition-all duration-200",
        "hover:scale-105 hover:shadow-accent/30 hover:shadow-xl",
        "active:scale-95",
        // Oculto mientras el lightbox cubre la pantalla
        "body-lightbox-open:invisible",
      ].join(" ")}
    >
      <ArrowLeft size={20} strokeWidth={2.2} aria-hidden="true" />
    </Link>
  );
}
