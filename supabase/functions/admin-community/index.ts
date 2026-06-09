import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-admin-password",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  const adminPw = Deno.env.get("ADMIN_PASSWORD");
  const provided = req.headers.get("x-admin-password");
  if (!adminPw || !provided || provided !== adminPw) {
    return json({ error: "Unauthorized" }, 401);
  }

  let payload: { action?: string; id?: string } = {};
  try {
    payload = await req.json();
  } catch {
    payload = {};
  }

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );

  const action = payload.action ?? "list";

  if (action === "list") {
    const { data, error } = await supabase
      .from("circle_posts")
      .select(
        "id,user_id,body,tags,likes,replies,created_at,status, profiles:profiles!circle_posts_user_id_fkey(display_name, avatar_emoji)",
      )
      .order("created_at", { ascending: false })
      .limit(200);
    if (error) return json({ error: error.message }, 500);
    return json({ posts: data ?? [] });
  }

  if (!payload.id || typeof payload.id !== "string") {
    return json({ error: "Missing id" }, 400);
  }

  if (action === "approve" || action === "reject") {
    const { error } = await supabase
      .from("circle_posts")
      .update({ status: action === "approve" ? "approved" : "rejected" })
      .eq("id", payload.id);
    if (error) return json({ error: error.message }, 500);
    return json({ ok: true });
  }

  if (action === "delete") {
    const { error } = await supabase
      .from("circle_posts")
      .delete()
      .eq("id", payload.id);
    if (error) return json({ error: error.message }, 500);
    return json({ ok: true });
  }

  return json({ error: "Unknown action" }, 400);
});
