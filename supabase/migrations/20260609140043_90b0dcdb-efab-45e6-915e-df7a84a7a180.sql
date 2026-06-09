
ALTER TABLE public.circle_posts
  ADD COLUMN IF NOT EXISTS status text NOT NULL DEFAULT 'pending'
  CHECK (status IN ('pending','approved','rejected'));

UPDATE public.circle_posts SET status = 'approved' WHERE status = 'pending';

CREATE INDEX IF NOT EXISTS circle_posts_status_created_idx
  ON public.circle_posts (status, created_at DESC);

DROP POLICY IF EXISTS "Posts viewable by everyone" ON public.circle_posts;

CREATE POLICY "Approved posts viewable by everyone"
  ON public.circle_posts FOR SELECT
  USING (status = 'approved' OR auth.uid() = user_id);
