# DESIGN.md — Sistema de diseño de la galería

> **Autoridad visual de este repositorio.** Los componentes se construyen siguiendo este
> documento; si un valor no está aquí, se propone en el PR y lo aprueba el mantenedor.
> Las pasadas finales (`impeccable polish` + `audit`, tarea T5) lo re-verifican contra lo
> construido y lo actualizan.
>
> Dirección de origen: [docs/Documentación/Diseño de la galería de fotos](docs/Documentaci%C3%B3n/Dise%C3%B1o%20de%20la%20galer%C3%ADa%20de%20fotos.md) · Brief confirmado: `shape` del 2026-09-30 (semilla `f4275035`).

## Dirección (bloqueada)

- **Modo**: *Experience* — la fotografía ocupa el primer viewport; la interfaz se retira.
- **Mundo**: galería de arte serena en tonos verdes; acento esmeralda como firma, no como ruido. La atmósfera la elige el visitante entre los tres modos de color (esmeralda por defecto, claro y oscuro).
- **Composición**: **Hoja de contactos** — la página es la hoja de contactos del fotógrafo:
  fotogramas numerados, tiras por categoría y marcas de selección esmeralda en las destacadas.
- **Momento focal**: el velo del hero con el título conceptual *«Historias & Miradas»*, y el punto esmeralda pulsante sobre las fotos destacadas.
- **Antimetas** (bloqueados): nada genérico, nada lento, nada que compita con la foto.

## Paleta y Sistema de 3 Modos

Estrategia de color: **modern restrained** — 3 modos de color seleccionables por el usuario desde `ThemeToggle` (cabecera, cualquier tamaño), con persistencia durante la sesión (`sessionStorage["edu-theme"]`; cada sesión arranca en Esmeralda) y lectura previa por script inline en `<head>` para evitar el flash del tema incorrecto.

### 1. Modo Claro
Luminoso, limpio, cálido y festivo (enfoque de regalo de cumpleaños moderno):
- `bg-canvas`: `#F8FAF8` (fondo marfil/salvia claro muy suave)
- `bg-surface`: `#FFFFFF` (tarjetas y superficies blancas puras)
- `bg-surface-hover`: `#F0F5F2`
- `bg-elevated`: `#FFFFFF`
- `border-line`: `#E3EBE6`
- `text-ink`: `#11261F` (carbón verde legible)
- `text-muted`: `#597368`
- `accent`: `#059669` (esmeralda fresco)
- `accent-strong`: `#047857`

### 2. Modo Esmeralda (Verde Moderno · Por Defecto)
Identidad de galería botánica revitalizada con mayor luminosidad y contraste (fondo verde agua, superficies blancas):
- `bg-canvas`: `#E8F5EE`
- `bg-surface`: `#FFFFFF`
- `bg-surface-hover`: `#D4EDDF`
- `bg-elevated`: `#FFFFFF`
- `border-line`: `#B6DECA`
- `text-ink`: `#0D3322`
- `text-muted`: `#2D6E52`
- `accent`: `#059669`
- `accent-strong`: `#047857`

### 3. Modo Oscuro (Grafito / Carbón)
Inmersivo, elegante y de bajo brillo para exploración nocturna:
- `bg-canvas`: `#0F1412`
- `bg-surface`: `#17211D`
- `bg-surface-hover`: `#212E29`
- `bg-elevated`: `#273731`
- `border-line`: `#263630`
- `text-ink`: `#F1F6F4`
- `text-muted`: `#8B9E97`
- `accent`: `#10B981`
- `accent-strong`: `#34D399`

> Los tres juegos de valores viven en `app/globals.css` (`:root`, `html[data-theme="emerald"]`, `html[data-theme="dark"]`); `DESIGN.md` es la especificación y `globals.css` la implementación. Si divergen, manda este documento.

## Tipografía Moderna

Tres fuentes, una por nivel de jerarquía. La de títulos se eligió por su **impacto con elegancia**: carácter de galería de arte contemporánea sin perder calidez:

| Uso | Fuente | Utilidad | Tratamiento |
| --- | --- | --- | --- |
| Títulos, hero, placas de sala, nombre del sitio | **Syne** (geométrica expresiva) | `font-display` | Tamaño grande, peso 500-600, interletraje ajustado; su forma ancha da presencia a los titulares |
| Texto, interfaz, navegación, dedicatoria | **Plus Jakarta Sans** | `font-sans` | Cuerpo 15-18 px, máxima legibilidad |
| Números de fotograma, contador del lightbox, prefijos | **Geist Mono** | `font-mono` | Versalitas simuladas (`uppercase tracking-wider`), 11-13 px |

- Motivo del cambio: El sitio es un **regalo de cumpleaños**, no un catálogo de museo antiguo; Plus Jakarta Sans mantiene el tono cálido y legible mientras Syne aporta el gesto gráfico.
- Historia: Fraunces → Outfit (fuentes geométricas) → **Syne** (más contundente, manteniendo el cuerpo intacto para no tocar legibilidad ni contraste).
- La variable CSS es `--font-syne` (declara `--font-display` en `@theme inline` de `app/globals.css`).

## Espaciado y layout

- Escala por múltiplos de 4: **8, 12, 16, 24, 32, 48, 64, 96**.
- Ancho máximo de contenido: **1280 px** centrado; hero y bandas a sangre (full-bleed).
- Ritmo vertical entre bandas: 64-96 px en escritorio, 40-56 px en móvil; más aire arriba de un título que debajo.
- **Rejilla Masonry (estilo Pinterest puro)**:
  - Implementada mediante **CSS Columns nativo** (`columns-2 lg:columns-3 xl:columns-4`) con `gap-x-1 md:gap-x-3 xl:gap-x-4`.
  - Tarjetas **100% fotográficas** con `rounded-2xl` y sin bloques muertos inferiores.
  - Breakpoints dinámicos:
    - **Móvil y tablet (< 1024 px)**: **2 columnas** (`columns-2`), con gap casi invisible en móvil para sensación a sangre.
    - **Desktop (1024-1279 px)**: **3 columnas** (`lg:columns-3`).
    - **Desktop amplio (≥ 1280 px)**: **4 columnas** (`xl:columns-4`).

## Lenguaje de componentes (v3)

- **Cabecera fija** (`SiteHeader`):
  - Mínima: nombre enlazable a la portada + selector de tema; la navegación por secciones vive en `NavSidebar`, no en la cabecera.
  - Glassmorphism: `backdrop-blur` permanente si el navegador lo soporta y fondo/borde que se solidifican al hacer scroll (`animation-timeline: scroll()`, con fondo sólido de reserva sin ese soporte).
  - Línea esmeralda fantasma en el borde inferior (`::after`, degradado `rgb(52 211 153 / 0.22)`).
- **Selector de tema** (`ThemeToggle`):
  - Tres botones (Sol / Hoja / Luna) en píldora con `aria-pressed` y `role="group"`; escribe `data-theme` en `<html>` y persiste en `sessionStorage["edu-theme"]` (dura la sesión).
- **Navegación flotante** (`NavSidebar`):
  - FAB de 48 px en `bottom-6 right-5` que abre el listado de secciones con scroll-spy, numeración editorial y conteo por sección (fotos por sala, dedicatorias en su sección).
  - **Escritorio (lg+)**: popover anclado contextualmente justo encima del botón (`bottom-20 right-5`, `w-72`, `rounded-2xl`) con `transform-origin: bottom right`: escala 0.92 → 1, desplazamiento de 8 px y fundido (200 ms de entrada, 160 ms de salida).
  - **Móvil**: bottom-sheet a ancho completo con backdrop, grip decorativo y slide-up de 220 ms (la fórmula táctil no cambia).
  - Se oculta con el lightbox (`body-lightbox-open:invisible`) y durante el cierre queda `inert` (no interactivo) pese a seguir visible durante el fundido.
- **Retorno persistente** (`FloatingBackButton`):
  - En `/categoria/[slug]` y `/dedicatorias`: botón `←` con la misma coordenada, tamaño y paleta que el FAB de `NavSidebar`, visible en cualquier profundidad de scroll.
  - Devuelve a la portada anclada a la sección de esa categoría (`/#<slug>`); sin `slug`, a la raíz.
  - Server Component sin JS propio (solo `next/link`); es el **único retorno visible** de la página.
- **Enlace de retorno accesible** (en el encabezado de `/categoria/[slug]`):
  - «Volver a la portada» con `sr-only focus:not-sr-only`: invisible a la vista (evita duplicar el `←`), pero se revela al recibir foco de teclado y sigue existiendo para buscadores y lectores de pantalla.
- **Placas de sala** (`CategorySection`):
  - Título enlazado a su colección con **flecha `→`** al final (`span aria-hidden`, `text-[0.45em]`, `text-accent/70` → acento pleno, desplazamiento de 4 px en hover) que anuncia de un vistazo que la sección es entrable.
  - El enlace lleva además el texto oculto «Ver la colección» para lectores de pantalla y mantiene un área táctil ≥ 44 px.
- **Fotograma** (`PhotoCard`):
  - 100% foto tipo Pinterest con `rounded-2xl` sin bordes ni bloques vacíos inferiores.
  - Anillo de selección/foco que sigue exactamente la curvatura redondeada (`focus-visible:ring-2 rounded-2xl`).
  - Overlay de información con gradiente sutil desde la base al hacer hover en escritorio.
  - Distintivo destacado (`FEATURED`) con pulso luminoso en esquina superior derecha.
- **Visor** (`Lightbox`):
  - Overlay negro al 88 % sobre la página; controles de solo icono sin discos, marcos ni fondos.
  - Título en texto suelto centrado sobre un velo degradado inferior, con doble sombra de texto (sin píldora, sin borde), legible sobre cualquier foto.
  - Contador en la esquina superior izquierda, en Geist Mono y con sombra de lectura.
  - Navegación ← →, Escape y clic en el fondo; fundido de 260 ms.
- **Hero** (`Hero`):
  - Título conceptual festivo: *"Historias & Miradas"*, subtítulo de regalo y badge *"Edición Especial · Cumpleaños"* en chip verde sólido (`accent-strong` con texto `canvas`: contraste 5,3:1 en claro, 4,9:1 en esmeralda y 9,8:1 en oscuro, legible sobre la foto en los tres modos).
  - Elimina cualquier redundancia con el álbum de retratos.
- **Bio y dedicatoria** (`Bio`):
  - Dedicatoria como **bloque editorial sin caja** (v3): filete superior, etiqueta mono versalitas «Dedicatoria especial» en `accent-strong`, cita a tamaño display en Syne con la comilla de apertura en esmeralda y firma «Con cariño» alineada a la derecha; sin emojis y sin tarjeta.
- **Hilo de dedicatorias** (`Dedications` en portada + `app/dedicatorias`):
  - Cabecera con el mismo ritmo editorial que las salas: separador con número en mono, título en Syne con **flecha `→`** que enlaza a la página propia `/dedicatorias` y contador `N dedicatorias`.
  - La portada muestra el hilo completo y la página nueva lo repite, el mismo patrón que las colecciones entre portada y `/categoria/[slug]`.
  - El hilo vive en `DedicationThread` (lista + CSS de entrada), compartido por ambas vistas: columna única (`max-w-2xl`, 672 px) de tarjetas `rounded-2xl` sobre `bg-surface/70` con `border-line/70` y `backdrop-blur`, el mismo lenguaje de superficie del resto del sitio.
  - Cabecera de página `/dedicatorias`: `h1` en Syne, contador en mono y descripción; retorno con `FloatingBackButton` (sin `slug`). Si no hay dedicatorias, la página devuelve 404 y la sección desaparece de la portada y del `NavSidebar`.
  - Avatar opcional con `next/image`; sin él, inicial de la persona en círculo `bg-accent/15` + `text-accent`.
  - Autor en Syne, meta (vínculo · fecha) en Geist Mono versalitas y mensaje en `<blockquote>` con `text-ink`.
  - Conector vertical de 1 px (`bg-line/60 → line/20`) entre mensajes y numeración editorial de cada uno en la esquina superior derecha.
  - Entrada por tarjeta con `dedication-in` (fundido + 16 px) usando `animation-timeline: view()` como las placas de sala.
- **Footer** (`SiteFooter`):
  - Línea superior esmeralda con degradado `via-accent/40`, separador central en dot esmeralda y firma editorial de cumpleaños.

## Movimiento

- Animaciones de entrada de tarjetas fotográficas en **CSS puro**: `@keyframes photo-card-in` con delay escalonado según índice de foto, sin sobrecargar el hilo principal.
- Despliegue del `NavSidebar`: `nav-panel-desktop-in/out` (escala 0.92 → 1 desde `transform-origin: bottom right`) en escritorio y `nav-panel-in/out` (slide-up) en móvil.
- Entradas de placas con `animation-timeline: view()` como progressive enhancement.
- Cabecera que se solidifica al hacer scroll (`animation-timeline: scroll()`, con reserva sólida sin soporte).
- Fundido del lightbox: 260 ms; microinteracciones de tarjeta: 300-500 ms.
- Respeto total de `prefers-reduced-motion`: regla global en `globals.css` que anula duraciones de animación y transición.

## Accesibilidad (no negociable)

- `alt` descriptivo en cada foto; texto del hero legible sobre cualquier imagen.
- Foco visible con anillo `accent` en todo lo interactivo (`globals.css`).
- Flechas `→` de las placas: `aria-hidden` + texto equivalente («Ver la colección» / «Ver todas las dedicatorias») en el mismo enlace.
- Enlace de retorno `sr-only focus:not-sr-only`: invisible a la vista, visible con foco de teclado.
- Lightbox: ← → navega, Escape cierra, foco atrapado y devuelto.
- `NavSidebar`: disparador `<button>` con `aria-expanded`/`aria-controls`, panel con `role="dialog"` y `aria-modal`, foco inicial en el cierre, Escape para cerrar y foco devuelto al disparador; durante el fundido de salida el panel queda `inert`.
- Botones flotantes (navegación y retorno): 48×48 px y `aria-label` (más `title` en el de retorno); se ocultan con el lightbox para no pisar el visor.
- Objetivos táctiles ≥ 44 px; contraste AA verificado en todos los niveles de elevación y en los tres modos de color.

## Rendimiento

- CSS Columns sin JavaScript de layout: renderizado nativo instantáneo en cliente, cero recalculo en JS.
- Server Components por defecto: `PhotoCard`, `GalleryGrid`, `CategorySection`, `Hero`, `Bio`, `Dedications`, `DedicationThread`, `SiteHeader`, `SiteFooter` y `FloatingBackButton` no añaden JS al cliente.
- Client Components mínimos: `NavSidebar` (scroll-spy y estado del panel), `ThemeToggle` (tema por sesión en `sessionStorage`) y `PhotoLightbox` (delegación de clics).
- Carga de imágenes con `next/image`, `sizes` afinado a las columnas reales, `loading="lazy"` y `fetchpriority` alto en el hero (q=60) / bajo en las tarjetas.
- Lightbox: `next/dynamic` con `ssr: false` y montaje solo tras el primer clic, así el chunk de YARL queda fuera de la hidratación de la portada.
- Cumplimiento de meta Lighthouse ≥ 95 en entorno de producción.

## Decisiones resueltas

- **Rejilla**: Migración de CSS Grid estándar a **CSS Columns nativo (Masonry)** con 2 columnas desde móvil y escalado a 3 (lg) y 4 (xl).
- **Navegación**: del menú en cabecera a **FAB + `NavSidebar`** (bottom-sheet en móvil, popover anclado al botón en escritorio) y **`FloatingBackButton`** en las páginas de categoría: la navegación y el retorno viven siempre en la misma esquina y no desaparecen al hacer scroll.
- **Temas**: sistema de **3 modos de color** (esmeralda por defecto, claro y oscuro) con `data-theme` + `sessionStorage` (arranca siempre en esmeralda; la elección dura la sesión), en lugar de un único fondo oscuro.
- **Nombre y fotos**: Eduardo; **166 fotos reales** en 5 salas (edu 44, urbano 36, amigos 35, retratos 25, paisaje 26).
- **Estética**: acabado esmeralda con micro-interacciones sutiles (hover, pulse, glow, glassmorphism) sobre las tres paletas.
- **Tipografía**: de Outfit a **Syne** para títulos (más impacto con la misma elegancia), manteniendo Plus Jakarta Sans y Geist Mono intactas.
- **Entrada a colecciones**: flecha `→` al final del título de cada placa, tanto en portada como en la cabecera de dedicatorias, para que se vea de un vistazo que la sección es entrable.
- **Retorno único**: se retiró el enlace textual «← Volver a la portada» visible de las colecciones (redundante con `FloatingBackButton`) y se conservó como `sr-only focus:not-sr-only`.
- **Dedicatorias con página propia**: `/dedicatorias` con `h1`, contador y hilo completo; la portada mantiene su sección (hilo completo) con el título enlazando a la página, igual que las colecciones.
- **Favicon**: del triángulo genérico de Next.js a un **diafragma de 6 aspas** en esmeralda sobre tinta (`app/icon.svg` + `app/favicon.ico` de respaldo + `app/apple-icon.png`), legible a 16 px con la identidad de la galería en la pestaña.
