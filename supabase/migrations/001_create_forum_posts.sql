create table if not exists public.forum_posts (
  id bigint generated always as identity primary key,
  nickname varchar(32) not null,
  category text not null,
  message varchar(800) not null,
  is_visible boolean not null default true,
  created_at timestamptz not null default now(),

  constraint forum_posts_nickname_length
    check (char_length(trim(nickname)) between 2 and 32),

  constraint forum_posts_message_length
    check (char_length(trim(message)) between 3 and 800),

  constraint forum_posts_category_check
    check (
      category in (
        'opinion',
        'guest_suggestion',
        'topic_suggestion',
        'other'
      )
    )
);

create index if not exists forum_posts_created_at_idx
  on public.forum_posts (created_at desc);

alter table public.forum_posts enable row level security;

revoke all on public.forum_posts from anon, authenticated;

grant select on public.forum_posts to anon, authenticated;

grant insert (nickname, category, message)
  on public.forum_posts
  to anon, authenticated;

grant usage, select
  on sequence public.forum_posts_id_seq
  to anon, authenticated;

drop policy if exists "public can read visible forum posts"
  on public.forum_posts;

create policy "public can read visible forum posts"
  on public.forum_posts
  for select
  to anon, authenticated
  using (is_visible = true);

drop policy if exists "public can submit valid forum posts"
  on public.forum_posts;

create policy "public can submit valid forum posts"
  on public.forum_posts
  for insert
  to anon, authenticated
  with check (
    is_visible = true
    and char_length(trim(nickname)) between 2 and 32
    and char_length(trim(message)) between 3 and 800
    and category in (
      'opinion',
      'guest_suggestion',
      'topic_suggestion',
      'other'
    )
  );
