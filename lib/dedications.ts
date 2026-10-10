import dedications from "@/content/dedications.json";

/**
 * Modelo de datos del hilo de dedicatorias — complementa a `lib/albums.ts`.
 * Mismo patrón que la galería: el componente NO importa el JSON directamente,
 * recibe estas dedicatorias por props desde `app/page.tsx`.
 *
 * El contenido se edita en `content/dedications.json` (ver la Guía de uso sin
 * programación); el orden del array es el orden del hilo en pantalla.
 */
export interface Dedication {
  /** Identificador único y estable (por ejemplo, `nombre-2026`). */
  id: string;
  /** Nombre de la persona que escribe. */
  author: string;
  /** Vínculo con el homenajeado: «Hermana», «Compañero de carrera»… */
  relation?: string;
  /**
   * Mensaje. Una cadena = un párrafo; un array = un párrafo por elemento
   * (así los saltos de línea reales no se colapsan al renderizar).
   */
  text?: string | string[];
  /** Fecha opcional en formato `AAAA-MM-DD`. */
  date?: string;
  /** Avatar opcional. Si falta, se pinta la inicial de la persona. */
  avatar?: { src: string; alt: string };
  /**
   * Imagen adjunta (flyer de cumpleaños). Se pinta bajo el mensaje con su
   * ancho y alto intrínsecos, para reservar espacio sin saltos de layout.
   */
  image?: { src: string; alt: string; width: number; height: number };
}

/** Dedicatorias en orden de aparición (el orden del fichero = el del hilo). */
export function getDedications(): Dedication[] {
  return dedications;
}
