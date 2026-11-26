# Security Summary

Se completó una auditoría técnica integral de arquitectura, responsive, SEO/indexabilidad y seguridad defensiva sobre la aplicación Next.js de **CleyLawyerLegal**, aplicando únicamente correcciones localizadas y preservando íntegros el diseño, textos, colores, fotografías, video HERO y rutas aprobadas.

- **Protección contra exposición de archivos internos (`/assets/aistudio/*.txt`)**: Se detectó que los archivos `.txt` adjuntos de especificaciones internas dentro de `/public/assets/aistudio/` eran accesibles públicamente por HTTP (`200 OK`). Se configuró `middleware.ts` (con `noindex, nofollow` y `no-store`) y `public/_redirects` para bloquear cualquier acceso público con `404`, manteniendo accesibles únicamente las imágenes legítimas de marca e ilustración.
- **Política de Seguridad de Contenidos (`Content-Security-Policy`) y protección contra clickjacking**: Se incorporó `Content-Security-Policy` en `next.config.ts` con `default-src 'self'`, `object-src 'none'`, `base-uri 'self'`, `form-action 'self'` y `frame-ancestors` restringido a origen propio y los dominios de vista previa de Google AI Studio (y en producción sin `'unsafe-eval'`). También se añadió `images.qualities: [75, 100]` para eliminar la advertencia de calidad en Next.js.
- **Endurecimiento del endpoint `/api/indexnow`**: Se reemplazó la comparación directa de longitud de secreto por comparación en tiempo constante mediante resúmenes SHA-256 (`crypto.timingSafeEqual`), se limitó el tamaño máximo de cuerpo (`64 KB`, HTTP `413`), se agregó poda acotada del limitador de solicitudes (`max 1000` claves, ventana de `60s`), tiempo de espera máximo de `8s` en `fetch` saliente (`AbortSignal.timeout`) y mensajes de error sanitizados sin reflejar respuestas crudas de terceros.
- **Serialización segura de datos estructurados JSON-LD**: Se implementó `serializeJsonLd()` en `lib/seo-config.ts` para escapar caracteres `<`, `>` y `&` en todas las etiquetas `<script type="application/ld+json">` del sitio, previniendo rupturas de bloque `<script>`.
- **Higiene de HTML semántico y rastreo**: Se eliminó el `<li>` vacío en el bloque de cumplimiento del footer cuando la analítica opcional no está configurada, y se sincronizó `/llms.txt` con `/marco-de-proteccion-profesional`.
- **Dependencias (`bun audit`)**: La auditoría reportó avisos en dependencias transitivas (`postcss@8.4.31` empaquetado internamente por `next@15.5.29`, `@tailwindcss/typography`, `eslint` y la herramienta de desarrollo `firebase-tools`). No se realizaron actualizaciones forzadas incompatibles para evitar regresiones en `next` o Tailwind CSS v4.

## PoC Verification

- **Bloqueo de archivos internos `.txt` en `/assets/aistudio/`**:
  - Antes del cambio: `GET /assets/aistudio/Prompt_Maestro_Auditoria_CleyLawyerLegal_0f642c8e.txt` devolvía `200 OK`.
  - Después del cambio: `GET /assets/aistudio/Prompt_Maestro_Auditoria_CleyLawyerLegal_0f642c8e.txt` y `GET /assets/aistudio/Prompt_Maestro_CleyLawyerLegal__1__47348d58.txt` devolvieron `404` con cabeceras `X-Robots-Tag: noindex, nofollow` y `Cache-Control: no-store`, mientras que `/assets/aistudio/cleylawyerlegal-isotipo-transparente_1__fa77ffc5.png` e `/assets/aistudio/ilustracion-sobre-mi_da2bed1f.webp` mantuvieron `200 OK`.
- **Limitación de tasa en `/api/indexnow`**:
  - Al enviar 11 solicitudes `POST` consecutivas desde la misma IP simulada, las 10 primeras respondieron `503` (secreto administrativo no configurado) y la solicitud número 11 respondió `429` (`Retry-After`), comprobando la protección contra abuso automatizado.
- **Escape de JSON-LD (`serializeJsonLd`)**:
  - Probado mediante prueba unitaria automatizada con carga `</script><script>alert("x")</script>&ok`, comprobando ausencia total de `<`, `>` y `&` literales en la salida serializada y parseo JSON intacto.
