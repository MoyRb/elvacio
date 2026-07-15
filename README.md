# El Vacío FM

Sitio web oficial del podcast El Vacío.

El proyecto busca construir una experiencia digital inmersiva basada en
espacios liminales, tecnología analógica, radio, interferencias y ambientes
inspirados en los backrooms.

## Stack inicial

- Next.js
- React
- TypeScript
- Tailwind CSS
- ESLint

## Estado

Proyecto en etapa inicial de definición visual y arquitectura.

## Contacto

elvaciofm@gmail.com
## YouTube configuration

The homepage resolves the latest public upload from the official channel `https://www.youtube.com/@elvaciofm` on the server with YouTube Data API v3. Configure:

```bash
YOUTUBE_API_KEY=
```

Optional fallback, used only if the automatic lookup fails:

```bash
NEXT_PUBLIC_YOUTUBE_FALLBACK_VIDEO_ID=
```

Do not commit real API keys. The embed uses `https://www.youtube-nocookie.com/embed/{videoId}` and does not autoplay.
