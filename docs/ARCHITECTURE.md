# Arquitectura — El Vacío

## Stack actual

- Next.js `16.2.10` con App Router.
- React `19.2.4`.
- TypeScript `5`.
- Tailwind CSS `4`.
- ESLint `9` con `eslint-config-next`.

No se actualizaron dependencias principales en esta fase.

## Estructura implementada

```text
src/app/
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
```

## Responsabilidades

- `site.ts`: constantes públicas del sitio, correo, rutas de recursos, configuración pendiente del video y audio.
- `SceneShell`: composición principal, navegación, escena responsiva y secciones secundarias.
- Tipografías: tokens preparados para Michroma, Oxanium, Orbitron y Coda. En esta fase quedan como pila CSS/fallback porque `next/font/google` no pudo compilar en el entorno al no alcanzar Google Fonts durante `next build`.
- `SignalBoot`: encendido inicial tipo CRT sin bloquear accesibilidad.
- `AmbientAudioControl`: control visible OFF/ON, sin autoplay, preferencia por sesión y pausa al reproducir el video.
- `HostPortal`: accesos laterales de Andrés e Iván.
- `LatestTransmission`: embed configurable de YouTube con estado seguro mientras falta el ID/URL oficial.
- `BroadcastStatus`: indicador técnico de transmisión.
- `ContactTerminal`: contacto oficial.

## Configuración pendiente

- `LATEST_YOUTUBE_VIDEO_ID` o `LATEST_YOUTUBE_URL` debe llenarse en `src/app/config/site.ts` cuando exista el video oficial.
- `AMBIENT_AUDIO_SRC` apunta a `/assets/audio/el-vacio-ambiente.mp3`. Ese archivo aún no existe y debe colocarse allí cuando esté aprobado.

## Comunidad futura

La sección Comunidad es un acceso arquitectónico, no una implementación funcional. La fase futura debe contemplar:

- Supabase Auth;
- perfiles;
- publicaciones;
- categorías;
- comentarios y respuestas;
- votos o reacciones;
- sugerencias de invitados y temas;
- moderación y reportes;
- roles de usuario y administrador;
- Row Level Security.

No hay credenciales, claves ficticias ni integración externa en esta fase.
