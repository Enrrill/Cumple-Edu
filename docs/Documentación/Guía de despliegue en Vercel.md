---
status: borrador
type: documento
tags:
  - galeria
  - despliegue
  - vercel
created: 2026-09-29
area: galeria-fotos
version: 0.1
---

# Guía de despliegue en Vercel

## Resumen

Pasos para publicar la galería de fotos en [Vercel](../Referencias/Vercel.md) y mantenerla actualizada, con verificaciones posteriores y planes alternativos si el sitio crece.

## Contexto

Vercel es la plataforma prevista para alojar la galería: tiene plan gratuito, soporte nativo de Next.js y despliegue automático conectado al repositorio. La arquitectura del sitio se describe en [Arquitectura de la galería de fotos](Arquitectura%20de%20la%20galer%C3%ADa%20de%20fotos.md).

## Contenido

### Requisitos previos

- Una cuenta en GitHub (gratis) con el repositorio del proyecto.
- Una cuenta en Vercel (gratis), que se puede crear con la misma cuenta de GitHub.
- El proyecto compila sin errores en local (`pnpm build`).
- Node.js instalado y `pnpm` disponible (`npm install -g pnpm --prefix ~/.local`).

### Publicación inicial

1. Subir el proyecto a GitHub: `git init`, `git add .`, `git commit -m "versión inicial"`, crear el repositorio y `git push`.
2. Entrar en [vercel.com](https://vercel.com) con la cuenta de GitHub y pulsar **Add New → Project**.
3. Seleccionar el repositorio y pulsar **Import**.
4. Vercel detecta Next.js automáticamente. La configuración por defecto es la correcta:
   - Framework preset: `Next.js`.
   - Build command: `next build`.
   - Output directory: `.next`.
5. Pulsar **Deploy** y esperar al primer build (un par de minutos).

La primera versión queda publicada en una URL temporal tipo `<proyecto>-<usuario>.vercel.app`.

### Configuración recomendada

| Ajuste | Valor | Motivo |
| --- | --- | --- |
| Node.js | Versión estable que use Vercel por defecto | Evita diferencias con local |
| Variables de entorno | Ninguna por ahora | Todo el contenido está en el repositorio |
| `images.remotePatterns` | Solo si se usa [Cloudinary](../Referencias/Cloudinary.md) | Permite servir imágenes remotas |
| Dominio propio | Opcional | Se añade en **Settings → Domains** |
| Protección de contraseña | Opcional | Disponible en planes de pago; útil si el regalo debe ser privado |

### Despliegues siguientes

- Cada `git push` a la rama principal (`main`) genera un despliegue automático.
- Cada rama con `pull request` genera una **preview** con URL propia para revisar antes de fusionar.
- En el panel se puede volver a cualquier versión anterior: **Deployments → Redeploy**, sin pérdida de tiempo.

### Verificación tras desplegar

1. Abrir la URL pública en móvil y escritorio.
2. Comprobar que el carrusel avanza y que el lightbox abre, navega con ← → y cierra con Escape.
3. Revisar que todas las fotos cargan (no hay ninguna rota en la rejilla).
4. Pasar un Lighthouse en Chrome DevTools: rendimiento y accesibilidad ≥ 95.
5. Probar un 404: escribir una ruta inexistente y verificar que aparece la página de "no encontrada".

### Costes y límites

- El plan **Hobby** (gratuito) cubre este proyecto: despliegues ilimitados, ancho de banda suficiente y dominio `.vercel.app`.
- Límite práctico a vigilar: el tamaño del repositorio. GitHub recomienda no superar ~1 GB; conviene mantenerlo por debajo de 500 MB. Si las fotos lo superan, se migran a [Cloudinary](../Referencias/Cloudinary.md) (plan gratuito con límite mensual de transformaciones) sin cambiar el código, solo el campo `src` de `albums.json`.
- Si se necesita dominio propio, el coste es el del dominio (unos 10-15 €/año), no de Vercel.

### Plan alternativo: despliegue en un servidor propio

Solo si fuera necesario (por ejemplo, un backend como FastAPI en el futuro):

- Preparar un `Dockerfile` multi-etapa para Next.js.
- Provisionar un VPS (Hetzner, DigitalOcean) con Docker Compose.
- Servir el `build` estático con Nginx o dejar que Next.js lo sirva con `next start`.

Este plan no se aplica en la versión actual del proyecto (ver [Decisión - galería sin backend](Decisi%C3%B3n%20-%20galer%C3%ADa%20sin%20backend.md)).

### Solución de problemas

| Síntoma | Causa probable | Solución |
| --- | --- | --- |
| El build falla en Vercel pero no en local | Dependencia no declarada o versión de Node distinta | Comparar logs del build y añadir la dependencia a `package.json` |
| Una foto no aparece | Ruta `src` incorrecta en `albums.json` | Verificar que el archivo existe en `public/images/...` con ese nombre |
| Imagen muy pesada | Original de cámara subida sin optimizar | Redimensionar al tamaño de entrega antes de subir |
| La web se ve sin estilos | Build incompleto | Rehacer el despliegue desde el panel de Vercel |

## Decisiones

| Decisión | Alternativa descartada | Motivo |
| --- | --- | --- |
| Vercel como hosting | Netlify, Cloudflare Pages, VPS | Soporte óptimo de Next.js y flujo git automático |
| Despliegue desde `main` | Despliegue manual por FTP | Actualización automática y trazable |
| Plan gratuito | Plan de pago | El proyecto no supera los límites del plan Hobby |

## Referencias

- [Vercel](../Referencias/Vercel.md)
- [Cloudinary](../Referencias/Cloudinary.md)
- [Arquitectura de la galería de fotos](Arquitectura%20de%20la%20galer%C3%ADa%20de%20fotos.md)
- [Guía de uso sin programación](Gu%C3%ADa%20de%20uso%20sin%20programaci%C3%B3n.md)
