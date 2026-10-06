import Image from "next/image";
import type { Photo } from "@/lib/albums";

export interface PhotoCardProps {
  photo: Photo;
  priority?: boolean;
  /** Índice en el grid — usado para calcular el animation-delay de entrada. */
  index?: number;
}

/**
 * Tarjeta de foto modernizada — Server Component (T5): sin JS propio;
 * el clic lo captura la delegación global de `PhotoLightbox` mediante los
 * atributos `data-photo-*`.
 *
 * Cambios v2 (DESIGN.md modernización):
 * - `rounded-xl` + overflow-hidden → bordes redondeados nativos
 * - Hover: escala 1.02 + sombra esmeralda sutil + overlay oscuro ligero
 * - `cursor-zoom-in` para comunicar la acción de ampliar
 * - Badge del fotograma con slide-up al hover
 * - `break-inside-avoid` + `inline-block` para funcionar con CSS Columns
 * - Fade-in de entrada con stagger por índice (CSS puro)
 */

function categoryPrefix(category: string): string {
  const id = category.toLowerCase();
  const consonant = id.slice(1).match(/[bcdfghjklmnpqrstvwxyz]/);
  return (id.charAt(0) + (consonant?.[0] ?? id.charAt(1))).toUpperCase();
}

function frameNumber(id: string): string {
  const number = id.split("-").pop() ?? "";
  return number.padStart(2, "0");
}

/** Delay escalonado para el fade-in de entrada (máx. 8 tarjetas con delay). */
function entryDelay(index: number): string {
  const clamped = Math.min(index, 7);
  return `${clamped * 60}ms`;
}

export function PhotoCard({ photo, priority, index = 0 }: PhotoCardProps) {
  const frame = `${categoryPrefix(photo.category)}-${frameNumber(photo.id)}`;
  const delay = entryDelay(index);

  return (
    /*
     * `break-inside-avoid` + `inline-block w-full` son las claves para que
     * CSS Columns no parta una tarjeta entre columnas.
     * `mb-3 md:mb-5` genera el gap vertical entre filas de la masonry.
     */
    <button
      type="button"
      data-photo-open={photo.id}
      data-photo-collection={photo.category}
      data-photo-title={photo.title}
      aria-label={`Ver foto ${photo.title} · ${frame}`}
      style={{ animationDelay: delay }}
      className={[
        // Masonry columns — gap vertical mínimo en móvil
        "break-inside-avoid inline-block w-full mb-1 md:mb-3 xl:mb-4",
        // Fade-in de entrada con stagger
        "motion-safe:opacity-0 motion-safe:animate-[photo-card-in_500ms_ease-out_forwards]",
        // Grupo de opacidad: hermanas se atenúan al hacer hover en una
        "group/card block text-left cursor-zoom-in rounded-2xl",
        // Foco visible que respeta exactamente el contorno redondeado
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
        "transition-opacity motion-safe:transition-opacity",
        "group-hover:opacity-60 group-hover:hover:opacity-100 group-hover:focus-visible:opacity-100",
      ].join(" ")}
    >
      {/* Tarjeta tipo Pinterest: 100% la foto con bordes redondeados modernos */}
      <div
        className={[
          "relative rounded-2xl overflow-hidden",
          "border border-line/60 bg-surface/50",
          // Transición multi-capa
          "transition-all duration-300 motion-safe:transition-all",
          // Hover: resplandor esmeralda suave + elevación limpia
          "hover:shadow-[0_12px_36px_-6px_rgb(5_150_105/0.25)] hover:border-accent/40",
          "hover:-translate-y-1",
        ].join(" ")}
      >
        {/* Badge "destacada" */}
        {photo.featured && (
          <span
            aria-label="Foto destacada"
            role="img"
            className={[
              "absolute right-3 top-3 z-20",
              "inline-flex items-center gap-1.5 rounded-full",
              "bg-black/40 backdrop-blur-md px-2.5 py-1",
              "border border-white/20 text-[10px] font-medium text-white shadow-xs",
            ].join(" ")}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-ping" />
            <span className="h-1.5 w-1.5 -ml-3 rounded-full bg-accent" />
            <span className="text-[9px] uppercase tracking-wider text-white/90">Destacada</span>
          </span>
        )}

        {/* Imagen ocupando el 100% del contenedor */}
        <Image
          src={photo.src}
          alt={photo.alt}
          width={photo.width}
          height={photo.height}
          sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 50vw"
          preload={priority}
          loading={priority ? undefined : "lazy"}
          fetchPriority={priority ? "high" : "low"}
          className={[
            "block h-auto w-full",
            // Zoom suave al hover
            "transition-transform duration-500 motion-safe:transition-transform",
            "group-hover/card:scale-[1.03]",
          ].join(" ")}
        />

        {/* Overlay con gradiente en hover: muestra el título y número sin quitar protagonismo a la foto */}
        <div
          aria-hidden="true"
          className={[
            "pointer-events-none absolute inset-x-0 bottom-0 z-10",
            "bg-linear-to-t from-black/85 via-black/40 to-transparent",
            "p-3.5 pt-10",
            // Visible en hover con desplazamiento sutil hacia arriba
            "opacity-0 translate-y-2",
            "group-hover/card:opacity-100 group-hover/card:translate-y-0",
            "transition-all duration-250 ease-out",
          ].join(" ")}
        >
          <p className="font-sans text-sm font-semibold text-white drop-shadow-xs line-clamp-1">
            {photo.title}
          </p>
          <span className="font-mono text-[10px] uppercase tracking-wider text-white/70">
            {frame}
          </span>
        </div>
      </div>
    </button>
  );
}
