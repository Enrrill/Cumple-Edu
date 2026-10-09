"use client";

import { useEffect, useMemo } from "react";
import LightboxViewer from "yet-another-react-lightbox";
import { Counter } from "yet-another-react-lightbox/plugins";
import type { Slide } from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/counter.css";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import type { Photo } from "@/lib/albums";

export interface LightboxProps {
  photos: Photo[];
  index: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

/**
 * Lightbox v4 — Visor Inmersivo Flotante:
 * - Botones de solo icono sin marcos, contornos ni fondos circulares.
 * - Overlay negro oscuro semitransparente con desenfoque de fondo para sensación de foto flotando.
 * - Título de la imagen en texto suelto sobre un velo degradado inferior: sin
 *   píldora, sin borde y con doble sombra de texto para que respire en cualquier foto.
 * - Sin botones adicionales de zoom en la barra superior.
 * - Touch swipe natural e inmersivo en móviles.
 */

/** Icono de navegación anterior (Lucide) */
function IconPrev() {
  return (
    <ChevronLeft
      size={32}
      strokeWidth={1.75}
      className="drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] transition-transform hover:scale-115 active:scale-95"
    />
  );
}

/** Icono de navegación siguiente (Lucide) */
function IconNext() {
  return (
    <ChevronRight
      size={32}
      strokeWidth={1.75}
      className="drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] transition-transform hover:scale-115 active:scale-95"
    />
  );
}

/** Icono de cierre (Lucide) */
function IconClose() {
  return (
    <X
      size={26}
      strokeWidth={2}
      className="drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] transition-transform hover:scale-115 active:scale-95"
    />
  );
}

export function Lightbox({ photos, index, onClose, onNavigate }: LightboxProps) {
  const slides = useMemo<Slide[]>(
    () =>
      photos.map((photo) => ({
        src: photo.src,
        alt: photo.alt,
        title: photo.title,
        width: photo.width,
        height: photo.height,
      })),
    [photos],
  );

  const isOpen = index !== null;
  useEffect(() => {
    document.body.classList.toggle("lightbox-open", isOpen);
    return () => document.body.classList.remove("lightbox-open");
  }, [isOpen]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const containerStyle: Record<string, any> = {
    // Fondo negro con transparencia pronunciada y desenfoque
    "--yarl__container_background_color": "rgba(0, 0, 0, 0.88)",
    // Contador: esquina superior izquierda o inferior derecha limpio
    "--yarl__counter_top": "20px",
    "--yarl__counter_left": "24px",
    "--yarl__counter_bottom": "auto",
    "--yarl__counter_right": "auto",
    // Botones: totalmente transparentes sin bordes ni fondos
    "--yarl__button_background": "transparent",
    "--yarl__button_border": "none",
    "--yarl__color_button": "#ffffff",
    "--yarl__color_button_active": "#34d399",
  };

  return (
    <LightboxViewer
      open={isOpen}
      index={index ?? 0}
      close={onClose}
      slides={slides}
      on={{
        view: ({ index: active }) => onNavigate(active),
      }}
      plugins={[Counter]}
      controller={{ closeOnBackdropClick: true }}
      carousel={{
        padding: 0,
        imageFit: "contain",
        finite: false,
      }}
      animation={{ fade: 260, swipe: 200 }}
      render={{
        iconPrev: () => <IconPrev />,
        iconNext: () => <IconNext />,
        iconClose: () => <IconClose />,
        slideFooter: ({ slide }) => {
          if (!slide.title) return null;
          return (
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 bg-linear-to-t from-black/70 via-black/25 to-transparent px-6 pt-24 pb-7 text-center">
              <p className="mx-auto max-w-[85vw] font-sans text-sm font-medium text-white line-clamp-2 [text-shadow:0_1px_2px_rgba(0,0,0,0.9),0_6px_16px_rgba(0,0,0,0.75)] md:text-base">
                {typeof slide.title === "string" ? slide.title : ""}
              </p>
            </div>
          );
        },
      }}
      styles={{
        container: containerStyle,
        button: {
          background: "transparent",
          border: "none",
          boxShadow: "none",
          backdropFilter: "none",
          WebkitBackdropFilter: "none",
          padding: "12px",
          color: "#ffffff",
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any,
      }}
      counter={{
        className: "font-mono text-xs tracking-wider text-white/80 drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]",
      }}
      labels={{
        Close: "Cerrar",
        Previous: "Anterior",
        Next: "Siguiente",
        Slide: "Foto",
        "{index} of {total}": "{index} de {total}",
      }}
    />
  );
}
