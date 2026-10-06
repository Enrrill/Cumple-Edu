"use client";

import { useEffect, useMemo } from "react";
import LightboxViewer from "yet-another-react-lightbox";
import { Captions, Counter } from "yet-another-react-lightbox/plugins";
import type { Slide } from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/counter.css";
import "yet-another-react-lightbox/plugins/captions.css";
import type { Photo } from "@/lib/albums";

export interface LightboxProps {
  photos: Photo[];
  index: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

/**
 * Lightbox v2: estilos modernizados.
 * - Fondo con backdrop-filter blur (glassmorphism ligero)
 * - Botones de navegación con `border-radius: 9999px` (circulares)
 *   y fondo semitransparente con blur propio
 * - Gradiente de título más profundo en la parte inferior
 * - Fade 300ms (más fluido que 250ms)
 * - Contador en mono en la esquina inferior derecha
 */
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

  // Mientras el visor cubre la página se ocultan cabecera y pie (ver globals).
  const isOpen = index !== null;
  useEffect(() => {
    document.body.classList.toggle("lightbox-open", isOpen);
    return () => document.body.classList.remove("lightbox-open");
  }, [isOpen]);

  return (
    <LightboxViewer
      open={isOpen}
      index={index ?? 0}
      close={onClose}
      slides={slides}
      on={{
        view: ({ index: active }) => onNavigate(active),
      }}
      plugins={[Counter, Captions]}
      controller={{ closeOnBackdropClick: true }}
      carousel={{ imageFit: "contain" }}
      animation={{ fade: 300 }}
      styles={{
        container: {
          // Glassmorphism: fondo semitransparente con leve blur
          backdropFilter: "blur(6px)",
          WebkitBackdropFilter: "blur(6px)",
          "--yarl__container_background_color":
            "color-mix(in srgb, var(--color-canvas) 88%, transparent)",
          // Contador abajo a la derecha
          "--yarl__counter_top": "auto",
          "--yarl__counter_left": "auto",
          "--yarl__counter_bottom": "0",
          "--yarl__counter_right": "0",
          // Gradiente del título más profundo
          "--yarl__slide_captions_container_background":
            "linear-gradient(to top, rgb(11 31 23 / 0.88) 0%, rgb(11 31 23 / 0.4) 50%, transparent 100%)",
        },
        // Botones de navegación circulares con glassmorphism
        button: {
          background:
            "color-mix(in srgb, var(--color-elevated) 65%, transparent)",
          border:
            "1px solid color-mix(in srgb, var(--color-line) 70%, transparent)",
          borderRadius: "9999px",
          color: "var(--color-ink)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          transition: "background 200ms, border-color 200ms",
        },
      }}
      counter={{
        className: "font-mono text-xs uppercase tracking-wider text-muted",
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
