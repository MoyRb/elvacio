"use server";

import { revalidatePath } from "next/cache";
import { insertForumPost, isSupabaseConfigured, type ForumCategory } from "@/lib/supabase/public";

export type CommunityFormState = {
  status: "idle" | "success" | "error";
  message: string;
};

const allowedCategories = new Set<ForumCategory>([
  "opinion",
  "guest_suggestion",
  "topic_suggestion",
  "other",
]);

function getValue(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

export async function submitForumPost(
  _previousState: CommunityFormState,
  formData: FormData,
): Promise<CommunityFormState> {
  const website = getValue(formData, "website");
  if (website) {
    return { status: "success", message: "TRANSMISIÓN RECIBIDA" };
  }

  if (!isSupabaseConfigured) {
    return { status: "error", message: "SEÑAL INTERRUMPIDA. INTENTA DE NUEVO." };
  }

  const nickname = getValue(formData, "nickname");
  const category = getValue(formData, "category") as ForumCategory;
  const message = getValue(formData, "message");

  if (
    nickname.length < 2 ||
    nickname.length > 32 ||
    message.length < 3 ||
    message.length > 800 ||
    !allowedCategories.has(category)
  ) {
    return { status: "error", message: "SEÑAL INTERRUMPIDA. INTENTA DE NUEVO." };
  }

  const inserted = await insertForumPost({ nickname, category, message });
  if (!inserted) {
    return { status: "error", message: "SEÑAL INTERRUMPIDA. INTENTA DE NUEVO." };
  }

  revalidatePath("/comunidad");
  return { status: "success", message: "TRANSMISIÓN RECIBIDA" };
}
