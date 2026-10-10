---
status: borrador
type: nota
tags:
  - proyecto
  - galeria
  - cumpleanos
created: 2026-09-29
area: galeria-fotos
---

# Galería de fotos cumpleaños

## Ficha

| Campo | Valor |
| --- | --- |
| Objetivo | Página-galería como regalo de cumpleaños para un fotógrafo |
| Estado | Entrega lista (T5 cerrado); pendiente la edición manual de bio y dedicatoria |
| Stack | Next.js + React + TypeScript + Tailwind CSS |
| Contenido | Fotos estáticas en `public/` + metadatos en `albums.json` + dedicatorias en `dedications.json` |
| Backend y BD | No procede (ver [Decisión - galería sin backend](../Documentaci%C3%B3n/Decisi%C3%B3n%20-%20galer%C3%ADa%20sin%20backend.md)) |
| Diseño | Modo *Experience*, 3 modos de color (esmeralda por defecto, claro y oscuro), hero estático + secciones masonry |
| Despliegue | [Vercel](../Referencias/Vercel.md), plan gratuito |
| Repositorio | [Enrrill/Cumple-Edu](https://github.com/Enrrill/Cumple-Edu) (público: la colaboración en Vercel es gratis en plan Hobby) |

## Plan de trabajo

- [x] Decisiones técnicas (sin BD, Vercel, carrusel + secciones)
- [x] Documentación en Obsidian
- [x] Andamiaje del proyecto (`create-next-app` + dependencias)
- [x] Reparto de tareas entre integrantes ([Plan de equipo - tareas](Plan%20de%20equipo%20-%20tareas.md))
- [x] Contexto de diseño: `impeccable context` → `init` → `shape` (ver [PRODUCT.md](../../PRODUCT.md) y [DESIGN.md](../../DESIGN.md), en la raíz del repo)
- [x] Selección de fotos y categorías (166 fotos reales organizadas en 5 categorías temáticas, `syntheticImages: false` en `albums.json`)
- [x] Componentes: hero, secciones, lightbox, bio, footer (C1-C7, PRs #1-#7, fusionados en `main`)
- [x] Portada ensamblada en `app/page.tsx` con la galería completa (T4, PR #8, verificada en producción)
- [x] Pasadas finales: `polish` y `audit` (T5: detector impeccable sin hallazgos, lint y build OK, `DESIGN.md` re-verificado contra lo construido)
- [x] Repositorio en GitHub y despliegue en Vercel (producción: https://cumple-edu-seven.vercel.app)
- [x] Verificación en producción: Lighthouse 13.5 → 96 desktop, 97 sin simulación y 70 en móvil simulado (accesibilidad, buenas prácticas y SEO: 100 en las tres corridas); inspección visual en desktop y móvil
- [x] Modernización v3: 3 modos de color con `ThemeToggle`, cabecera mínima, `NavSidebar` flotante con scroll-spy, lightbox inmersivo y hero conceptual
- [x] Navegación persistente: panel anclado al FAB en escritorio (`transform-origin: bottom right`) y `FloatingBackButton` «←» en las páginas de categoría, oculto con el lightbox
- [x] Documentación sincronizada (`DESIGN.md`, `PRODUCT.md`, `docs/` y el vault de Obsidian) con el estado v3
- [x] Hilo de dedicatorias: sección nueva tras la bio (`content/dedications.json`, `lib/dedications.ts`, `Dedications.tsx`), entrada en el `NavSidebar` con recuento y guía de uso actualizada
- [x] Segunda tanda de mejoras: flecha `→` en los títulos de sección, retorno único (`FloatingBackButton` + enlace `sr-only`), página propia `/dedicatorias` (hilo completo repetido), tipografía de títulos **Syne** y textos de las 5 colecciones y las 166 fotos reescritos (títulos descriptivos y cercanos, `alt` literal); docs y vault resincronizados
- [x] Tercera tanda de fotos: 33 imágenes que estaban sueltas en `public/images/` clasificadas y numeradas (edu 43-48, amigos 22-35, retratos 14-25, urbano 36) con sus entradas en `albums.json`; sin duplicadas (RMSE sobre miniaturas frente a las 133 publicadas) y dos giradas 90° corregidas antes de entrar; recuentos actualizados en docs y vault
- [x] Tercera tanda de textos y visor: pie del visor sin píldora (velo degradado + doble sombra de texto), badge «Edición Especial · Cumpleaños» en chip verde sólido legible en los 3 modos de color y `title`/`alt` de las 166 fotos reescritos con tono cercano y humor (`alt` sigue exacto por accesibilidad); guía de uso y docs actualizadas; docs y vault resincronizados
- [x] Cuarta tanda de identidad: favicon nuevo de **diafragma de 6 aspas** en esmeralda (`app/icon.svg` + `app/favicon.ico` regenerado + `app/apple-icon.png`), dedicatoria de la bio rediseñada como **bloque editorial sin caja** (sin emojis: filete, etiqueta mono, cita en Syne y firma) y texto de `site.dedication` actualizado; docs y vault resincronizados
- [x] Limpieza previa a la entrega: fuera la prop `sections` sin usar del header, `Album` e `isSyntheticContent()` de `lib/albums.ts`, el flag `syntheticImages` del JSON, los 5 SVGs de plantilla de `public/` y la dependencia `framer-motion`; el nombre del header ahora **vuelve al inicio** (scroll suave en portada, `auto` con `prefers-reduced-motion`, navegación normal desde el resto de rutas); docs y vault resincronizados
- [x] Tema por defecto cambiado a **Esmeralda**: `data-theme` en el layout, script anti-flash de `<head>` y snapshots de `ThemeToggle` (sin elección guardada se abre en verde; la elección previa del visitante se respeta); docs y vault resincronizados
- [x] Arranque **siempre en Esmeralda**: la elección de modo pasa de `localStorage` a `sessionStorage` (dura la sesión; el script anti-flash purga la clave antigua), así ninguna sesión hereda un modo distinto del verde por defecto; docs y vault resincronizados
- [x] Cuarta tanda de fotos: 8 imágenes sueltas en `public/images/` (exportadas de WhatsApp) clasificadas y numeradas (edu 49-53, amigos 36-38) con sus entradas en `albums.json` (títulos con guiño y `alt` exactos sin emojis, `featured: false`); recuentos actualizados a 174 fotos en docs y vault
- [x] Quinta tanda: dedicatorias reales en `dedications.json` (Enrrill, Valeria, Gabo y Gaby; fuera las 5 de ejemplo) con soporte de varios párrafos (`text: string | string[]`, un `<p>` por párrafo) y de imagen adjunta (`image` con `width`/`height` intrínsecos); dos flyers de cumpleaños integrados al final del hilo (Stephany y Xhiara) convertidos a `.webp` en `public/images/dedications/`; docs y vault resincronizados
- [ ] Entrega del regalo: editar bio y dedicatoria a mano en `albums.json` y compartir la URL

## Documentación relacionada

- [Plan de equipo - tareas](Plan%20de%20equipo%20-%20tareas.md)
- [Arquitectura de la galería de fotos](../Documentaci%C3%B3n/Arquitectura%20de%20la%20galer%C3%ADa%20de%20fotos.md)
- [Diseño de la galería de fotos](../Documentaci%C3%B3n/Dise%C3%B1o%20de%20la%20galer%C3%ADa%20de%20fotos.md)
- [Guía de despliegue en Vercel](../Documentaci%C3%B3n/Gu%C3%ADa%20de%20despliegue%20en%20Vercel.md)
- [Guía de uso sin programación](../Documentaci%C3%B3n/Gu%C3%ADa%20de%20uso%20sin%20programaci%C3%B3n.md)

## Notas

- La entrega tiene fecha: el cumpleaños. Priorizar lo esencial (portada, categorías, lightbox) frente a lo opcional (dominio propio, página por categoría).
- Lighthouse: ≥95 se cumple en escritorio y sin simulación; el móvil simulado queda en 70 porque el suelo es la evaluación del runtime React de la portada completa (~2 s de TBT). Si se exige ≥95 también ahí, la mejora es reducir el JavaScript inicial.
- Ya no quedan fotos sueltas en `public/images/`: las 33 de la tercera tanda y las 8 de la cuarta se integraron todas en `albums.json` (174 fotos); la raíz solo contiene las 5 carpetas de categoría.
