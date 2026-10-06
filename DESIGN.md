# DESIGN.md — Sistema de diseño de la galería

> **Autoridad visual de este repositorio.** Los componentes se construyen siguiendo este
> documento; si un valor no está aquí, se propone en el PR y lo aprueba el mantenedor.
> Las pasadas finales (`impeccable polish` + `audit`, tarea T5) lo re-verifican contra lo
> construido y lo actualizan.
>
> Dirección de origen: [docs/Documentación/Diseño de la galería de fotos](docs/Documentaci%C3%B3n/Dise%C3%B1o%20de%20la%20galer%C3%ADa%20de%20fotos.md) · Brief confirmado: `shape` del 2026-09-30 (semilla `f4275035`).

## Dirección (bloqueada)

- **Modo**: *Experience* — la fotografía ocupa el primer viewport; la interfaz se retira.
- **Mundo**: galería de arte nocturna en tonos verdes; acento esmeralda como firma, no como ruido.
- **Composición**: **Hoja de contactos** — la página es la hoja de contactos del fotógrafo:
  fotogramas numerados, tiras por categoría y marcas de selección esmeralda en las destacadas.
- **Momento focal**: el círculo de selección esmeralda sobre el fotograma elegido del hero.
- **Antimetas** (bloqueados): nada genérico, nada lento, nada que compita con la foto.

## Paleta

Estrategia de color: **restrained** — neutros verdes + un solo acento.

| Token (`docs/`) | Variable CSS | Utilidad Tailwind | Valor | Uso |
| --- | --- | --- | --- | --- |
| `bg-canvas` | `--color-canvas` | `bg-canvas` | `#0B1F17` | Fondo de página |
| `bg-surface` | `--color-surface` | `bg-surface` | `#123126` | Tarjetas y bandas elevadas |
| `bg-surface-hover` | `--color-surface-hover` | `bg-surface-hover` | `#163B2E` | Hover en tarjetas y superficies interactivas |
| `bg-elevated` | `--color-elevated` | `bg-elevated` | `#1A4433` | Menú, lightbox, elementos flotantes |
| `border-subtle` | `--color-line` | `border-line` | `#1E4A38` | Bordes, separadores, márgenes de fotograma |
| `text-primary` | `--color-ink` | `text-ink` | `#EAF3EE` | Texto principal |
| `text-muted` | `--color-muted` | `text-muted` | `#9DBFB1` | Descripciones, números de fotograma |
| `accent` | `--color-accent` | `text-accent` / `bg-accent` / `ring-accent` | `#34D399` | Enlaces, foco, marcas de selección, activos |
| `accent-strong` | `--color-accent-strong` | `hover:` sobre el acento | `#10B981` | Hover y énfasis |

Reglas:

- El acento esmeralda **nunca supera el 10 %** de la superficie visible.
- Las fotos **nunca** llevan filtro de color; el verde es territorio de la interfaz.
- Contraste AA (4.5:1) sobre `bg-canvas` y `bg-surface` para todo el texto.
- Sin degradados gratuitos: campos planos y velos funcionales de legibilidad (disciplina donada por el reto Du Bois).

## Tipografía

| Uso | Fuente | Utilidad | Tratamiento |
| --- | --- | --- | --- |
| Títulos, nombre del fotógrafo, placas de sala | **Fraunces** (serif con carácter) | `font-display` | Tamaño grande, `tracking-tight`, peso 400-600 |
| Texto, navegación, pies | **Geist Sans** | `font-sans` (por defecto) | Cuerpo 16-18 px, interlínea 1.6 |
| Números de fotograma, contador del lightbox, metadatos, prefijos | **Geist Mono** | `font-mono` | Versalitas simuladas (`uppercase tracking-wider`), 12-14 px |

- Motivo de Fraunces: serif óptico impreso con personalidad (mundo del catálogo fotográfico),
  evita el didone genérico de los portafolios de foto; era una de las sugerencias propias del proyecto.
- Escala: **14 / 16 / 20 / 25 / 32 / 48 / 72 px** con `clamp()` para fluir entre móvil y escritorio.
- El número de fotograma siempre va en mono: `01`, `02`… precedido del prefijo de categoría (`RT-04`).

## Espaciado y layout

- Escala por múltiplos de 4: **8, 12, 16, 24, 32, 48, 64, 96**.
- Ancho máximo de contenido: **1280 px** centrado; hero, bandas y carrusel a sangre (full-bleed).
- Ritmo vertical entre bandas: 64-96 px en escritorio, 40-56 px en móvil; más aire arriba de un título que debajo.
- **Rejilla Masonry (estilo Pinterest)**:
  - Implementada mediante **CSS Columns nativo** (`columns-2 md:columns-3 lg:columns-4`) con `gap-3 sm:gap-4 md:gap-5 lg:gap-6`.
  - Cada fotograma es un bloque indivisible (`break-inside-avoid inline-block w-full mb-3 sm:mb-4 md:mb-5 lg:mb-6`) respetando el aspect ratio nativo de la imagen sin recortes artificiales ni huecos blancos.
  - Breakpoints dinámicos:
    - **Móvil (< 768 px)**: **2 columnas** (`columns-2`) para una navegación ágil y densa en vez de scroll monótono de 1 sola columna.
    - **Tablet (768-1024 px)**: **3 columnas** (`md:columns-3`).
    - **Escritorio (> 1024 px)**: **4 columnas** (`lg:columns-4`).

## Lenguaje de componentes (hoja de contactos v2)

- **Cabecera fija** (`SiteHeader`):
  - Glassmorphism con `bg-canvas/85 backdrop-blur-md` y fina línea esmeralda inferior (`border-line/60`).
  - Nombre "Eduardo" en Fraunces con micro-interacción interactiva.
  - Navegación de escritorio limpia con anclas de categoría y foco accesible.
  - **Menú móvil (Opción B)**: dropdown animado en CSS puro con `<details className="group">`. Las barras de la hamburguesa rotan y transicionan a una cruz "X" sin una sola línea de JavaScript (`group-open:rotate-45`, `group-open:-rotate-45`). Panel flotante desplegable con `backdrop-blur-md`, bordes `rounded-xl`, sombra profunda y animación `@keyframes menu-drop`, con numeración editorial `font-mono` en cada enlace.
- **Fotograma** (`PhotoCard`):
  - Bordes redondeados modernos `rounded-xl` con borde refinado `border-line/60`.
  - Cursor interactivo `cursor-zoom-in`.
  - Hover multi-capa premium:
    - Micro-escalado suave de la imagen (`scale-[1.02]`).
    - Resplandor esmeralda suave (`shadow-[0_12px_30px_-8px_rgba(52,211,153,0.18)]`).
    - Velo de gradiente inferior funcional para garantizar legibilidad del texto.
    - Pie de tarjeta con micro-desplazamiento vertical ascendente en hover (`translate-y-0.5` a `translate-y-0`).
  - Distintivo destacado (`FEATURED`) con dot verde pulsante (`animate-ping`) en esquina superior derecha.
  - Entrada progresiva escalonada (staggered) con CSS puro `@keyframes photo-card-in`.
  - Mantiene 100% arquitectura Server Component.
- **Hero** (`HeroCarousel` / `Hero`):
  - 100 vh, foto a sangre, velos de degradado balanceados para legibilidad perfecta.
  - Identidad destacada: nombre "Eduardo" en Fraunces sobre el velo inferior, dot pulsante verde de exhibición activa y título editorial de la muestra.
  - Contador de diapositivas `01 / 05` en Geist Mono y botón accesible para pausar/reanudar reproducción.
- **Placas y separadores de categoría** (`CategorySection`):
  - Separador superior con gradiente sutil esmeralda y numeración de sala editorial (`ROOM 01`, `ROOM 02`, etc.) en Geist Mono.
  - Compensación de scroll `scroll-mt-20` para anclas directas sin tapar el encabezado.
  - Placa de entrada con título serif grande + descripción corta + contador en mono (`24 fotos`).
- **Lightbox** (`Lightbox`):
  - Fondo con efecto glassmorphism `bg-canvas/90 backdrop-blur-md`.
  - Botones circulares flotantes (`rounded-full`) con `backdrop-blur-sm`, borde sutil y estado hover con anillo esmeralda.
  - Barra de pie de foto con gradiente más profundo y textos nítidos en Fraunces y Geist Mono.
  - Foco atrapado y accesible con teclado (←, →, Escape).
- **Bio y dedicatoria** (`Bio`):
  - Contenedor con `rounded-2xl` y marco ornamental en dos esquinas (`border-t-2 border-l-2` / `border-b-2 border-r-2` en color `accent`).
  - Letra capital clásica esmeralda (`float-left text-accent font-display text-4xl pr-2 leading-none`) que realza el tono literario de la dedicatoria.
- **Footer** (`SiteFooter`):
  - Línea superior esmeralda con degradado `via-accent/40`, separador central en dot esmeralda y firma editorial de cumpleaños.

## Movimiento

- Animaciones de entrada de tarjetas fotográficas en **CSS puro**: `@keyframes photo-card-in` con delay escalonado según índice de foto, sin sobrecargar el hilo principal.
- Despliegue de menú móvil con `@keyframes menu-drop` (slide-down + fade).
- Entradas de placas con `animation-timeline: view()` como progressive enhancement.
- Fundidos del carrusel y lightbox suaves y atmosféricos (250-300 ms).
- Respeto total de `prefers-reduced-motion`: transiciones y transformaciones desactivadas automáticamente.

## Accesibilidad (no negociable)

- `alt` descriptivo en cada foto; texto del hero legible sobre cualquier imagen.
- Foco visible con anillo `accent` en todo lo interactivo (`globals.css`).
- Lightbox: ← → navega, Escape cierra, foco atrapado y devuelto.
- Menú móvil implementado sobre semántica HTML nativa `<details>` / `<summary>`, operable mediante teclado (Espacio/Enter abre y cierra).
- Objetivos táctiles ≥ 44 px; contraste AA verificado en todos los niveles de elevación.

## Rendimiento

- CSS Columns sin JavaScript de layout: renderizado nativo instantáneo en cliente, cero recalculo en JS.
- Mantenimiento estricto de Server Components en PhotoCard, CategorySection, Hero y Bio.
- Carga de imágenes con `next/image`, optimización de dimensiones (`sizes`) y carga diferida.
- Lightbox importado dinámicamente con `next/dynamic` (`ssr: false`).
- Cumplimiento de meta Lighthouse ≥ 95 en entorno de producción.

## Decisiones resueltas

- **Rejilla**: Migración de CSS Grid estándar a **CSS Columns nativo (Masonry)** con 2 columnas desde viewport móvil y escalado fluido a 3 y 4 columnas.
- **Menú móvil**: Opción B elegida e implementada (dropdown `<details>` con animación de hamburguesa a cruz en CSS puro).
- **Nombre y fotos**: Eduardo; 54 fotos reales distribuidas en 5 salas.
- **Estética**: Acabado nocturno esmeralda con micro-interacciones sutiles (hover, pulse, glow, glassmorphism).
