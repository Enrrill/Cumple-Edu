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
| Contenido | Fotos estáticas en `public/` + metadatos en `albums.json` |
| Backend y BD | No procede (ver [Decisión - galería sin backend](../Documentaci%C3%B3n/Decisi%C3%B3n%20-%20galer%C3%ADa%20sin%20backend.md)) |
| Diseño | Modo *Experience*, 3 modos de color (claro por defecto, esmeralda y oscuro), hero estático + secciones masonry |
| Despliegue | [Vercel](../Referencias/Vercel.md), plan gratuito |
| Repositorio | [Enrrill/Cumple-Edu](https://github.com/Enrrill/Cumple-Edu) (público: la colaboración en Vercel es gratis en plan Hobby) |

## Plan de trabajo

- [x] Decisiones técnicas (sin BD, Vercel, carrusel + secciones)
- [x] Documentación en Obsidian
- [x] Andamiaje del proyecto (`create-next-app` + dependencias)
- [x] Reparto de tareas entre integrantes ([Plan de equipo - tareas](Plan%20de%20equipo%20-%20tareas.md))
- [x] Contexto de diseño: `impeccable context` → `init` → `shape` (ver [PRODUCT.md](../../PRODUCT.md) y [DESIGN.md](../../DESIGN.md), en la raíz del repo)
- [x] Selección de fotos y categorías (133 fotos reales organizadas en 5 categorías temáticas, `syntheticImages: false` en `albums.json`)
- [x] Componentes: hero, secciones, lightbox, bio, footer (C1-C7, PRs #1-#7, fusionados en `main`)
- [x] Portada ensamblada en `app/page.tsx` con la galería completa (T4, PR #8, verificada en producción)
- [x] Pasadas finales: `polish` y `audit` (T5: detector impeccable sin hallazgos, lint y build OK, `DESIGN.md` re-verificado contra lo construido)
- [x] Repositorio en GitHub y despliegue en Vercel (producción: https://cumple-edu-seven.vercel.app)
- [x] Verificación en producción: Lighthouse 13.5 → 96 desktop, 97 sin simulación y 70 en móvil simulado (accesibilidad, buenas prácticas y SEO: 100 en las tres corridas); inspección visual en desktop y móvil
- [x] Modernización v3: 3 modos de color con `ThemeToggle`, cabecera mínima, `NavSidebar` flotante con scroll-spy, lightbox inmersivo y hero conceptual
- [x] Navegación persistente: panel anclado al FAB en escritorio (`transform-origin: bottom right`) y `FloatingBackButton` «←» en las páginas de categoría, oculto con el lightbox
- [x] Documentación sincronizada (`DESIGN.md`, `PRODUCT.md`, `docs/` y el vault de Obsidian) con el estado v3
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
- Quedan ~150 fotos sueltas en `public/` (WhatsApp/Instagram) sin referenciar en `albums.json`: decidir si se integran o se excluyen del repositorio.
