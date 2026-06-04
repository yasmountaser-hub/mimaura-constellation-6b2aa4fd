
-- Circle posts (Threads-style)
CREATE TABLE public.circle_posts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  body text not null,
  tags text[] not null default '{}',
  likes integer not null default 0,
  replies integer not null default 0,
  created_at timestamptz not null default now()
);
GRANT SELECT ON public.circle_posts TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.circle_posts TO authenticated;
GRANT ALL ON public.circle_posts TO service_role;
ALTER TABLE public.circle_posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Posts viewable by everyone" ON public.circle_posts FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create posts" ON public.circle_posts FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete their own posts" ON public.circle_posts FOR DELETE USING (auth.uid() = user_id);

-- Replies
CREATE TABLE public.circle_replies (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.circle_posts(id) on delete cascade,
  user_id uuid not null,
  body text not null,
  likes integer not null default 0,
  created_at timestamptz not null default now()
);
GRANT SELECT ON public.circle_replies TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.circle_replies TO authenticated;
GRANT ALL ON public.circle_replies TO service_role;
ALTER TABLE public.circle_replies ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Replies viewable by everyone" ON public.circle_replies FOR SELECT USING (true);
CREATE POLICY "Authenticated users can reply" ON public.circle_replies FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete their own replies" ON public.circle_replies FOR DELETE USING (auth.uid() = user_id);

-- Post likes
CREATE TABLE public.circle_post_likes (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.circle_posts(id) on delete cascade,
  user_id uuid not null,
  created_at timestamptz not null default now(),
  unique(post_id, user_id)
);
GRANT SELECT ON public.circle_post_likes TO anon;
GRANT SELECT, INSERT, DELETE ON public.circle_post_likes TO authenticated;
GRANT ALL ON public.circle_post_likes TO service_role;
ALTER TABLE public.circle_post_likes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Post likes viewable by everyone" ON public.circle_post_likes FOR SELECT USING (true);
CREATE POLICY "Authenticated users can like" ON public.circle_post_likes FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can unlike" ON public.circle_post_likes FOR DELETE USING (auth.uid() = user_id);

-- Triggers to maintain counters
CREATE OR REPLACE FUNCTION public.update_circle_post_likes()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE public.circle_posts SET likes = likes + 1 WHERE id = NEW.post_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE public.circle_posts SET likes = likes - 1 WHERE id = OLD.post_id;
  END IF;
  RETURN NULL;
END;
$$;
CREATE TRIGGER trg_circle_post_likes
AFTER INSERT OR DELETE ON public.circle_post_likes
FOR EACH ROW EXECUTE FUNCTION public.update_circle_post_likes();

CREATE OR REPLACE FUNCTION public.update_circle_post_replies()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE public.circle_posts SET replies = replies + 1 WHERE id = NEW.post_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE public.circle_posts SET replies = replies - 1 WHERE id = OLD.post_id;
  END IF;
  RETURN NULL;
END;
$$;
CREATE TRIGGER trg_circle_replies
AFTER INSERT OR DELETE ON public.circle_replies
FOR EACH ROW EXECUTE FUNCTION public.update_circle_post_replies();

-- FK so we can join profiles in PostgREST
ALTER TABLE public.circle_posts
  ADD CONSTRAINT circle_posts_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(user_id) ON DELETE CASCADE;
ALTER TABLE public.circle_replies
  ADD CONSTRAINT circle_replies_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(user_id) ON DELETE CASCADE;
