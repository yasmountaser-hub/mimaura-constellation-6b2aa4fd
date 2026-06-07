
-- 1. Remove UPDATE policies so authenticated users cannot tamper with likes/replies counters.
DROP POLICY IF EXISTS "Users can update their own posts" ON public.circle_posts;
DROP POLICY IF EXISTS "Users can update their own replies" ON public.circle_replies;
DROP POLICY IF EXISTS "Users can update their own experiences" ON public.community_experiences;

-- Revoke direct UPDATE grant; triggers run as SECURITY DEFINER and bypass this.
REVOKE UPDATE ON public.circle_posts FROM authenticated, anon;
REVOKE UPDATE ON public.circle_replies FROM authenticated, anon;
REVOKE UPDATE ON public.community_experiences FROM authenticated, anon;

-- 2. Server-side body length limits.
ALTER TABLE public.circle_posts
  ADD CONSTRAINT chk_circle_posts_body_len CHECK (length(body) BETWEEN 1 AND 1000);

ALTER TABLE public.circle_replies
  ADD CONSTRAINT chk_circle_replies_body_len CHECK (length(body) BETWEEN 1 AND 1000);

ALTER TABLE public.community_experiences
  ADD CONSTRAINT chk_community_experiences_body_len CHECK (length(body) BETWEEN 1 AND 500);
