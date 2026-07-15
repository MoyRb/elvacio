# Plan de implementación — El Vacío

## Fase 1 — Escena oficial inicial

### Alcance

- Auditoría del repositorio y assets disponibles.
- Reglas permanentes en `AGENTS.md`.
- Documentación de dirección visual y arquitectura.
- Sistema tipográfico con `next/font`.
- Tokens visuales globales.
- Componentes base de homepage.
- Escena principal funcional con Andrés izquierda, transmisión al centro e Iván derecha.
- Embed YouTube configurable sin inventar URL.
- Accesos a Transmisiones y Comunidad.
- Control de audio ambiental sin autoplay.
- Responsividad inicial.
- `prefers-reduced-motion`.
- Metadatos básicos y correo oficial.

### Criterios de aceptación

- `npm run lint` pasa.
- `npx tsc --noEmit` pasa.
- `npm run build` pasa.
- La página carga en 1440×900, 1024×768 y 390×844 sin overflow horizontal.
- No hay autoplay de audio.
- El control de ambiente es visible y recuerda preferencia en `sessionStorage`.
- El video principal reduce o pausa el ambiente cuando el usuario inicia reproducción.
- Navegación por teclado alcanza menú, accesos de anfitriones, video/contacto y control de ambiente.
- `prefers-reduced-motion` reduce animaciones y transiciones.

## Fase 2 — Assets oficiales de anfitriones

### Alcance

- Agregar imágenes oficiales de cuerpo completo para Andrés e Iván en `/public/assets/hosts`.
- Ajustar recortes, parallax y estados hover alrededor de los archivos definitivos.

### Criterios de aceptación

- No se usan placeholders ni imágenes externas.
- Las imágenes no se deforman en escritorio, tableta ni móvil.
- Los accesos siguen siendo usables con teclado y tacto.

## Fase 3 — Transmisiones

### Alcance

- Archivo visible de episodios bajo la sección **Transmisiones**.
- Modelo de datos estático o CMS futuro sin inventar episodios.

### Criterios de aceptación

- Los episodios reales se listan con fuente verificable.
- La UI mantiene el lenguaje de terminal/radio sin volverse SaaS.

## Fase 4 — Comunidad

### Alcance

- Diseño técnico de Supabase Auth, perfiles, publicaciones, categorías, comentarios, reacciones, reportes, roles y RLS.
- Implementación progresiva de foro.

### Criterios de aceptación

- RLS activa antes de exponer datos de usuario.
- Sin claves públicas falsas ni secretos en repositorio.
- Moderación contemplada desde el esquema inicial.

## Fase 5 — Audio e inmersión avanzada

### Alcance

- Integrar archivo oficial de ambiente.
- Afinar mezcla con el embed principal.
- Añadir transiciones de pérdida/recuperación de señal si no degradan rendimiento.

### Criterios de aceptación

- Nunca hay autoplay.
- No se reproducen dos fuentes sonoras simultáneamente.
- La experiencia reducida por movimiento sigue estable.
