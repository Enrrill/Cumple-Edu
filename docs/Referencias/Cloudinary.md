---
status: borrador
type: nota
tags:
  - referencia
  - imagenes
created: 2026-09-29
area: galeria-fotos
---

# Cloudinary

## Qué es

Servicio en la nube para almacenar y entregar imágenes (y vídeo). Guarda los archivos originales y devuelve, al vuelo, versiones optimizadas en el formato y tamaño que pide cada visita.

## Para qué sirve en este proyecto

- Es el plan previsto para cuando las fotos pesen demasiado para vivir en el repositorio (más de unos 100 MB).
- Tiene plan gratuito con límite mensual de transformaciones, suficiente para una galería personal.
- La migración no cambia el código: solo el campo `src` de `albums.json` pasa de una ruta local a una URL de Cloudinary.
- Requiere declarar el dominio permitido en `images.remotePatterns` dentro de `next.config.ts`.

## Alternativas

Amazon S3, Supabase Storage o un bucket de Cloudflare R2. Cloudinary se elige por su capa de optimización de imágenes compatible con `next/image`.

## Enlaces

- [Cloudinary](https://cloudinary.com)

## Notas relacionadas

- [Arquitectura de la galería de fotos](../Documentaci%C3%B3n/Arquitectura%20de%20la%20galer%C3%ADa%20de%20fotos.md)
- [Guía de despliegue en Vercel](../Documentaci%C3%B3n/Gu%C3%ADa%20de%20despliegue%20en%20Vercel.md)
