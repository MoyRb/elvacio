export type ForumPost = {
  id: number;
  nickname: string;
  category: ForumCategory;
  message: string;
  created_at: string;
};

export type ForumCategory = "opinion" | "guest_suggestion" | "topic_suggestion" | "other";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() ?? "";
const supabasePublishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY?.trim() ?? "";

export const isSupabaseConfigured = Boolean(supabaseUrl && supabasePublishableKey);

function getSupabaseHeaders(prefer?: string) {
  return {
    apikey: supabasePublishableKey,
    Authorization: `Bearer ${supabasePublishableKey}`,
    "Content-Type": "application/json",
    ...(prefer ? { Prefer: prefer } : {}),
  };
}

function getRestUrl(path: string) {
  return `${supabaseUrl.replace(/\/$/, "")}/rest/v1/${path}`;
}

export async function fetchVisibleForumPosts(): Promise<{ posts: ForumPost[]; error: boolean }> {
  if (!isSupabaseConfigured) return { posts: [], error: false };

  const query = new URLSearchParams({
    select: "id,nickname,category,message,created_at",
    is_visible: "eq.true",
    order: "created_at.desc",
    limit: "100",
  });

  try {
    const response = await fetch(getRestUrl(`forum_posts?${query.toString()}`), {
      headers: getSupabaseHeaders(),
      next: { tags: ["forum-posts"] },
    });

    if (!response.ok) return { posts: [], error: true };
    const posts = (await response.json()) as ForumPost[];
    return { posts, error: false };
  } catch {
    return { posts: [], error: true };
  }
}

export async function insertForumPost(input: {
  nickname: string;
  category: ForumCategory;
  message: string;
}): Promise<boolean> {
  if (!isSupabaseConfigured) return false;

  try {
    const response = await fetch(getRestUrl("forum_posts"), {
      method: "POST",
      headers: getSupabaseHeaders("return=minimal"),
      body: JSON.stringify(input),
    });

    return response.ok;
  } catch {
    return false;
  }
}
