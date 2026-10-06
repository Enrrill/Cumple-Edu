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
      animation={{ fade: 250 }}
      styles={{
        container: {
          "--yarl__container_background_color":
            "color-mix(in srgb, var(--color-elevated) 92%, transparent)",
          // Contador abajo a la derecha: arriba choca con el título de la foto
          // (YARL lo coloca en 0,0 por defecto; las variables se heredan).
          // OJO: el valor debe ser `auto` y nunca `unset` — en una custom
          // property, `unset` equivale a `inherit` y el valor se pierde.
          "--yarl__counter_top": "auto",
          "--yarl__counter_left": "auto",
          "--yarl__counter_bottom": "0",
          "--yarl__counter_right": "0",
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
