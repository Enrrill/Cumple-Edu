"use client";

import { useMemo } from "react";
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

  return (
    <LightboxViewer
      open={index !== null}
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
