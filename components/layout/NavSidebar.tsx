"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { LayoutList, X, Camera } from "lucide-react";

export interface NavSidebarProps {
  sections: { id: string; title: string; count?: number }[];
}

/** Duración (ms) del fundido de salida: debe cubrir la keyframe `*-out`. */
const CLOSE_MS = 200;

/**
 * NavSidebar v2 — Navegación flotante de secciones:
 *
 * Desktop (lg+):
 * - Botón circular fijo abajo a la derecha (toggle)
 * - Panel anclado contextualmente justo encima del botón (`bottom-20 right-5`),
 *   ya no centrado en pantalla: el menú nace del punto donde se hizo clic
 * - Despliegue con animación de origen `transform-origin: bottom right`
 *   (escala + desplazamiento + fundido), tipo popover moderno
 * - Scroll-spy: resalta la sección activa mientras el usuario hace scroll
 * - Cierra automáticamente al hacer clic en un enlace
 *
 * Móvil:
 * - Mismo botón (FAB) en esquina inferior derecha
 * - Panel de bottom-sheet que sube desde abajo (fórmula táctil intacta)
 * - Mismo scroll-spy
 *
 * Accesibilidad: gestión de foco, Escape para cerrar, aria-expanded/modal,
 * animación anulada por `prefers-reduced-motion` (regla global en globals.css).
 */
export function NavSidebar({ sections }: NavSidebarProps) {
  const [open, setOpen] = useState(false);
  // Mantiene el panel en el DOM durante la animación de cierre (`hidden`
  // inmediato mataría el fundido de salida).
  const [mounted, setMounted] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── Apertura / cierre con animación de salida ────────────────────────────
  // `mounted` conserva el panel en el DOM durante los ~200 ms del fundido de
  // salida (con `hidden` inmediato la animación no se vería). Se gestiona en
  // los manejadores de evento, nunca dentro de un efecto.
  const openPanel = useCallback(() => {
    if (closeTimer.current !== null) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    setMounted(true);
    setOpen(true);
  }, []);

  const closePanel = useCallback(() => {
    setOpen(false);
    if (closeTimer.current !== null) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => {
      setMounted(false);
      closeTimer.current = null;
    }, CLOSE_MS);
  }, []);

  // Limpieza al desmontar: ningún timer suelto re-renderizando
  useEffect(
    () => () => {
      if (closeTimer.current !== null) clearTimeout(closeTimer.current);
    },
    [],
  );

  // ── Scroll-spy ──────────────────────────────────────────────────────────
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveId(id);
        },
        { rootMargin: "-20% 0px -70% 0px", threshold: 0 },
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, [sections]);

  // ── Cerrar con Escape / clic fuera ──────────────────────────────────────
  useEffect(() => {
    if (!open) return;

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        closePanel();
        triggerRef.current?.focus();
      }
    }

    function onPointer(e: PointerEvent) {
      if (
        panelRef.current &&
        !panelRef.current.contains(e.target as Node) &&
        !triggerRef.current?.contains(e.target as Node)
      ) {
        closePanel();
      }
    }

    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open, closePanel]);

  // ── Foco al panel al abrir ───────────────────────────────────────────────
  useEffect(() => {
    if (open) {
      // pequeño delay para que la animación empiece
      const raf = requestAnimationFrame(() => {
        panelRef.current?.querySelector<HTMLElement>("[data-autofocus]")?.focus();
      });
      return () => cancelAnimationFrame(raf);
    }
  }, [open]);

  const toggle = useCallback(() => {
    if (open) closePanel();
    else openPanel();
  }, [open, openPanel, closePanel]);

  const handleLinkClick = useCallback(() => {
    closePanel();
  }, [closePanel]);

  return (
    <>
      {/* ── Botón trigger ──────────────────────────────────────────────────── */}
      <button
        ref={triggerRef}
        type="button"
        aria-label={open ? "Cerrar navegación" : "Abrir navegación de secciones"}
        aria-expanded={open}
        aria-controls="nav-sidebar-panel"
        onClick={toggle}
        className={[
          // Posición fija: esquina inferior derecha en todos los tamaños
          "fixed bottom-6 right-5 z-50",
          "flex h-12 w-12 items-center justify-center",
          "rounded-full shadow-2xl",
          // Colores reactivos al tema
          "bg-accent text-white",
          "border border-white/20",
          "transition-all duration-200",
          "hover:scale-105 hover:shadow-accent/30 hover:shadow-xl",
          "active:scale-95",
          // Ocultar cuando el lightbox cubre todo
          "body-lightbox-open:invisible",
        ].join(" ")}
      >
        {open ? <X size={20} strokeWidth={2.2} /> : <LayoutList size={20} strokeWidth={2.2} />}
      </button>

      {/* ── Backdrop móvil ─────────────────────────────────────────────────── */}
      {open && (
        <div
          aria-hidden="true"
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-[2px] lg:hidden"
          onClick={closePanel}
        />
      )}

      {/* ── Panel lateral / bottom-sheet ───────────────────────────────────── */}
      <div
        id="nav-sidebar-panel"
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Secciones de la galería"
        hidden={!mounted}
        inert={!open}
        className={[
          // Mobile: bottom-sheet que sube desde abajo
          "fixed bottom-0 left-0 right-0 z-50",
          "rounded-t-2xl",
          // Desktop: popover anclado justo encima del botón trigger
          "lg:bottom-20 lg:left-auto lg:right-5 lg:top-auto lg:w-72 lg:rounded-2xl",
          // Fondo glassmorphism
          "bg-elevated/95 backdrop-blur-xl",
          "border border-line/60",
          "shadow-2xl shadow-black/20",
          // Animación: slide-up en móvil, escala desde la esquina en escritorio
          open
            ? [
                "animate-[nav-panel-in_220ms_cubic-bezier(0.16,1,0.3,1)_both]",
                "lg:animate-[nav-panel-desktop-in_200ms_cubic-bezier(0.16,1,0.3,1)_both]",
              ].join(" ")
            : [
                "animate-[nav-panel-out_180ms_ease-in_both]",
                "lg:animate-[nav-panel-desktop-out_160ms_ease-in_both]",
              ].join(" "),
        ].join(" ")}
      >
        {/* Cabecera del panel */}
        <div className="flex items-center justify-between border-b border-line/40 px-5 py-4">
          <div className="flex items-center gap-2.5">
            <Camera size={15} className="text-accent" />
            <span className="font-display text-sm font-semibold tracking-tight text-ink">
              Secciones
            </span>
          </div>
          <button
            type="button"
            aria-label="Cerrar panel"
            onClick={() => {
              closePanel();
              triggerRef.current?.focus();
            }}
            data-autofocus
            className="flex h-8 w-8 items-center justify-center rounded-lg text-muted transition-colors hover:bg-surface hover:text-ink"
          >
            <X size={16} />
          </button>
        </div>

        {/* Lista de secciones */}
        <nav aria-label="Secciones de la galería">
          <ul className="py-2">
            {sections.map((section, i) => {
              const isActive = activeId === section.id;
              return (
                <li key={section.id}>
                  <a
                    href={`/#${section.id}`}
                    onClick={handleLinkClick}
                    className={[
                      "group flex items-center gap-3 px-5 py-3",
                      "text-sm transition-all duration-150",
                      isActive
                        ? "text-accent bg-accent/8"
                        : "text-ink hover:bg-surface hover:text-accent",
                    ].join(" ")}
                  >
                    {/* Indicador activo */}
                    <span
                      className={[
                        "h-4 w-0.5 rounded-full transition-all duration-200",
                        isActive ? "bg-accent scale-y-100" : "bg-transparent scale-y-0",
                      ].join(" ")}
                    />
                    {/* Número editorial */}
                    <span
                      className={[
                        "font-mono text-[10px] tracking-widest transition-colors",
                        isActive ? "text-accent/80" : "text-muted/50",
                      ].join(" ")}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {/* Título */}
                    <span className="flex-1 font-medium leading-tight">{section.title}</span>
                    {/* Conteo de fotos */}
                    {section.count != null && (
                      <span
                        className={[
                          "font-mono text-[10px] tabular-nums transition-colors",
                          isActive ? "text-accent/70" : "text-muted/50",
                        ].join(" ")}
                      >
                        {section.count}
                      </span>
                    )}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Grip móvil decorativo */}
        <div className="flex justify-center py-3 lg:hidden">
          <div className="h-1 w-8 rounded-full bg-line/60" />
        </div>
      </div>

      {/* Keyframes del panel: slide-up en móvil, popover con origen abajo-dcha */}
      <style href="nav-sidebar-anim" precedence="high">{`
        @keyframes nav-panel-in {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: none; }
        }
        @keyframes nav-panel-out {
          from { opacity: 1; }
          to   { opacity: 0; }
        }
        @keyframes nav-panel-desktop-in {
          from { opacity: 0; transform: scale(0.92) translateY(8px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes nav-panel-desktop-out {
          from { opacity: 1; transform: scale(1); }
          to   { opacity: 0; transform: scale(0.92) translateY(8px); }
        }
        /* El popover crece desde su esquina inferior derecha, hacia el botón */
        @media (min-width: 1024px) {
          #nav-sidebar-panel { transform-origin: bottom right; }
        }
      `}</style>
    </>
  );
}
