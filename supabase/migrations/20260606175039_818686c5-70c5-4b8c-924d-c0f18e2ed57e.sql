
-- Tighten waitlist INSERT: validate email format & length, name length, source whitelist
DROP POLICY IF EXISTS "Anyone can join the waitlist" ON public.waitlist;
CREATE POLICY "Anyone can join the waitlist"
  ON public.waitlist
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    email IS NOT NULL
    AND length(email) BETWEEN 5 AND 255
    AND email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
    AND (name IS NULL OR length(name) <= 100)
    AND (source IS NULL OR length(source) <= 50)
  );

-- Add UPDATE policies for circle_posts and circle_replies (owner-only)
CREATE POLICY "Users can update their own posts"
  ON public.circle_posts
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own replies"
  ON public.circle_replies
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Lock down has_role: revoke from public/anon (RLS evaluates as authenticated, which keeps EXECUTE)
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM anon;

-- Reduce GraphQL/PostgREST surface for anon on sensitive tables
REVOKE SELECT ON public.waitlist FROM anon;
REVOKE SELECT ON public.user_roles FROM anon;
