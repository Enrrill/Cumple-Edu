---
status: borrador
type: documento
tags:
  - galeria
  - diseno
  - ux
created: 2026-09-29
area: galeria-fotos
version: 0.4
---

# Diseño de la galería de fotos

## Resumen

Dirección visual y de interacción de la galería: paleta en tonos verdes, tipografía, layout por secciones, comportamiento responsive, animaciones y criterios de accesibilidad.

## Contexto

La página es un regalo de cumpleaños para un fotógrafo: el arte debe ser lo primero y la interfaz debe retirarse. Por eso el modo de diseño es **Experience** (portafolio/galería): la fotografía ocupa el primer viewport y la UI acompaña sin competir. La estructura técnica está en [Arquitectura de la galería de fotos](Arquitectura%20de%20la%20galer%C3%ADa%20de%20fotos.md).

## Contenido

### Dirección visual

- **Mood**: galería de arte serena, con acentos verdes que evocan naturaleza y calma.
- **Principio**: la interfaz se retira para que la foto mande; el verde es firma de identidad, no como ruido.
- **Modos de color**: el sitio ofrece tres atmósferas seleccionables desde la cabecera —**claro (por defecto)**, **esmeralda** y **oscuro**— con persistencia en el navegador.
- Los valores definitivos se confirman y documentan en `DESIGN.md` (autoridad visual) y se implementan en `app/globals.css`.

### Paleta de colores (modo oscuro, valor histórico)

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

> Los valores actuales de los tres modos (claro, esmeralda y oscuro) están en [DESIGN.md](../../DESIGN.md#paleta-y-sistema-de-3-modos) y en `app/globals.css`; la tabla anterior documenta la dirección original sobre la que se partió.

Reglas de uso:

- El acento esmeralda no supera el 10 % de la superficie visible: guía la mirada, no compite con la foto.
- Las fotos nunca llevan filtro de color; el verde es territorio de la interfaz.
- Contraste mínimo AA (4.5:1) para texto, verificado sobre `bg-canvas` y `bg-surface` en los tres modos de color.

### Tipografía

| Uso | Tipografía | Tratamiento |
| --- | --- | --- |
| Títulos, hero, placas de sala y nombre del sitio | **Syne** (geométrica expresiva, `font-display`) | Tamaño grande, peso 500-600, interletraje ajustado; su forma ancha da presencia a los titulares |
| Texto, interfaz y navegación | **Plus Jakarta Sans** (`font-sans`) | Cuerpo 15-18 px, interlínea holgada |
| Datos, contadores y números de fotograma | **Geist Mono** (`font-mono`) | Versalitas simuladas (`uppercase tracking-wider`), 11-13 px |

Escala tipográfica sugerida: 14 / 16 / 20 / 25 / 32 / 48 / 72 px con `clamp()` para fluido entre móvil y escritorio.

> La fuente de títulos evolucionó Fraunces → Outfit → **Syne**: se buscaba más impacto visual sin perder elegancia, y se cambió *solo* la de títulos para no alterar legibilidad ni contraste del cuerpo. Variables en `app/layout.tsx` (`--font-syne`, `--font-sans`, `--font-mono`).

### Espaciado y layout

- Escala de espaciado por múltiplos de 4: 8, 12, 16, 24, 32, 48, 64, 96.
- Ancho máximo de contenido: 1280 px centrado; el hero y las bandas de categoría son a sangre completa (full-bleed).
- Ritmo vertical entre secciones: 64-96 px en escritorio, 40-56 px en móvil.

### Estructura de la página

1. **Hero**: banda de 60 vh con una foto a pantalla completa (imagen LCP, sin carrusel ni autoplay), velos de degradado arriba y abajo, título conceptual *«Historias & Miradas»* con badge *«Edición Especial · Cumpleaños»* en chip verde sólido legible sobre la foto en los 3 modos y subtítulo de regalo; indicación de scroll con punto pulsante.
2. **Navegación**: cabecera fija mínima con el nombre enlazable y el selector de los 3 modos de color; transparente sobre el hero, con fondo y borde al hacer scroll. Las secciones se abren desde el FAB flotante (`NavSidebar`), no desde la cabecera.
3. **Secciones por categoría**: cada categoría es una banda con título enlazado que termina en **flecha `→`** (señal de que la sección es entrable, con texto equivalente para lectores de pantalla), descripción corta, separador de sala numerado y su rejilla dinámica tipo Pinterest (CSS Columns: 2 columnas hasta 1024 px, 3 en desktop y 4 desde 1280 px) que respeta el aspect ratio natural de las fotos sin cortes forzados.
4. **Lightbox**: overlay negro al 88 %, foto centrada con `object-fit: contain`, título en texto suelto con doble sombra sobre un velo degradado inferior (sin píldora ni borde), contador en la esquina superior izquierda, controles de solo icono, navegación ← → y cierre con Escape o clic en el fondo.
5. **Bio y dedicatoria**: bloque a dos columnas (retrato con marco ornamental esmeralda + tarjeta de dedicatoria de cumpleaños con badge festivo).
6. **Hilo de dedicatorias**: columna única centrada (máx. 672 px) con la cabecera de sala (separador numerado, título en Syne con `→` que enlaza a su página y contador «N dedicatorias») y una tarjeta por mensaje: avatar o inicial en círculo esmeralda, autor, meta en versalitas mono (vínculo · fecha) y el texto en bloque de cita. Un conector vertical fino une los mensajes para que se lea como un hilo de red social.
7. **Página de dedicatorias** (`/dedicatorias`): mismo hilo completo bajo una cabecera con `h1`, contador y descripción, replicando la estructura de las páginas de colección; retorno flotante en la esquina de siempre.
8. **Footer**: crédito y año separados por un punto esmeralda, sobre una línea con degradado.
9. **Retorno persistente**: en las páginas de categoría y de dedicatorias, botón `←` fijo en la esquina inferior derecha (misma coordenada y estilo que el FAB de navegación) que vuelve a la portada anclada a esa sección. Es el **único retorno visible**: el enlace textual «Volver a la portada» de la cabecera quedó `sr-only` y solo aparece al recibir foco de teclado.

### Responsive

| Punto de quiebre | Ancho | Comportamiento |
| --- | --- | --- |
| Móvil | < 1024 px | 2 columnas tipo Pinterest, hero completo, navegación en bottom-sheet y FAB de retorno |
| Desktop | 1024-1279 px | 3 columnas masonry, panel de secciones como popover anclado al FAB |
| Desktop amplio | ≥ 1280 px | 4 columnas masonry, ancho máximo 1280 px |

- El mismo FAB de la esquina inferior derecha sirve en todos los tamaños: abre un bottom-sheet desde abajo en móvil y un popover anclado encima del botón en escritorio.
- El hilo de dedicatorias es de una sola columna en todos los tamaños: en móvil ocupa el ancho con margen de 16 px y en desktop queda centrado, sin llegar al ancho máximo de 1280 px.
- `next/image` entrega el tamaño correcto a cada punto de quiebre vía `sizes`.

### Animación y microinteracciones

- Entrada de tarjetas con CSS puro (`photo-card-in`: fundido + ascenso con retardo escalonado por índice), sin JavaScript en el hilo principal.
- Entrada de cada mensaje del hilo de dedicatorias (`dedication-in`): fundido + ascenso de 16 px, disparado al entrar en el viewport con `animation-timeline: view()` y degradado a animación temporal simple en navegadores sin esa función.
- Despliegue del panel de secciones: slide-up en móvil y escala 0.92 → 1 con origen en la esquina inferior derecha en escritorio (200 ms).
- Hover de miniatura: elevación sutil, zoom del 3 % y velo con título y número de fotograma.
- Transición de lightbox: fundido de 260 ms.
- Todo respeta `prefers-reduced-motion`: regla global que anula animaciones y transiciones si el usuario lo pide.

### Accesibilidad

- `alt` descriptivo en cada foto; texto del hero legible sobre cualquier imagen (velo de degradado).
- Foco visible con anillo `accent` en todos los elementos interactivos.
- Lightbox: foco atrapado, ← → para navegar, Escape para cerrar, foco devuelto al elemento de origen.
- `NavSidebar`: disparador con `aria-expanded`, panel como `role="dialog"`, cierre con Escape y retorno del foco al disparador; los botones flotantes se ocultan mientras el lightbox está abierto.
- Navegación completa sin ratón; objetivos táctiles ≥ 44 px (los FAB miden 48 px y el enlace de cada título de sección mantiene un área de 66 px de alto).
- Las flechas `→` de los títulos son decorativas (`aria-hidden`): el mismo enlace contiene el texto equivalente («Ver la colección» / «Ver todas las dedicatorias») para lectores de pantalla.
- El enlace «Volver a la portada» es `sr-only focus:not-sr-only`: no duplica visualmente el `←` flotante, pero se revela al tabular y se mantiene para buscadores y lectores de pantalla.
- El hilo de dedicatorias es una lista ordenada (`ol`) con semántica de cita (`blockquote`) por mensaje; la inicial decorativa lleva `aria-hidden` y la sección se titula con `aria-labelledby`.

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
| Sistema de 3 modos de color (claro por defecto) | Fondo oscuro único | El regalo se lee igual de día que de noche sin perder la identidad esmeralda |
| Hero estático + secciones masonry | Carrusel de destacados con autoplay | Menos JavaScript, LCP más rápido y sin movimiento no solicitado |
| **Syne** en títulos (antes Fraunces y Outfit) | Serif clásica o sans neutra | Regalo moderno y con carácter de galería: impacto visual sin perder calidez ni legibilidad en el cuerpo |
| Navegación en FAB flotante (`NavSidebar`) | Cabecera con menú de secciones | Acceso persistente al hacer scroll y misma ubicación en móvil y escritorio |
| Dedicatorias como hilo en columna única (estilo red social) | Rejilla de tarjetas o muro de firmas | Los mensajes se leen en orden y con aire; en rejilla el texto se convierte en bloque que compite con la foto |
| Flecha `→` visible en los títulos de sección | Indicador solo al pasar el cursor | La entrada a la colección se anuncia de un vistazo y también en móvil, donde no hay hover |
| Un solo retorno visible (`FloatingBackButton`) + enlace `sr-only` | Enlace «← Volver a la portada» visible | El texto duplicaba el botón flotante; se conserva el valor de SEO y de teclado sin repetir en pantalla |

## Referencias

- [Next.js](../Referencias/Next.js.md)
- [Arquitectura de la galería de fotos](Arquitectura%20de%20la%20galer%C3%ADa%20de%20fotos.md)
- [Guía de uso sin programación](Gu%C3%ADa%20de%20uso%20sin%20programaci%C3%B3n.md)
