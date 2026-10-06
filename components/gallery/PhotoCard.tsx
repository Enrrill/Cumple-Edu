import Image from "next/image";
import type { Photo } from "@/lib/albums";

export interface PhotoCardProps {
  photo: Photo;
  priority?: boolean;
}

/**
 * Tarjeta de foto — Server Component (T5): sin JS propio; el clic lo
 * captura la delegación global de `PhotoLightbox` mediante los atributos
 * `data-photo-*` (hidratar 133 tarjetas encarecía el TBT de la portada).
 * Prefijo de categoría en dos letras (DESIGN.md pide `RT-04` pero no existe
 * mapa de prefijos): primera letra + primera consonante del id
 * (`retrato` → RT, `paisaje` → PS, `bn` → BN, `urbano` → UR).
 * Decisión reversible, comentada en el PR.
 */
function categoryPrefix(category: string): string {
  const id = category.toLowerCase();
  const consonant = id.slice(1).match(/[bcdfghjklmnpqrstvwxyz]/);
  return (id.charAt(0) + (consonant?.[0] ?? id.charAt(1))).toUpperCase();
}

/** Número de fotograma derivado de `photo.id` (`retrato-01` → `01`). */
function frameNumber(id: string): string {
  const number = id.split("-").pop() ?? "";
  return number.padStart(2, "0");
}

export function PhotoCard({ photo, priority }: PhotoCardProps) {
  const frame = `${categoryPrefix(photo.category)}-${frameNumber(photo.id)}`;

  return (
    <button
      type="button"
      data-photo-open={photo.id}
      data-photo-collection={photo.category}
      data-photo-title={photo.title}
      aria-label={`Ver foto ${photo.title} · ${frame}`}
      className="group/card block w-full cursor-pointer text-left transition-opacity motion-safe:transition-opacity group-hover:opacity-60 group-hover:hover:opacity-100 group-hover:focus-visible:opacity-100 hover:opacity-100 focus-visible:opacity-100"
    >
      <div className="border border-line bg-surface transition-shadow motion-safe:transition hover:shadow-md">
        <div className="relative overflow-hidden">
          {photo.featured && (
            <span
              aria-label="Foto destacada"
              role="img"
              className="absolute right-2 top-2 z-10 h-3 w-3 rounded-full bg-accent"
            />
          )}
          <Image
            src={photo.src}
            alt={photo.alt}
            width={photo.width}
            height={photo.height}
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            preload={priority}
            loading={priority ? undefined : "lazy"}
            // Prioridad baja: las tarjetas (perezosas) no deben adelantarse
            // al CSS, las fuentes ni a la imagen del hero en la cola de red.
            fetchPriority={priority ? "high" : "low"}
            className="block h-auto w-full transition-transform motion-safe:transition-transform motion-safe:duration-300 group-hover/card:scale-[1.02]"
          />
        </div>
        <div className="flex items-center justify-between px-2 py-1.5">
          <span className="font-mono text-xs uppercase tracking-wider text-muted">
            {frame}
          </span>
        </div>
      </div>
    </button>
  );
}
