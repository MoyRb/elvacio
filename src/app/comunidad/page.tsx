import Link from "next/link";
import { CommunityForm } from "./CommunityForm";
import { fetchVisibleForumPosts, isSupabaseConfigured, type ForumCategory, type ForumPost } from "@/lib/supabase/public";

export const metadata = {
  title: "Comunidad — El Vacío",
  description: "Voces del Vacío: foro público de opiniones y sugerencias de El Vacío.",
};

const categoryLabels: Record<ForumCategory, string> = {
  opinion: "OPINIÓN",
  guest_suggestion: "SUGERENCIA DE INVITADO",
  topic_suggestion: "SUGERENCIA DE TEMA",
  other: "OTRO",
};

function formatTransmissionId(id: number) {
  return `#${String(id).padStart(3, "0")}`;
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("es-MX", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "America/Mexico_City",
  }).format(new Date(value)).replace(".", "").toUpperCase();
}

function ForumPostCard({ post }: { post: ForumPost }) {
  return (
    <article className="forum-post">
      <header className="forum-post-header">
        <span>TRANSMISIÓN {formatTransmissionId(post.id)}</span>
        <span>{categoryLabels[post.category] ?? "OTRO"}</span>
      </header>
      <div className="forum-post-meta">
        <strong>{post.nickname}</strong>
        <time dateTime={post.created_at}>{formatDate(post.created_at)}</time>
      </div>
      <p>{post.message}</p>
    </article>
  );
}

export default async function ComunidadPage() {
  const { posts, error } = await fetchVisibleForumPosts();
  const offline = !isSupabaseConfigured;

  return (
    <main className="community-page">
      <div className="community-noise" aria-hidden="true" />
      <header className="community-header">
        <Link href="/" className="community-back">VOLVER A LA ESTACIÓN</Link>
        <p className="section-kicker">El Vacío FM</p>
        <h1>COMUNIDAD</h1>
        <p className="community-subtitle">VOCES DEL VACÍO</p>
        <div className="community-connection" data-online={!offline && !error}>
          <span aria-hidden="true" />
          {!offline && !error ? "CONEXIÓN ABIERTA" : "FORO FUERA DE LÍNEA"}
        </div>
        <div className="community-ticker" aria-label="Recibiendo interferencias opiniones invitados temas">
          <span>RECIBIENDO INTERFERENCIAS / OPINIONES / INVITADOS / TEMAS</span>
        </div>
      </header>

      {offline ? (
        <section className="community-offline" aria-labelledby="offline-title">
          <h2 id="offline-title">FORO FUERA DE LÍNEA</h2>
          <p>Configura Supabase para abrir la recepción de mensajes. La estación principal continúa operando.</p>
          <Link href="/">VOLVER AL HOME</Link>
        </section>
      ) : null}

      <section className="community-grid" aria-label="Foro público">
        <section className="community-terminal" aria-labelledby="form-title">
          <h2 id="form-title">NUEVA INTERFERENCIA</h2>
          <p>Publica sin registrarte. No compartas datos personales. Control básico pendiente: rate limiting, CAPTCHA, autenticación y moderación avanzada.</p>
          <CommunityForm disabled={offline} />
        </section>

        <section className="forum-list" aria-labelledby="posts-title">
          <h2 id="posts-title">REGISTRO PÚBLICO</h2>
          {error ? <p className="forum-empty">SEÑAL INTERRUMPIDA. INTENTA DE NUEVO.</p> : null}
          {!error && posts.length === 0 ? <p className="forum-empty">AÚN NO HAY INTERFERENCIAS VISIBLES.</p> : null}
          {posts.map((post) => <ForumPostCard post={post} key={post.id} />)}
        </section>
      </section>
    </main>
  );
}
