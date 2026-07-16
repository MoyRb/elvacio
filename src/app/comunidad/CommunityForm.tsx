"use client";

import { useActionState, useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";
import { submitForumPost, type CommunityFormState } from "./actions";

const initialState: CommunityFormState = { status: "idle", message: "" };

function SubmitButton({ disabled }: { disabled: boolean }) {
  const { pending } = useFormStatus();
  return (
    <button className="community-submit" type="submit" disabled={disabled || pending}>
      {pending ? "ENVIANDO SEÑAL..." : "ENVIAR INTERFERENCIA"}
    </button>
  );
}

export function CommunityForm({ disabled }: { disabled: boolean }) {
  const [state, formAction] = useActionState(submitForumPost, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.status === "success") formRef.current?.reset();
  }, [state.status]);

  return (
    <form ref={formRef} action={formAction} className="community-form" aria-describedby="community-form-status">
      <div className="community-honeypot" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <label htmlFor="nickname">Apodo</label>
      <input id="nickname" name="nickname" type="text" required minLength={2} maxLength={32} autoComplete="nickname" disabled={disabled} />

      <label htmlFor="category">Tipo de transmisión</label>
      <select id="category" name="category" required disabled={disabled} defaultValue="opinion">
        <option value="opinion">Opinión</option>
        <option value="guest_suggestion">Sugerencia de invitado</option>
        <option value="topic_suggestion">Sugerencia de tema</option>
        <option value="other">Otro</option>
      </select>

      <label htmlFor="message">Mensaje</label>
      <textarea id="message" name="message" required minLength={3} maxLength={800} rows={8} autoComplete="off" disabled={disabled} />

      <p id="community-form-status" className={`community-status-message community-status-message--${state.status}`} aria-live="polite">
        {disabled ? "FORO FUERA DE LÍNEA" : state.message}
      </p>

      <SubmitButton disabled={disabled} />
    </form>
  );
}
