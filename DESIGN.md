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
- Sin degradados gratuitos: campos planos (disciplina donada por el reto Du Bois).

## Tipografía

| Uso | Fuente | Utilidad | Tratamiento |
| --- | --- | --- | --- |
| Títulos, nombre del fotógrafo, placas de sala | **Fraunces** (serif con carácter) | `font-display` | Tamaño grande, `tracking-tight`, peso 400-600 |
| Texto, navegación, pies | **Geist Sans** | `font-sans` (por defecto) | Cuerpo 16-18 px, interlínea 1.6 |
| Números de fotograma, contador del lightbox, metadatos | **Geist Mono** | `font-mono` | Versalitas simuladas (`uppercase tracking-wider`), 12-14 px |

- Motivo de Fraunces: serif óptico impreso con personalidad (mundo del catálogo fotográfico),
  evita el didone genérico de los portafolios de foto; era una de las sugerencias propias del proyecto.
- Escala: **14 / 16 / 20 / 25 / 32 / 48 / 72 px** con `clamp()` para fluir entre móvil y escritorio.
- El número de fotograma siempre va en mono: `01`, `02`… precedido del prefijo de categoría (`RT-04`).

## Espaciado y layout

- Escala por múltiplos de 4: **8, 12, 16, 24, 32, 48, 64, 96**.
- Ancho máximo de contenido: **1280 px** centrado; hero, bandas y carrusel a sangre (full-bleed).
- Ritmo vertical entre bandas: 64-96 px en escritorio, 40-56 px en móvil; más aire arriba de un título que debajo.
- Breakpoints: `< 640` 1 columna · `640-1024` 2 columnas · `> 1024` 3-4 columnas.

## Lenguaje de componentes (hoja de contactos)

- **Cabecera fija** (`SiteHeader`) y **pie** (`SiteFooter`): viven en `app/layout.tsx`,
  acompañan a **todas las rutas** (portada, categoría y 404). Nombre en Fraunces a la
  izquierda; anclas por categoría a la derecha con `/#sección` (vuelven a la portada y
  hacen scroll). Transparente sobre el hero, sólida al hacer scroll (0-120 px).
- **Fotograma** (`PhotoCard`): imagen respetando su aspect ratio nativo, marco fino `border-line`
  como el borde de la tira, número en mono abajo a la izquierda. Hover: elevación sutil +
  zoom 2-3 % + atenuación de los fotogramas hermanos (`opacity` reducida en el grupo).
  La rejilla usa `items-start`: las tiras se alinean arriba y los apaisados no flotan
  en medio de filas de retratos.
- **Selección**: las destacadas llevan una **marca esmeralda** (círculo/llave `accent`) en una
  esquina — es la misma marca que se amplía en el hero. Nunca sobre la cara del sujeto.
- **Banda de categoría** (`CategorySection`): placa de entrada con título serif grande +
  descripción corta + contador en mono (`24 fotos`), seguida de la rejilla.
- **Hero** (`HeroCarousel`): 100 vh, foto a sangre, velos de degradado solo donde va el texto
  (cabecera arriba, contador e indicación de scroll abajo), nombre en Fraunces,
  `01 / 05` en mono. Autoplay 5-6 s, pausable.
- **Lightbox** (`Lightbox`): fondo `bg-elevated` con opacidad alta, `object-fit: contain`,
  título + contador mono, ← → y Escape, foco atrapado y devuelto al origen.
- **Bio**: dos columnas (retrato + texto), la dedicatoria en serif; **footer**: colofón discreto.

## Movimiento

- Entradas de placa de sección en **CSS puro** (fundido + 20 px, una sola vez, con
  `animation-timeline: view()` como progressive enhancement y parada en
  `prefers-reduced-motion`): la sección queda Server Component y framer-motion
  no entra en el bundle.
- Fundidos del carrusel con ritmo de difusión de tinta (lento, 700-900 ms), nunca mecánicos.
- Transición del lightbox: fundido 200-250 ms.
- Todo respeta `prefers-reduced-motion`: sin autoplay ni desplazamientos (regla global ya en `globals.css`).

## Accesibilidad (no negociable)

- `alt` descriptivo en cada foto; texto del hero legible sobre cualquier imagen (velo).
- Foco visible con anillo `accent` en todo lo interactivo (regla global en `globals.css`).
- Lightbox: ← → navega, Escape cierra, foco atrapado y devuelto.
- Navegación completa sin ratón; objetivos táctiles ≥ 44 px; contraste AA verificado.

## Rendimiento (antimeta «que vaya lento»)

- 54 fotos reales: `next/image` con `sizes` correcto, `loading="lazy"` por defecto,
  carga prioritaria solo en la primera del carrusel.
- Lightbox importado con `next/dynamic` (`ssr: false`).
- Objetivo: **Lighthouse ≥ 95** en rendimiento sobre el despliegue real.
- Resultado (05-10-2026, Lighthouse 13.5 sobre producción): **96 desktop,
  97 sin simulación, 70 en móvil simulado** (accesibilidad, buenas
  prácticas y SEO: 100 en las tres corridas). ≥95 se cumple sin
  simulación y en escritorio; en móvil simulado el suelo es la
  evaluación del runtime React de la portada completa (~2 s de TBT).

## Decisiones resueltas (antes «pendientes»)

- Nombre real del fotógrafo: **Eduardo** → metadatos (`Eduardo · Galería de fotos de
  cumpleaños`), cabecera, crédito y dedicatoria.
- Fotos reales: 54 en 5 categorías (`syntheticImages: false`).
- Bio y dedicatoria: **texto de ejemplo** en `content/albums.json`, a la espera de la
  edición manual del mantenedor.
