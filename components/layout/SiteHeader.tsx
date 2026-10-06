export interface SiteHeaderProps {
  name: string;
  sections: { id: string; title: string }[];
}

/**
 * Cabecera fija — v2:
 * - Glassmorphism: backdrop-blur al hacer scroll (progressive enhancement)
 * - Línea esmeralda decorativa en la parte inferior
 * - Opción B de menú móvil: `<details>` con animación CSS pura
 *   · Las tres barras rotan a ✕ sin JavaScript
 *   · El panel se desliza con `menu-drop` y tiene `rounded-xl` + blur
 *   · Cada item lleva su número en mono para identidad editorial
 */
const HEADER_CSS = `
html {
  scroll-padding-top: 4rem;
}

.site-header {
  background-color: transparent;
  border-bottom: 1px solid transparent;
  transition: border-color 0.4s;
}

/* Glassmorphism: blur permanente si el navegador lo soporta */
@supports (backdrop-filter: blur(1px)) {
  .site-header {
    backdrop-filter: blur(16px) saturate(160%);
    -webkit-backdrop-filter: blur(16px) saturate(160%);
  }
}

/* Al hacer scroll: fondo semitransparente + borde inferior sutil */
@keyframes site-header-solidify {
  from {
    background-color: transparent;
    border-bottom-color: transparent;
  }
  to {
    background-color: color-mix(in srgb, var(--color-canvas) 80%, transparent);
    border-bottom-color: color-mix(in srgb, var(--color-line) 45%, transparent);
  }
}

@supports (animation-timeline: scroll()) {
  .site-header {
    animation: site-header-solidify linear both;
    animation-timeline: scroll(root block);
    animation-range: 0 120px;
  }
}

@supports not (animation-timeline: scroll()) {
  .site-header {
    background-color: color-mix(in srgb, var(--color-canvas) 80%, transparent);
    border-bottom-color: color-mix(in srgb, var(--color-line) 45%, transparent);
  }
}

/* Línea esmeralda fantasma debajo del header */
.site-header::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 12%;
  right: 12%;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent,
    rgb(52 211 153 / 0.22),
    transparent
  );
  pointer-events: none;
}

/* ── Hamburger bars ──────────────────────────────────────────────────── */

.menu-bar {
  display: block;
  height: 2px;
  width: 20px;
  background: currentColor;
  border-radius: 2px;
  transition: transform 300ms cubic-bezier(0.4, 0, 0.2, 1),
              opacity  250ms cubic-bezier(0.4, 0, 0.2, 1);
}

/* details[open] → las barras forman una X */
details[open] .menu-bar-top {
  transform: translateY(7px) rotate(45deg);
}

details[open] .menu-bar-mid {
  opacity: 0;
  transform: translateX(-6px);
}

details[open] .menu-bar-bot {
  transform: translateY(-7px) rotate(-45deg);
}

/* ── Menú panel — animación de apertura ─────────────────────────────── */

@keyframes menu-drop {
  from {
    opacity: 0;
    transform: translateY(-8px) scale(0.97);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

@media (prefers-reduced-motion: no-preference) {
  details[open] .menu-panel {
    animation: menu-drop 200ms cubic-bezier(0.16, 1, 0.3, 1);
  }
}
`;

export function SiteHeader({ name, sections }: SiteHeaderProps) {
  const hasSections = sections.length > 0;

  return (
    <header className="site-header fixed inset-x-0 top-0 z-40 h-16">
      <style href="site-header-scroll" precedence="high">
        {HEADER_CSS}
      </style>

      <div className="mx-auto flex h-full max-w-7xl items-center justify-between gap-6 px-6">
        {/* Nombre / logo */}
        <span className="font-display text-xl font-medium tracking-tight text-ink">
          {name}
        </span>

        {/* Navegación desktop */}
        {hasSections && (
          <nav aria-label="Secciones" className="hidden md:block">
            <ul className="flex items-center">
              {sections.map((section) => (
                <li key={section.id}>
                  <a
                    href={`/#${section.id}`}
                    className="flex h-11 items-center px-3 text-sm tracking-wide text-muted transition-colors hover:text-accent"
                  >
                    {section.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}

        {/* Menú hamburguesa — Opción B: <details> con animación CSS pura */}
        {hasSections && (
          <details className="relative md:hidden">
            <summary
              className={[
                // Área táctil mínima 44×44 px
                "flex h-11 w-11 cursor-pointer list-none",
                "items-center justify-center",
                "rounded-lg text-ink",
                "transition-colors hover:bg-elevated/80 hover:text-accent",
                "[&::-webkit-details-marker]:hidden",
              ].join(" ")}
              aria-label="Abrir menú de secciones"
            >
              {/* Tres barras que se convierten en X al abrir */}
              <span className="flex flex-col items-center justify-center gap-[5px]" aria-hidden="true">
                <span className="menu-bar menu-bar-top" />
                <span className="menu-bar menu-bar-mid" />
                <span className="menu-bar menu-bar-bot" />
              </span>
            </summary>

            {/* Panel del menú */}
            <nav
              aria-label="Secciones"
              className={[
                "menu-panel",
                "absolute right-0 top-full mt-2 w-56",
                "rounded-xl border border-line/50",
                "bg-elevated/90 backdrop-blur-md",
                "shadow-2xl shadow-canvas/70",
                "overflow-hidden",
              ].join(" ")}
            >
              <ul className="py-1">
                {sections.map((section, i) => (
                  <li
                    key={section.id}
                    className={i > 0 ? "border-t border-line/30" : ""}
                  >
                    <a
                      href={`/#${section.id}`}
                      className={[
                        "group/item flex h-11 items-center gap-3 px-4",
                        "text-sm text-ink",
                        "transition-colors",
                        "hover:bg-surface hover:text-accent",
                      ].join(" ")}
                    >
                      {/* Número editorial en mono */}
                      <span className="font-mono text-[10px] tracking-widest text-muted/50 transition-colors group-hover/item:text-accent/60">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {section.title}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </details>
        )}
      </div>
    </header>
  );
}
