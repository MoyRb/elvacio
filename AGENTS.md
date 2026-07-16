<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# El Vacío project rules

- Preserve the official visual universe: liminal spaces, backrooms, abandoned radio stations, analog technology, CRT screens, consoles, microphones, turntables, interference, low-poly graphics, early-2000s portals.
- Do not make the site look like a corporate landing page, SaaS template, minimalist portfolio, or generic podcast page.
- Do not generate new images for the brand experience.
- Do not replace official assets with placeholders, stock photos, generated illustrations, or external images.
- Keep the latest YouTube transmission configurable. Do not invent a YouTube URL or ID.
- Ambient audio must never autoplay. Keep the control visible and session-scoped.
- Future community architecture should consider Supabase Auth, profiles, posts, categories, comments/replies, reactions, suggestions, moderation, reports, roles, admin, and Row Level Security, but do not add credentials or fake keys.
- Respect `prefers-reduced-motion` for all animations.
- Avoid generic purple-blue gradients, glassmorphism, SaaS cards, soft corporate shadows, unjustified pill buttons, generic abstract backgrounds, excessive neon, and emoji iconography.

# Homepage scene requirements

- Andrés and Iván are mandatory official homepage assets and must remain visually present in the scene.
- Andrés opens the official YouTube channel in a new tab; Iván links internally to `/comunidad`.
- Never regenerate, replace, trace, or substitute the host characters with placeholders, stock images, silhouettes, avatars, icons, or external photographs.
- The central content must use the latest public video from `@elvaciofm` through a server-side YouTube Data API integration.
- The YouTube API key must never be exposed to browser/client bundles.
- Video and ambient audio must never autoplay.
- The homepage is designed as an atmospheric scene, not a traditional landing page.


# Official host media

- `/public/assets/host/andres.png` and `/public/assets/host/ivan.png` are the official static PNG states for Andrés and Iván.
- `/public/assets/host/andres-giro.gif` and `/public/assets/host/ivan-giro.gif` are the official animated GIF states for Andrés and Iván.
- Never regenerate, substitute, trace, convert, edit, or replace the official host PNG or GIF files.
- Andrés continues to link to the official YouTube channel in a new tab: `https://www.youtube.com/@elvaciofm`.
- Iván continues to link internally to `/comunidad`.
- Host GIFs play only on hover or keyboard focus; there is no autoplay.
- `prefers-reduced-motion: reduce` uses only the static PNG states.
- On touch devices, the first tap must always navigate and must not be consumed by animation.

# Comunidad MVP

- `/comunidad` is a public Supabase-backed guestbook/forum with no accounts in this phase.
- Use only `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`; never add or use `service_role`.
- Public visitors may only read visible posts and insert valid posts through RLS. Do not add public UPDATE or DELETE policies.
- Keep future hardening documented: rate limiting, CAPTCHA, authentication, and advanced moderation.
