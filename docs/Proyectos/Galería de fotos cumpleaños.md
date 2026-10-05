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
| Estado | En construcción (portada integrada; faltan pasadas finales) |
| Stack | Next.js + React + TypeScript + Tailwind CSS |
| Contenido | Fotos estáticas en `public/` + metadatos en `albums.json` |
| Backend y BD | No procede (ver [Decisión - galería sin backend](../Documentaci%C3%B3n/Decisi%C3%B3n%20-%20galer%C3%ADa%20sin%20backend.md)) |
| Diseño | Modo *Experience*, paleta verde, carrusel + secciones |
| Despliegue | [Vercel](../Referencias/Vercel.md), plan gratuito |
| Repositorio | [Enrrill/Cumple-Edu](https://github.com/Enrrill/Cumple-Edu) (público: la colaboración en Vercel es gratis en plan Hobby) |

## Plan de trabajo

- [x] Decisiones técnicas (sin BD, Vercel, carrusel + secciones)
- [x] Documentación en Obsidian
- [x] Andamiaje del proyecto (`create-next-app` + dependencias)
- [x] Reparto de tareas entre integrantes ([Plan de equipo - tareas](Plan%20de%20equipo%20-%20tareas.md))
- [x] Contexto de diseño: `impeccable context` → `init` → `shape` (ver [PRODUCT.md](../../PRODUCT.md) y [DESIGN.md](../../DESIGN.md))
- [x] Selección de fotos y categorías (54 fotos reales organizadas en 5 categorías temáticas, `syntheticImages: false` en `albums.json`)
- [x] Componentes: hero con carrusel, secciones, lightbox, bio, footer (C1-C7, PRs #1-#7, fusionados en `main`)
- [x] Portada ensamblada en `app/page.tsx` con `HomeGallery` (T4, PR #8, verificada en producción)
- [ ] Pasadas finales: `polish` y `audit`
- [x] Repositorio en GitHub y despliegue en Vercel (producción: https://cumple-edu-seven.vercel.app)
- [ ] Verificación en producción y entrega del regalo

## Documentación relacionada

- [Plan de equipo - tareas](Plan%20de%20equipo%20-%20tareas.md)
- [Arquitectura de la galería de fotos](../Documentaci%C3%B3n/Arquitectura%20de%20la%20galer%C3%ADa%20de%20fotos.md)
- [Diseño de la galería de fotos](../Documentaci%C3%B3n/Dise%C3%B1o%20de%20la%20galer%C3%ADa%20de%20fotos.md)
- [Guía de despliegue en Vercel](../Documentaci%C3%B3n/Gu%C3%ADa%20de%20despliegue%20en%20Vercel.md)
- [Guía de uso sin programación](../Documentaci%C3%B3n/Gu%C3%ADa%20de%20uso%20sin%20programaci%C3%B3n.md)

## Notas

- La entrega tiene fecha: el cumpleaños. Priorizar lo esencial (portada, categorías, lightbox) frente a lo opcional (dominio propio, página por categoría).
