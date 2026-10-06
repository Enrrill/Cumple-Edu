export interface SiteFooterProps {
  credit: string;
}

/**
 * Pie de página — v2: línea con gradiente esmeralda, puntos de acento como
 * separadores y tipografía alineada con el sistema de diseño.
 */
export function SiteFooter({ credit }: SiteFooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto">
      {/* Línea esmeralda sutil en la parte superior — marca de identidad */}
      <div
        aria-hidden="true"
        className="h-px w-full bg-linear-to-r from-transparent via-accent/20 to-transparent"
      />

      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-6 gap-y-2 px-6 py-7">
        <p className="font-mono text-xs uppercase tracking-wider text-muted flex items-center gap-2.5">
          {/* Punto esmeralda */}
          <span
            aria-hidden="true"
            className="h-1 w-1 rounded-full bg-accent/50 shrink-0"
          />
          {credit}
        </p>

        <p className="font-mono text-xs uppercase tracking-wider text-muted">
          &copy;&nbsp;{year}
        </p>
      </div>
    </footer>
  );
}
