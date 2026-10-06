"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import type { Photo } from "@/lib/albums";

export interface HeroCarouselProps {
  photos: Photo[];
  onOpen: (id: string) => void;
}

const AUTOPLAY_MS = 5500;
const SNAP_DURATION_MS = 800;

export function HeroCarousel({ photos, onOpen }: HeroCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: photos.length > 1, duration: SNAP_DURATION_MS },
    [],
  );
  const [selected, setSelected] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReducedMotion(query.matches);
    onChange();
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi || photos.length < 2 || paused || reducedMotion) return;
    const interval = window.setInterval(() => emblaApi.scrollNext(), AUTOPLAY_MS);
    return () => window.clearInterval(interval);
  }, [emblaApi, photos.length, paused, reducedMotion]);

  if (photos.length === 0) return null;

  const total = String(photos.length).padStart(2, "0");
  const current = String(selected + 1).padStart(2, "0");

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (!emblaApi) return;
    if (event.key === "ArrowRight") emblaApi.scrollNext(reducedMotion);
    if (event.key === "ArrowLeft") emblaApi.scrollPrev(reducedMotion);
  };

  const handleBlur = (event: React.FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
      setPaused(false);
    }
  };

  return (
    <section
      className="relative h-screen min-h-[480px] w-full overflow-hidden bg-canvas"
      aria-roledescription="carrusel"
      aria-label="Fotos destacadas"
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={handleBlur}
    >
      <div ref={emblaRef} className="h-full overflow-hidden">
        <div className="flex h-full">
          {photos.map((photo, index) => (
            <div
              key={photo.id}
              className="relative h-full min-w-0 flex-[0_0_100%]"
              role="group"
              aria-roledescription="diapositiva"
              aria-label={`${index + 1} de ${photos.length}`}
            >
              <button
                type="button"
                onClick={() => onOpen(photo.id)}
                className="absolute inset-0 h-full w-full cursor-pointer"
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="100vw"
                  preload={index === 0}
                  placeholder={photo.blur ? "blur" : undefined}
                  blurDataURL={photo.blur}
                  className="object-cover"
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Velos: el encabezado fijo debe leerse sobre fotos claras (arriba)
          y el contador/scroll sobre cualquier imagen (abajo). */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-linear-to-b from-canvas/80 to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-44 bg-linear-to-t from-canvas to-transparent"
      />

      <p className="absolute bottom-6 left-6 font-mono text-sm uppercase tracking-wider text-muted">
        {current} / {total}
      </p>

      <div
        aria-hidden="true"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-muted"
      >
        <ChevronDown className="h-6 w-6 motion-safe:animate-[scroll-hint_2.6s_ease-in-out_infinite]" />
      </div>

      {photos.length > 1 && (
        <>
          <button
            type="button"
            aria-label="Foto anterior"
            onClick={() => emblaApi?.scrollPrev(reducedMotion)}
            className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-elevated/70 text-ink transition-colors motion-safe:transition-colors hover:bg-elevated hover:text-accent"
          >
            <ChevronLeft className="h-6 w-6" aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label="Foto siguiente"
            onClick={() => emblaApi?.scrollNext(reducedMotion)}
            className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-elevated/70 text-ink transition-colors motion-safe:transition-colors hover:bg-elevated hover:text-accent"
          >
            <ChevronRight className="h-6 w-6" aria-hidden="true" />
          </button>
        </>
      )}
    </section>
  );
}
