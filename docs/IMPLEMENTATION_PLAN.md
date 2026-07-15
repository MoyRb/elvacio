# Plan de implementación — El Vacío

## Fase 1 — Escena oficial inicial

Completada: escena principal con Andrés, transmisión central, Iván, branding, contacto, control de ambiente sin autoplay, responsividad y `prefers-reduced-motion`.

## Fase 2 — Assets oficiales de anfitriones

Completada: se conservan los assets oficiales de Andrés e Iván sin placeholders, imágenes externas ni sustituciones.

## Fase 3 — Transmisiones dinámicas

Completada: la homepage obtiene el último video público de `@elvaciofm` desde YouTube Data API en servidor. Andrés abre el canal oficial `https://www.youtube.com/@elvaciofm` en una pestaña nueva.

## Fase 4 — Comunidad MVP

Completada: `/comunidad` funciona como foro público ligero tipo guestbook con estética de portal web de principios de los 2000.

### Alcance implementado

- Navegación interna a `/comunidad` desde Iván, el menú principal y la preview de Comunidad.
- Formulario con apodo, tipo de transmisión, mensaje y honeypot `website`.
- Validación en frontend, Server Action y base de datos.
- Lectura de publicaciones visibles desde Server Component.
- Inserción pública sin cuentas usando Supabase y RLS.
- Estado offline cuando Supabase no está configurado.
- Migración versionada `supabase/migrations/001_create_forum_posts.sql`.

### Criterios de aceptación

- RLS activa antes de exponer datos.
- Sin `service_role`, claves reales ni credenciales ficticias.
- Sin UPDATE ni DELETE públicos.
- Sin HTML de usuario ni `dangerouslySetInnerHTML`.
- Pendientes documentados: rate limiting, CAPTCHA, autenticación y moderación avanzada.

## Fase 5 — Audio e inmersión avanzada

Pendiente: integrar archivo oficial de ambiente aprobado y afinar mezcla/transiciones sin autoplay ni degradar rendimiento.
