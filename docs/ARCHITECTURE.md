# Arquitectura — El Vacío

## Stack actual

- Next.js `16.2.10` con App Router.
- React `19.2.4`.
- TypeScript `5`.
- Tailwind CSS `4`.
- ESLint `9` con `eslint-config-next`.

No se actualizaron dependencias principales en esta fase. Supabase se consume directamente vía REST con `fetch` por limitación del registro npm en el entorno.

## Estructura implementada

```text
src/app/
  comunidad/
    actions.ts
    CommunityForm.tsx
    page.tsx
  config/site.ts
  components/
    AmbientAudioControl.tsx
    BroadcastStatus.tsx
    ContactTerminal.tsx
    HostPortal.tsx
    LatestTransmission.tsx
    SceneShell.tsx
    SignalBoot.tsx
  globals.css
  layout.tsx
  page.tsx
src/lib/
  supabase/public.ts
supabase/migrations/
  001_create_forum_posts.sql
```

## Responsabilidades

- `SceneShell`: composición principal, navegación, escena responsiva y secciones secundarias. Andrés abre `https://www.youtube.com/@elvaciofm` en pestaña nueva; Iván y el menú Comunidad navegan a `/comunidad`.
- `HostPortal`: soporta enlaces internos con `next/link` y enlaces externos con `target`/`rel` sin renderizar `target="_blank"` en internos.
- `LatestTransmissionServer`: resuelve en servidor el último video público de `@elvaciofm` mediante YouTube Data API; la API key no llega al cliente.
- `AmbientAudioControl`: control visible OFF/ON, sin autoplay, preferencia por sesión y pausa al reproducir el video.
- `src/lib/supabase/public.ts`: detecta variables faltantes, no rompe la app, usa sólo la publishable key y no contiene `service_role`.
- `/comunidad`: Server Component que lee hasta 100 publicaciones visibles y renderiza un foro/guestbook de estética portal 2000.
- `actions.ts`: Server Action que valida apodo, categoría, mensaje y honeypot; inserta sólo `nickname`, `category` y `message`; revalida `/comunidad`.

## Supabase y RLS

La tabla `public.forum_posts` contiene `id`, `nickname`, `category`, `message`, `is_visible` y `created_at`. RLS está habilitado. Los visitantes anónimos y autenticados pueden leer sólo publicaciones visibles e insertar publicaciones válidas. No existen políticas públicas de UPDATE o DELETE; la moderación inicial se realiza manualmente cambiando `is_visible` a `false` desde Supabase.

## Degradación sin Supabase

Si faltan `NEXT_PUBLIC_SUPABASE_URL` o `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`, la homepage sigue funcionando y `/comunidad` muestra `FORO FUERA DE LÍNEA`, deshabilita el formulario y ofrece volver al Home.

## Seguridad pendiente

Este MVP no sustituye un sistema profesional antispam. Queda pendiente implementar rate limiting, CAPTCHA, autenticación y moderación avanzada.
