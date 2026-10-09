"use client";

import type { MouseEvent as ReactMouseEvent } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./ThemeToggle";

export interface SiteHeaderProps {
  name: string;
}

/**
 * Cabecera fija minimalista — v4:
 * - Solo nombre y selector de temas (el acceso a secciones ahora es vía NavSidebar flotante)
 * - El nombre vuelve al inicio: en portada hace scroll suave al tope (con
 *   `behavior: auto` si hay `prefers-reduced-motion`); desde otra ruta el
 *   `Link` navega a `/` y Next hace su scroll-to-top habitual
 * - Glassmorphism: backdrop-blur al hacer scroll
 * - Línea de acento decorativa en la parte inferior
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
`;

export function SiteHeader({ name }: SiteHeaderProps) {
  const pathname = usePathname();

  /**
   * En la portada, `Link` a la misma ruta no hace scroll: aquí subimos al
   * inicio a mano. En el resto de rutas se navega a `/` con normalidad.
   */
  function handleNameClick(event: ReactMouseEvent<HTMLAnchorElement>) {
    if (pathname !== "/") return;
    event.preventDefault();
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
  }

  return (
    <header className="site-header fixed inset-x-0 top-0 z-40 h-16">
      <style href="site-header-scroll" precedence="high">
        {HEADER_CSS}
      </style>

      <div className="mx-auto flex h-full max-w-7xl items-center justify-between gap-6 px-6">
        {/* Nombre / logo enlazable */}
        <Link
          href="/"
          onClick={handleNameClick}
          className="font-display text-xl font-medium tracking-tight text-ink transition-colors hover:text-accent"
        >
          {name}
        </Link>

        {/* Selector de tema */}
        <div className="flex items-center">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
