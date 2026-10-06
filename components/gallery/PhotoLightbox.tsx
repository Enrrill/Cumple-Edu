"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import type { Photo } from "@/lib/albums";

/**
 * El lightbox se importa bajo demanda con `ssr: false`; Next 16 solo lo
 * admite dentro de un Client Component. Además solo se monta tras el
 * primer clic, así el chunk de YARL queda fuera del trabajo de hidratación
 * (TBT) de la portada.
 */
const Lightbox = dynamic(() => import("./Lightbox").then((mod) => mod.Lightbox), {
  ssr: false,
});

interface Viewer {
  photos: Photo[];
  index: number;
}

/**
 * Único punto cliente de las galerías (T5): visor + delegación de clics.
 * Las tarjetas (`PhotoCard`) son Server Components que solo publican
 * `data-photo-open`, `data-photo-collection` y `data-photo-title`; aquí se
 * reconstruye la colección desde el DOM en el momento del clic, así el
 * servidor no serializa 133 fotos hacia el cliente ni se hidrata ninguna
 * tarjeta. Tanto la portada como las páginas de categoría usan este
 * componente: la colección es el valor de `data-photo-collection`.
 */
export function PhotoLightbox() {
  const [viewer, setViewer] = useState<Viewer | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    function onClick(event: MouseEvent) {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const button = target.closest<HTMLElement>("[data-photo-open]");
      if (!button) return;

      const collection = button.dataset.photoCollection;
      if (!collection) return;

      const buttons = [
        ...document.querySelectorAll<HTMLElement>(
          `[data-photo-collection="${CSS.escape(collection)}"][data-photo-open]`,
        ),
      ];
      const entries = buttons
        .map((card) => ({ card, photo: photoFromButton(card) }))
        .filter((entry): entry is { card: HTMLElement; photo: Photo } => entry.photo !== null);
      const index = entries.findIndex((entry) => entry.card === button);
      if (index < 0) return;

      event.preventDefault();
      setMounted(true);
      setViewer({ photos: entries.map((entry) => entry.photo), index });
    }

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  if (!mounted) return null;

  return (
    <Lightbox
      photos={viewer?.photos ?? []}
      index={viewer?.index ?? null}
      onClose={() => setViewer(null)}
      onNavigate={(index) =>
        setViewer((current) => (current ? { ...current, index } : current))
      }
    />
  );
}

/** Reconstruye una `Photo` desde los datos de su tarjeta en el DOM. */
function photoFromButton(button: HTMLElement): Photo | null {
  const img = button.querySelector("img");
  if (!img) return null;

  // `img.src` puede ser una URL del optimizer; el lightbox necesita el
  // fichero original (`url=` del query string).
  let src = img.getAttribute("src") ?? img.src;
  try {
    const optimized = new URL(img.currentSrc || img.src, window.location.origin);
    const original = optimized.searchParams.get("url");
    if (original) src = original;
  } catch {
    // Ruta relativa sin optimizer: se usa tal cual.
  }

  return {
    id: button.dataset.photoOpen ?? "",
    src,
    title: button.dataset.photoTitle ?? "",
    category: button.dataset.photoCollection ?? "",
    featured: button.querySelector('[aria-label="Foto destacada"]') !== null,
    alt: img.alt,
    width: Number(img.getAttribute("width")) || 1200,
    height: Number(img.getAttribute("height")) || 800,
  };
}
