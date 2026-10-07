import Image from "next/image";
import type { Dedication } from "@/lib/dedications";

export interface DedicationThreadProps {
  dedications: Dedication[];
}

/**
 * Hilo de dedicatorias — lista compartida entre la portada (`Dedications`)
 * y la página propia `/dedicatorias`, del mismo modo que `GalleryGrid` se
 * comparte entre la portada y `/categoria/[slug]`.
 *
 * - Columna única (`max-w-2xl`) tipo red social: avatar o inicial, autor,
 *   meta en versalitas mono y el mensaje en bloque `<blockquote>`
 * - Conector vertical entre mensajes para reforzar la lectura de hilo
 * - Entrada por tarjeta con `animation-timeline: view()` (CSS puro,
 *   degradación a fundido y con `prefers-reduced-motion` respetado)
 * - Server Component puro: sin JS de cliente
 */
const THREAD_CSS = `
@keyframes dedication-in {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

@media (prefers-reduced-motion: no-preference) {
  .dedication-item {
    animation: dedication-in 500ms ease-out both;
  }
}

@supports (animation-timeline: view()) {
  @media (prefers-reduced-motion: no-preference) {
    .dedication-item {
      animation-timeline: view();
      animation-range: entry 0% cover 30%;
    }
  }
}
`;

/** Fecha `AAAA-MM-DD` en texto corto en español (02 oct 2026). */
function formatDate(date: string): string {
  const parsed = new Date(`${date}T00:00:00`);
  if (Number.isNaN(parsed.getTime())) return date;
  return parsed.toLocaleDateString("es-ES", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function DedicationThread({ dedications }: DedicationThreadProps) {
  if (dedications.length === 0) return null;

  return (
    <>
      <style href="dedication-thread" precedence="low">
        {THREAD_CSS}
      </style>

      <ol className="mx-auto max-w-2xl list-none">
        {dedications.map((dedication, index) => {
          const meta = [dedication.relation, dedication.date && formatDate(dedication.date)]
            .filter(Boolean)
            .join(" · ");

          return (
            <li key={dedication.id}>
              {/* Conector vertical: da continuidad al hilo */}
              {index > 0 && (
                <div
                  aria-hidden="true"
                  className="mx-auto mb-3 h-4 w-px bg-linear-to-b from-line/60 to-line/20"
                />
              )}

              <article className="dedication-item rounded-2xl border border-line/70 bg-surface/70 p-5 shadow-sm backdrop-blur-xs transition-colors duration-300 hover:border-accent/40 md:p-6">
                {/* Avatar si existe; si no, inicial en círculo esmeralda */}
                <header className="flex items-start gap-3">
                  {dedication.avatar ? (
                    <Image
                      src={dedication.avatar.src}
                      alt={dedication.avatar.alt}
                      width={40}
                      height={40}
                      className="h-10 w-10 shrink-0 rounded-full object-cover"
                    />
                  ) : (
                    <span
                      aria-hidden="true"
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/15 font-display text-sm font-semibold text-accent"
                    >
                      {dedication.author.trim().charAt(0).toUpperCase()}
                    </span>
                  )}

                  <div className="min-w-0 flex-1">
                    <p className="font-display text-[15px] font-semibold tracking-tight text-ink">
                      {dedication.author}
                    </p>
                    {meta && (
                      <p className="mt-0.5 font-mono text-[11px] uppercase tracking-wider text-muted">
                        {meta}
                      </p>
                    )}
                  </div>

                  {/* Numeración editorial del mensaje dentro del hilo */}
                  <span
                    aria-hidden="true"
                    className="font-mono text-[10px] tracking-widest text-muted/50"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </header>

                <blockquote className="mt-4 text-[15px] leading-7 text-ink md:text-base">
                  <p>{dedication.text}</p>
                </blockquote>
              </article>
            </li>
          );
        })}
      </ol>
    </>
  );
}
