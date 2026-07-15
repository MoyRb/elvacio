import { OFFICIAL_EMAIL } from "../config/site";

export function ContactTerminal() {
  return (
    <section className="terminal-section" id="contacto" aria-labelledby="contact-title">
      <p className="section-kicker">Contacto</p>
      <h2 id="contact-title">Terminal de recepción</h2>
      <p>
        Para mensajes, invitaciones o interferencias verificables, escribe a{" "}
        <a href={`mailto:${OFFICIAL_EMAIL}`}>{OFFICIAL_EMAIL}</a>.
      </p>
    </section>
  );
}
