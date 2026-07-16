# El Vacío FM

Sitio web oficial del podcast El Vacío: una estación liminal con tecnología analógica, interferencias, transmisión dinámica de YouTube y comunidad pública.

## Stack

- Next.js `16.2.10`
- React `19.2.4`
- TypeScript
- Tailwind CSS
- ESLint

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

## Supabase community forum

The `/comunidad` page is a lightweight public guestbook/forum. Visitors can publish an apodo, a category, and a message without accounts. Supabase is accessed with the public publishable key only; no `service_role` key is used by the app.

To enable it:

1. Create a project in Supabase.
2. Open the SQL Editor.
3. Execute the migration file:

   ```text
   supabase/migrations/001_create_forum_posts.sql
   ```

4. Get the Project URL and Publishable Key from **Connect**.
5. Place them in `.env.local`:

   ```bash
   NEXT_PUBLIC_SUPABASE_URL=
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
   ```

6. Restart the dev server:

   ```bash
   npm run dev
   ```

If Supabase is not configured, the homepage keeps working and `/comunidad` displays `FORO FUERA DE LÍNEA` with the form disabled.

## Security notes

The forum is intentionally minimal for the MVP. Current protections include server-side validation, database constraints, RLS, insert-only public permissions, visible-post-only reads, honeypot rejection, no public UPDATE/DELETE policies, and no rendering of user HTML.

Future work: rate limiting, CAPTCHA, authentication, and advanced moderation.

## Contacto

elvaciofm@gmail.com
