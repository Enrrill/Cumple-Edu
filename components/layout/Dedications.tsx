import Link from "next/link";
import type { Dedication } from "@/lib/dedications";
import { DedicationThread } from "./DedicationThread";

export interface DedicationsProps {
  dedications: Dedication[];
  /** Índice 0-based de la sección en la página (para el separador numérico). */
  sectionIndex?: number;
}

/**
 * Sección de dedicatorias en la portada — v2:
 * - Cabecera con el mismo ritmo editorial que las categorías (separador
 *   numerado en mono + título con `→` de entrada + contador)
 * - El título enlaza a `/dedicatorias`, la página propia del hilo: la
 *   portada muestra el hilo completo, igual que las colecciones muestran
 *   su rejilla entera antes de entrar en ellas
 * - El hilo vive en `DedicationThread` (compartido con la página nueva)
 * - Sin JS de cliente: es un Server Component puro
 * - Si no hay dedicatorias no se pinta (la sección desaparece de la página
 *   y del `NavSidebar`)
 */
export function Dedications({ dedications, sectionIndex = 0 }: DedicationsProps) {
  if (dedications.length === 0) return null;

  const count = dedications.length;

  return (
    <section
      id="dedicatorias"
      aria-labelledby="dedicatorias-title"
      className="scroll-mt-20 pb-10 md:pb-16"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Separador con número de sección — mismo ritmo que entre categorías */}
        {sectionIndex > 0 && (
          <div
            aria-hidden="true"
            className="flex items-center gap-4 pt-10 pb-10 md:pt-16 md:pb-16"
          >
            <div className="flex-1 h-px bg-linear-to-r from-transparent via-line/50 to-transparent" />
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted/40">
              {String(sectionIndex + 1).padStart(2, "0")}
            </span>
            <div className="flex-1 h-px bg-linear-to-r from-transparent via-line/50 to-transparent" />
          </div>
        )}

        {/* Cabecera de la sección con animación de placa */}
        <header
          className={`category-plate mb-8 md:mb-12 ${sectionIndex === 0 ? "pt-10 md:pt-16" : ""}`}
        >
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
            <h2
              id="dedicatorias-title"
              className="font-display text-[28px] font-medium tracking-[-0.02em] text-ink md:text-[44px]"
            >
              <Link
                href="/dedicatorias"
                className="group inline-flex min-h-11 items-center transition-colors hover:text-accent"
              >
                Dedicatorias
                {/* Flecha de entrada a la página: decorativa a la vista,
                    con texto equivalente para lectores de pantalla */}
                <span
                  aria-hidden="true"
                  className="ml-2.5 inline-block text-[0.45em] leading-none text-accent/70 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-accent md:ml-3"
                >
                  →
                </span>
                <span className="sr-only">Ver todas las dedicatorias</span>
              </Link>
            </h2>
            <p className="font-mono text-xs uppercase tracking-wider text-muted">
              {count === 1 ? "1 dedicatoria" : `${count} dedicatorias`}
            </p>
          </div>
          <p className="mt-3 max-w-2xl text-base leading-7 text-muted">
            Los mensajes que han dejado quienes le quieren, reunidos para su
            cumpleaños.
          </p>
        </header>

        <DedicationThread dedications={dedications} />
      </div>
    </section>
  );
}
