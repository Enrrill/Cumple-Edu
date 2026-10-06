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
        // Masonry columns
        "break-inside-avoid inline-block w-full mb-3 md:mb-5",
        // Fade-in de entrada con stagger
        "motion-safe:opacity-0 motion-safe:animate-[photo-card-in_500ms_ease-out_forwards]",
        // Grupo de opacidad: hermanas se atenúan al hacer hover en una
        "group/card block text-left cursor-zoom-in",
        "transition-opacity motion-safe:transition-opacity",
        "group-hover:opacity-50 group-hover:hover:opacity-100 group-hover:focus-visible:opacity-100",
      ].join(" ")}
    >
      {/* Tarjeta con bordes redondeados y hover premium */}
      <div
        className={[
          "rounded-xl overflow-hidden",
          "border border-line/40 bg-surface",
          // Transición multi-capa
          "transition-all duration-300 motion-safe:transition-all",
          // Hover: sombra esmeralda sutil + borde accent ligero
          "hover:shadow-[0_8px_32px_-6px_rgb(52_211_153/0.20)] hover:border-accent/25",
          "hover:-translate-y-0.5",
        ].join(" ")}
      >
        {/* Contenedor de imagen */}
        <div className="relative overflow-hidden">
          {/* Badge "destacada" */}
          {photo.featured && (
            <span
              aria-label="Foto destacada"
              role="img"
              className={[
                "absolute right-2.5 top-2.5 z-10",
                "h-2.5 w-2.5 rounded-full bg-accent",
                // Pulso sutil al hover de la tarjeta
                "transition-transform duration-300 group-hover/card:scale-125",
                "shadow-[0_0_8px_rgb(52_211_153/0.6)]",
              ].join(" ")}
            />
          )}

          {/* Overlay oscuro al hover — muy sutil para no competir con la foto */}
          <div
            aria-hidden="true"
            className={[
              "absolute inset-0 z-10",
              "bg-canvas/0 group-hover/card:bg-canvas/15",
              "transition-colors duration-300",
            ].join(" ")}
          />

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
              "group-hover/card:scale-[1.02]",
            ].join(" ")}
          />
        </div>

        {/* Footer de la tarjeta: número de fotograma con slide-up al hover */}
        <div
          className={[
            "flex items-center justify-between px-3 py-2",
            // Slide-up + fade al hover
            "translate-y-1 opacity-0",
            "group-hover/card:translate-y-0 group-hover/card:opacity-100",
            "transition-all duration-200",
          ].join(" ")}
        >
          <span className="font-mono text-[11px] uppercase tracking-wider tabular-nums text-muted">
            {frame}
          </span>
        </div>
      </div>
    </button>
  );
}
