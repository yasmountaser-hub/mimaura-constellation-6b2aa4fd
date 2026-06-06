
-- Trigger/signup helper functions: only the DB invokes them internally,
-- so revoke direct EXECUTE from API roles.
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.update_updated_at_column() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.update_experience_upvotes() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.update_circle_post_likes() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.update_circle_post_replies() FROM PUBLIC, anon, authenticated;
