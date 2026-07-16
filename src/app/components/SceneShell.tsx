import Image from "next/image";
import { Suspense } from "react";
import { AmbientAudioControl } from "./AmbientAudioControl";
import { BroadcastStatus } from "./BroadcastStatus";
import { ContactTerminal } from "./ContactTerminal";
import { HostPortal } from "./HostPortal";
import { LatestTransmissionLoading } from "./LatestTransmissionLoading";
import { LatestTransmissionServer } from "./LatestTransmissionServer";
import { SignalBoot } from "./SignalBoot";
import { ANDRES_HOST_ANIMATION, ANDRES_HOST_IMAGE, BRAND_ISOTYPE, BRAND_LOGOTYPE, IVAN_HOST_ANIMATION, IVAN_HOST_IMAGE, REFERENCE_SCENE } from "../config/site";

const navItems = [
  ["Última transmisión", "#ultima-transmision"],
  ["Anfitriones", "#anfitriones"],
  ["Quiénes somos", "#quienes-somos"],
  ["Transmisiones", "#transmisiones"],
  ["Comunidad", "/comunidad"],
  ["Contacto", "#contacto"],
];

export function SceneShell() {
  return (
    <main id="home" className="site-shell">
      <SignalBoot />
      <header className="site-header">
        <a className="brand" href="#home" aria-label="El Vacío FM — inicio">
          <span className="brand-mark-frame" aria-hidden="true">
            <Image
              className="brand-mark"
              src={BRAND_ISOTYPE}
              alt=""
              width={4913}
              height={4068}
              sizes="(max-width: 760px) 54px, (max-width: 1100px) 58px, 64px"
            />
          </span>
          <span className="brand-logotype-frame">
            <Image
              className="brand-logotype"
              src={BRAND_LOGOTYPE}
              alt="ELVACIO.FM"
              width={3000}
              height={3000}
              sizes="(max-width: 430px) 0px, (max-width: 760px) 178px, (max-width: 1100px) 204px, 220px"
            />
          </span>
        </a>
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
            href="https://www.youtube.com/@elvaciofm"
            label="VER TRANSMISIONES"
            description="Canal oficial en YouTube"
            external
            target="_blank"
            rel="noopener noreferrer"
            imageSrc={ANDRES_HOST_IMAGE}
            animationSrc={ANDRES_HOST_ANIMATION}
          />
          <Suspense fallback={<LatestTransmissionLoading />}>
            <LatestTransmissionServer />
          </Suspense>
          <HostPortal
            name="Iván"
            side="right"
            href="/comunidad"
            label="ENTRAR A COMUNIDAD"
            description="Opiniones y sugerencias"
            imageSrc={IVAN_HOST_IMAGE}
            animationSrc={IVAN_HOST_ANIMATION}
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
          <p>La comunidad abre como foro público para opiniones y sugerencias. <a href="/comunidad">Entrar a /comunidad</a>.</p>
        </article>
        <ContactTerminal />
      </section>
    </main>
  );
}
