import Image from "next/image";
import { AmbientAudioControl } from "./AmbientAudioControl";
import { BroadcastStatus } from "./BroadcastStatus";
import { ContactTerminal } from "./ContactTerminal";
import { HostPortal } from "./HostPortal";
import { LatestTransmission } from "./LatestTransmission";
import { SignalBoot } from "./SignalBoot";
import { REFERENCE_SCENE, SITE_NAME } from "../config/site";

const navItems = [
  ["Home", "#home"],
  ["Última transmisión", "#ultima-transmision"],
  ["Anfitriones", "#anfitriones"],
  ["Quiénes somos", "#quienes-somos"],
  ["Transmisiones", "#transmisiones"],
  ["Comunidad", "#comunidad"],
  ["Contacto", "#contacto"],
];

export function SceneShell() {
  return (
    <main id="home" className="site-shell">
      <SignalBoot />
      <header className="site-header">
        <a className="brand" href="#home">{SITE_NAME}</a>
        <nav aria-label="Secciones principales">
          {navItems.map(([label, href]) => (
            <a href={href} key={href}>{label}</a>
          ))}
        </nav>
        <AmbientAudioControl />
      </header>

      <section className="hero-scene" aria-labelledby="site-title">
        <Image className="scene-background" src={REFERENCE_SCENE} alt="Estudio liminal de El Vacío con equipo analógico y señal al aire" fill priority sizes="100vw" />
        <div className="scene-overlay" />
        <BroadcastStatus />
        <div className="hero-copy">
          <p className="section-kicker">Podcast / estación perdida</p>
          <h1 id="site-title">Transmisiones desde El Vacío</h1>
          <p>Andrés e Iván abren una señal entre tecnología analógica, cuartos imposibles y conversaciones que regresan con eco.</p>
        </div>
        <div className="stage-grid" id="anfitriones">
          <HostPortal
            name="Andrés"
            side="left"
            href="#transmisiones"
            label="Entrar a Transmisiones"
            description="Archivo de episodios"
          />
          <LatestTransmission />
          <HostPortal
            name="Iván"
            side="right"
            href="#comunidad"
            label="Entrar a Comunidad"
            description="Foro en preparación"
          />
        </div>
      </section>

      <section className="content-grid" aria-label="Información secundaria">
        <article className="terminal-section" id="quienes-somos">
          <p className="section-kicker">Quiénes somos</p>
          <h2>Una cabina que todavía responde</h2>
          <p>
            El Vacío es un podcast conducido por Andrés e Iván. Esta primera fase conserva la página como una escena: la transmisión al centro, los anfitriones como accesos y la interfaz como equipo recuperado.
          </p>
        </article>
        <article className="terminal-section" id="transmisiones">
          <p className="section-kicker">Transmisiones</p>
          <h2>Archivo de episodios</h2>
          <p>El archivo se conectará cuando existan datos oficiales. Andrés ya funciona como acceso directo a esta sección.</p>
        </article>
        <article className="terminal-section" id="comunidad">
          <p className="section-kicker">Comunidad</p>
          <h2>Foro en preparación</h2>
          <p>La comunidad futura contemplará perfiles, publicaciones, categorías, comentarios, reacciones, sugerencias, moderación, reportes, roles y Row Level Security.</p>
        </article>
        <ContactTerminal />
      </section>
    </main>
  );
}
