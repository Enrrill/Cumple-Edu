---
status: borrador
type: documento
tags:
  - galeria
  - diseno
  - ux
created: 2026-09-29
area: galeria-fotos
version: 0.1
---

# Diseño de la galería de fotos

## Resumen

Dirección visual y de interacción de la galería: paleta en tonos verdes, tipografía, layout por secciones, comportamiento responsive, animaciones y criterios de accesibilidad.

## Contexto

La página es un regalo de cumpleaños para un fotógrafo: el arte debe ser lo primero y la interfaz debe retirarse. Por eso el modo de diseño es **Experience** (portafolio/galería): la fotografía ocupa el primer viewport y la UI acompaña sin competir. La estructura técnica está en [Arquitectura de la galería de fotos](Arquitectura%20de%20la%20galer%C3%ADa%20de%20fotos.md).

## Contenido

### Dirección visual

- **Mood**: galería de arte nocturna, serena, con acentos verdes que evocan naturaleza y calma.
- **Principio**: fondo oscuro para que los colores de las fotos resalten; verde como firma de identidad, no como ruido.
- Los valores definitivos se confirman y documentan en `DESIGN.md` durante la fase de diseño con la skill *impeccable*.

### Paleta de colores

| Token | Valor inicial | Uso |
| --- | --- | --- |
| `bg-canvas` | `#0B1F17` | Fondo de página (verde bosque muy oscuro) |
| `bg-surface` | `#123126` | Tarjetas y bandas elevadas |
| `bg-elevated` | `#1A4433` | Menús, lightbox y elementos flotantes |
| `border-subtle` | `#1E4A38` | Bordes y separadores |
| `text-primary` | `#EAF3EE` | Texto principal (verde-blanco) |
| `text-muted` | `#9DBFb1` | Texto secundario y descripciones |
| `accent` | `#34D399` | Acento esmeralda: enlaces, foco, botones activos |
| `accent-strong` | `#10B981` | Hover y estados de énfasis |

Reglas de uso:

- El acento esmeralda no supera el 10 % de la superficie visible: guía la mirada, no compite con la foto.
- Las fotos nunca llevan filtro de color; el verde es territorio de la interfaz.
- Contraste mínimo AA (4.5:1) para texto, verificado sobre `bg-canvas` y `bg-surface`.

### Tipografía

| Uso | Tipografía | Tratamiento |
| --- | --- | --- |
| Títulos y nombre del fotógrafo | Serif con carácter (p. ej. Fraunces o Playfair Display) | Tamaño grande, interletraje ajustado |
| Texto y navegación | Sans legible (p. ej. Inter o Geist) | Cuerpo 16-18 px, interlínea 1.6 |
| Datos y contadores | Misma sans, versalitas | Contador del lightbox, pies de foto |

Escala tipográfica sugerida: 14 / 16 / 20 / 25 / 32 / 48 / 72 px con `clamp()` para fluido entre móvil y escritorio.

### Espaciado y layout

- Escala de espaciado por múltiplos de 4: 8, 12, 16, 24, 32, 48, 64, 96.
- Ancho máximo de contenido: 1280 px centrado; el hero y el carrusel son a sangre completa (full-bleed).
- Ritmo vertical entre secciones: 64-96 px en escritorio, 40-56 px en móvil.

### Estructura de la página

1. **Hero con carrusel**: ocupa el 100 vh; foto destacada a pantalla completa, nombre del fotógrafo, título del sitio y una indicación sutil de scroll. Autoplay lento (5-6 s), pausable al interactuar.
2. **Navegación**: barra mínima con el nombre y anclas a las secciones; transparente sobre el hero, con fondo al hacer scroll.
3. **Secciones por categoría**: cada categoría es una banda con título, descripción corta y su rejilla de fotos (3-4 columnas en escritorio, 2 en tablet, 1 en móvil). Algunas fotos pueden destacarse con un ancho mayor para romper la monotonía.
4. **Lightbox**: fondo `bg-elevated` con opacidad alta, foto centrada con `object-fit: contain`, título y contador (3 / 12), navegación ← →, cierre con Escape o clic fuera.
5. **Bio y dedicatoria**: bloque a dos columnas (retrato del fotógrafo + texto breve y dedicatoria de cumpleaños).
6. **Footer**: crédito, año y enlace discreto.

### Responsive

| Punto de quiebre | Ancho | Comportamiento |
| --- | --- | --- |
| Móvil | < 640 px | 1 columna, hero a 85-100 vh, menú en icono |
| Tablet | 640-1024 px | 2 columnas, secciones con más aire |
| Escritorio | > 1024 px | 3-4 columnas, hero completo, ancho 1280 px |

- El carrusel se arrastra con el dedo en táctil y con flechas/ratón en escritorio.
- `next/image` entrega el tamaño correcto a cada punto de quiebre vía `sizes`.

### Animación y microinteracciones

- Entrada de secciones con `framer-motion`: fundido y desplazamiento de 16-24 px, una sola vez.
- Hover de miniatura: elevación sutil y zoom del 2-3 % de la imagen.
- Transición de lightbox: fundido de 200-250 ms.
- Todo respeta `prefers-reduced-motion`: sin autoplay ni desplazamientos si el usuario lo pide.

### Accesibilidad

- `alt` descriptivo en cada foto; texto del carrusel legible sobre cualquier imagen (velo de degradado).
- Foco visible con anillo `accent` en todos los elementos interactivos.
- Lightbox: foco atrapado, ← → para navegar, Escape para cerrar, foco devuelto al elemento de origen.
- Navegación completa sin ratón; objetivos táctiles ≥ 44 px.

### Flujo de trabajo de diseño

Se usa la skill *impeccable* en este orden:

1. `impeccable context` + `init`: captura el contexto del producto en `PRODUCT.md`.
2. `shape`: decide UX y mundo visual antes de escribir código.
3. Construcción de componentes siguiendo `DESIGN.md` (tokens y componentes).
4. `polish` y `audit`: pasadas finales de calidad, accesibilidad y responsive con capturas de escritorio y móvil en una sola tanda.

## Decisiones

| Decisión | Alternativa descartada | Motivo |
| --- | --- | --- |
| Modo *Experience* | Modo *Persuade* | El sitio no vende: exhibe |
| Fondo oscuro con acentos verdes | Fondo claro | Resalta el color de la fotografía |
| Carrusel + secciones | Masonry único | Impacto en la portada y orden por categoría |
| Serif en títulos | Sans en todo | Personalidad editorial frente a foto contemporánea |
| Autoplay lento pausable | Sin autoplay o autoplay agresivo | Vida en la portada sin quitar control al visitante |

## Referencias

- [Next.js](../Referencias/Next.js.md)
- [Arquitectura de la galería de fotos](Arquitectura%20de%20la%20galer%C3%ADa%20de%20fotos.md)
- [Guía de uso sin programación](Gu%C3%ADa%20de%20uso%20sin%20programaci%C3%B3n.md)
