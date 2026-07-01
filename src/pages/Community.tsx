import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  MessageCircle,
  Send,
  Loader2,
  Sparkles,
  TrendingUp,
  Clock,
  Users,
  Tag,
  X,
  ChevronUp,
  Trash2,
  ShieldCheck,
  Hourglass,
  CornerDownRight,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingParticles from "@/components/FloatingParticles";
import CursorGlow from "@/components/CursorGlow";
import AccessibilityPanel from "@/components/AccessibilityPanel";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/AuthProvider";
import { toast } from "sonner";

interface Profile {
  display_name: string;
  avatar_emoji: string;
}
interface Post {
  id: string;
  user_id: string;
  body: string;
  tags: string[];
  likes: number;
  replies: number;
  created_at: string;
  status: "pending" | "approved" | "rejected";
  profile: Profile;
  liked: boolean;
}
interface Reply {
  id: string;
  user_id: string;
  body: string;
  created_at: string;
  profile: Profile;
}

const SORTS = [
  { key: "trending", label: "Hot", icon: TrendingUp },
  { key: "new", label: "New", icon: Sparkles },
  { key: "top", label: "Top", icon: ChevronUp },
] as const;

type SortKey = (typeof SORTS)[number]["key"];

const timeAgo = (iso: string) => {
  const s = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
  if (s < 60) return "just now";
  if (s < 3600) return `${Math.floor(s / 60)}m`;
  if (s < 86400) return `${Math.floor(s / 3600)}h`;
  if (s < 604800) return `${Math.floor(s / 86400)}d`;
  return new Date(iso).toLocaleDateString();
};

const parseTags = (raw: string): string[] =>
  Array.from(
    new Set(
      (raw.match(/#[\p{L}\p{N}_-]+/gu) || []).map((t) =>
        t.slice(1).toLowerCase(),
      ),
    ),
  ).slice(0, 5);

const Community = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState<SortKey>("trending");
  const [tagFilter, setTagFilter] = useState<string | null>(null);
  const [composer, setComposer] = useState("");
  const [posting, setPosting] = useState(false);
  const [openReplies, setOpenReplies] = useState<Record<string, Reply[] | null>>({});
  const [replyDrafts, setReplyDrafts] = useState<Record<string, string>>({});
  const [replying, setReplying] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchPosts = useCallback(async () => {
    let query = supabase
      .from("circle_posts")
      .select(
        "id,user_id,body,tags,likes,replies,created_at,status, profiles:profiles!circle_posts_user_id_fkey(display_name, avatar_emoji)",
      )
      .limit(100);

    if (sort === "new") query = query.order("created_at", { ascending: false });
    else if (sort === "top") query = query.order("likes", { ascending: false });
    else
      query = query
        .order("likes", { ascending: false })
        .order("created_at", { ascending: false });

    const { data, error } = await query;
    if (error) {
      console.error(error);
      setLoading(false);
      return;
    }

    let likedIds = new Set<string>();
    if (user) {
      const { data: likes } = await supabase
        .from("circle_post_likes")
        .select("post_id")
        .eq("user_id", user.id);
      likedIds = new Set((likes || []).map((l: { post_id: string }) => l.post_id));
    }

    const mapped: Post[] = (data || []).map((p: any) => ({
      id: p.id,
      user_id: p.user_id,
      body: p.body,
      tags: p.tags || [],
      likes: p.likes,
      replies: p.replies,
      created_at: p.created_at,
      status: (p.status as Post["status"]) ?? "approved",
      profile: {
        display_name: p.profiles?.display_name || "Anonymous",
        avatar_emoji: p.profiles?.avatar_emoji || "🌸",
      },
      liked: likedIds.has(p.id),
    }));

    setPosts(mapped);
    setLoading(false);
  }, [sort, user]);

  useEffect(() => {
    setLoading(true);
    fetchPosts();
  }, [fetchPosts]);

  const handlePost = async () => {
    if (!user) {
      toast.error("Sign in to share with The Circle");
      return;
    }
    const body = composer.trim();
    if (!body || posting) return;
    setPosting(true);
    const tags = parseTags(body);
    const { error } = await supabase
      .from("circle_posts")
      .insert({ user_id: user.id, body, tags });
    setPosting(false);
    if (error) {
      toast.error("Couldn't post — try again");
      return;
    }
    setComposer("");
    toast.success("Sent for review 💜 An admin will approve it shortly.");
    fetchPosts();
  };

  const handleLike = async (post: Post) => {
    if (!user) {
      toast.error("Sign in to upvote");
      return;
    }
    setPosts((ps) =>
      ps.map((p) =>
        p.id === post.id
          ? { ...p, liked: !p.liked, likes: p.likes + (p.liked ? -1 : 1) }
          : p,
      ),
    );
    if (post.liked) {
      await supabase
        .from("circle_post_likes")
        .delete()
        .eq("user_id", user.id)
        .eq("post_id", post.id);
    } else {
      await supabase
        .from("circle_post_likes")
        .insert({ user_id: user.id, post_id: post.id });
    }
  };

  const handleDeletePost = async (post: Post) => {
    if (!user || user.id !== post.user_id) return;
    if (!confirm("Delete this thread? This can't be undone.")) return;
    setDeletingId(post.id);
    const { error } = await supabase.from("circle_posts").delete().eq("id", post.id);
    setDeletingId(null);
    if (error) {
      toast.error("Couldn't delete");
      return;
    }
    setPosts((ps) => ps.filter((p) => p.id !== post.id));
    toast.success("Thread deleted");
  };

  const handleDeleteReply = async (postId: string, reply: Reply) => {
    if (!user || user.id !== reply.user_id) return;
    if (!confirm("Delete this reply?")) return;
    const { error } = await supabase
      .from("circle_replies")
      .delete()
      .eq("id", reply.id);
    if (error) {
      toast.error("Couldn't delete");
      return;
    }
    setOpenReplies((r) => ({
      ...r,
      [postId]: (r[postId] || []).filter((x) => x.id !== reply.id),
    }));
    setPosts((ps) =>
      ps.map((p) =>
        p.id === postId ? { ...p, replies: Math.max(0, p.replies - 1) } : p,
      ),
    );
  };

  const loadReplies = async (postId: string) => {
    if (openReplies[postId] !== undefined) {
      setOpenReplies((r) => {
        const next = { ...r };
        delete next[postId];
        return next;
      });
      return;
    }
    setOpenReplies((r) => ({ ...r, [postId]: null }));
    const { data } = await supabase
      .from("circle_replies")
      .select(
        "id,user_id,body,created_at, profiles:profiles!circle_replies_user_id_fkey(display_name, avatar_emoji)",
      )
      .eq("post_id", postId)
      .order("created_at", { ascending: true });

    const mapped: Reply[] = (data || []).map((r: any) => ({
      id: r.id,
      user_id: r.user_id,
      body: r.body,
      created_at: r.created_at,
      profile: {
        display_name: r.profiles?.display_name || "Anonymous",
        avatar_emoji: r.profiles?.avatar_emoji || "🌸",
      },
    }));
    setOpenReplies((r) => ({ ...r, [postId]: mapped }));
  };

  const submitReply = async (postId: string) => {
    if (!user) {
      toast.error("Sign in to reply");
      return;
    }
    const body = (replyDrafts[postId] || "").trim();
    if (!body) return;
    setReplying(postId);
    const { error } = await supabase
      .from("circle_replies")
      .insert({ post_id: postId, user_id: user.id, body });
    setReplying(null);
    if (error) {
      toast.error("Couldn't reply");
      return;
    }
    setReplyDrafts((d) => ({ ...d, [postId]: "" }));
    setOpenReplies((r) => ({ ...r, [postId]: undefined as any }));
    await loadReplies(postId);
    fetchPosts();
  };

  const allTags = useMemo(
    () => Array.from(new Set(posts.flatMap((p) => p.tags))).slice(0, 12),
    [posts],
  );

  const visible = tagFilter
    ? posts.filter((p) => p.tags.includes(tagFilter))
    : posts;

  return (
    <div className="min-h-screen relative overflow-hidden">
      <FloatingParticles />
      <CursorGlow />
      <Header />
      <AccessibilityPanel />

      {/* Soft glow backdrop */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-32 left-1/4 w-96 h-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-20 right-1/4 w-80 h-80 rounded-full bg-accent/10 blur-3xl" />
      </div>

      <main className="pt-28 pb-20 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          {/* Hero — Y2K chrome + sparkle */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative text-center mb-8 space-y-4 pt-6"
          >
            {/* Sticker: ur fav circle (glossy pill with hard offset shadow) */}
            <motion.div
              aria-hidden
              animate={{ rotate: [-14, -10, -14] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="hidden sm:flex absolute -top-2 -left-2 md:-left-6 items-center gap-2 px-3 py-1 rounded-full bg-background border-2 border-background select-none"
              style={{
                boxShadow: "4px 4px 0 0 hsl(var(--rose) / 0.45)",
              }}
            >
              <span
                className="w-3 h-3 rounded-full bg-gradient-to-br from-rose to-primary"
                style={{ boxShadow: "inset -1px -1px 2px hsl(var(--background))" }}
              />
              <span className="text-[10px] font-bold uppercase tracking-widest text-rose">
                ur fav circle
              </span>
            </motion.div>

            {/* Sticker: NEW NEW NEW price-tag */}
            <motion.div
              aria-hidden
              animate={{ rotate: [12, 16, 12], y: [0, -3, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="hidden sm:block absolute top-0 -right-2 md:-right-6 bg-gold/30 border-2 border-background px-3 py-2 rounded-xl select-none"
              style={{ boxShadow: "4px 4px 0 0 hsl(var(--gold) / 0.35)" }}
            >
              <span className="text-[10px] font-black text-gold-foreground uppercase tracking-tight">
                new new new
              </span>
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-background rotate-45 border border-background" />
            </motion.div>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-[11px] font-medium text-primary">
              <ShieldCheck className="w-3 h-3" />
              Moderated for kindness — every thread reviewed
            </div>

            {/* Chrome/liquid italic title with sparkle bursts */}
            <div className="relative inline-block">
              <h1
                className="font-display italic font-black tracking-tighter text-5xl sm:text-6xl md:text-7xl leading-none"
                style={{
                  backgroundImage:
                    "linear-gradient(to bottom, hsl(var(--primary)) 0%, hsl(var(--rose) / 0.7) 45%, hsl(var(--background)) 55%, hsl(var(--primary)) 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  filter: "drop-shadow(0 3px 0 hsl(var(--primary) / 0.22)) drop-shadow(0 1px 0 hsl(var(--background)))",
                }}
              >
                The Circle
              </h1>
              {/* Sparkle bursts */}
              <motion.span
                aria-hidden
                animate={{ scale: [0.6, 1.1, 0.6], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-3 -right-5 w-7 h-7 rounded-full pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle, hsl(var(--background)) 15%, hsl(var(--gold) / 0.4) 40%, transparent 70%)",
                }}
              />
              <motion.span
                aria-hidden
                animate={{ scale: [0.5, 1, 0.5], opacity: [0.4, 0.9, 0.4] }}
                transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
                className="absolute bottom-1 -left-5 w-5 h-5 rounded-full pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle, hsl(var(--background)) 15%, hsl(var(--rose) / 0.4) 45%, transparent 70%)",
                }}
              />
              <motion.span
                aria-hidden
                animate={{ rotate: 360 }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                className="absolute -top-4 left-1/2 -translate-x-1/2 text-lg text-primary/60 pointer-events-none"
              >
                ✦
              </motion.span>
            </div>

            <p className="text-base text-muted-foreground max-w-xl mx-auto leading-relaxed">
              A safe, threaded space to share, ask, and feel seen. Upvote what
              resonates, reply with care.
            </p>
            <div className="flex justify-center pt-1">
              <div className="inline-flex items-center gap-2 text-[10px] font-bold font-display tracking-[0.2em] uppercase text-primary/70">
                <span>♡</span>
                <span>be kind · stay soft · post real</span>
                <span>♡</span>
              </div>
            </div>
          </motion.div>

          {/* Stats — glossy holo cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-3 gap-3 mb-6"
          >
            {[
              { label: "Threads", value: posts.length, icon: MessageCircle },
              {
                label: "Upvotes",
                value: posts.reduce((s, p) => s + p.likes, 0),
                icon: ChevronUp,
              },
              {
                label: "Replies",
                value: posts.reduce((s, p) => s + p.replies, 0),
                icon: Users,
              },
            ].map((stat) => (
              <div
                key={stat.label}
                className="relative glass-card rounded-2xl p-3 text-center overflow-hidden border border-background/60"
              >
                {/* diagonal chrome sheen */}
                <div
                  aria-hidden
                  className="absolute inset-0 pointer-events-none opacity-70"
                  style={{
                    background:
                      "linear-gradient(115deg, transparent 40%, hsl(var(--background) / 0.45) 50%, transparent 60%)",
                  }}
                />
                <stat.icon className="relative w-4 h-4 text-primary mx-auto mb-1" />
                <p className="relative font-display text-lg font-black text-foreground tracking-tight">
                  {stat.value}
                </p>
                <p className="relative text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>


          {/* Composer */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="glass-card rounded-2xl p-4 mb-6 relative overflow-hidden"
          >
            <div
              className="absolute inset-0 -z-10 opacity-40"
              style={{ background: "var(--gradient-mesh, transparent)" }}
            />
            <div className="flex items-center gap-2 mb-2 text-[11px] text-muted-foreground">
              <Sparkles className="w-3 h-3 text-primary" />
              Start a new thread — admins approve before it goes live
            </div>
            <textarea
              value={composer}
              onChange={(e) => setComposer(e.target.value)}
              placeholder={
                user
                  ? "What's on your mind? Use #tags so others can find you…"
                  : "Sign in to share with The Circle…"
              }
              disabled={!user}
              maxLength={1000}
              rows={3}
              className="w-full bg-transparent text-foreground placeholder:text-muted-foreground text-sm leading-relaxed focus:outline-none resize-none disabled:opacity-60"
            />
            <div className="flex items-center justify-between mt-2 pt-2 border-t border-border/30">
              <span className="text-[11px] text-muted-foreground">
                {composer.length}/1000 · #tags supported
              </span>
              {user ? (
                <button
                  onClick={handlePost}
                  disabled={!composer.trim() || posting}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold text-primary-foreground disabled:opacity-40 transition-all"
                  style={{ background: "var(--gradient-button)" }}
                >
                  {posting ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Send className="w-3.5 h-3.5" />
                  )}
                  Submit thread
                </button>
              ) : (
                <Link
                  to="/auth"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold text-primary-foreground"
                  style={{ background: "var(--gradient-button)" }}
                >
                  Sign in to post
                </Link>
              )}
            </div>
          </motion.div>

          {/* Sort */}
          <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-1">
            {SORTS.map((opt) => (
              <button
                key={opt.key}
                onClick={() => setSort(opt.key)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                  sort === opt.key
                    ? "bg-primary text-primary-foreground shadow-soft"
                    : "bg-card border border-border/50 text-muted-foreground hover:text-foreground"
                }`}
              >
                <opt.icon className="w-3 h-3" />
                {opt.label}
              </button>
            ))}
          </div>

          {/* Tags */}
          {allTags.length > 0 && (
            <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-1">
              <Tag className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
              {tagFilter && (
                <button
                  onClick={() => setTagFilter(null)}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary/15 text-primary text-[11px] font-medium"
                >
                  #{tagFilter}
                  <X className="w-3 h-3" />
                </button>
              )}
              {!tagFilter &&
                allTags.map((t) => (
                  <button
                    key={t}
                    onClick={() => setTagFilter(t)}
                    className="px-2.5 py-1 rounded-full bg-muted/40 text-muted-foreground text-[11px] font-medium hover:bg-primary/10 hover:text-primary transition-colors whitespace-nowrap"
                  >
                    #{t}
                  </button>
                ))}
            </div>
          )}

          {/* Feed */}
          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="w-6 h-6 text-primary animate-spin" />
            </div>
          ) : visible.length === 0 ? (
            <div className="glass-card rounded-2xl p-10 text-center">
              <span className="text-4xl block mb-3">🌸</span>
              <p className="font-display text-lg font-bold text-foreground mb-1">
                The Circle is quiet right now
              </p>
              <p className="text-sm text-muted-foreground">
                Be the first to start a thread — every story makes someone feel
                less alone.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              <AnimatePresence initial={false}>
                {visible.map((post) => {
                  const replies = openReplies[post.id];
                  const open = post.id in openReplies;
                  const isOwner = user?.id === post.user_id;
                  const isPending = post.status === "pending";
                  const isRejected = post.status === "rejected";

                  return (
                    <motion.article
                      key={post.id}
                      layout
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.97 }}
                      className={`glass-card rounded-2xl overflow-hidden transition-all hover:shadow-soft ${
                        isPending
                          ? "ring-1 ring-yellow-400/40"
                          : isRejected
                            ? "ring-1 ring-destructive/40 opacity-70"
                            : ""
                      }`}
                    >
                      <div className="flex">
                        {/* Vote rail */}
                        <div className="flex flex-col items-center gap-1 px-3 py-4 bg-gradient-to-b from-primary/5 to-transparent border-r border-border/20 min-w-[56px]">
                          <button
                            onClick={() => handleLike(post)}
                            aria-label="Upvote"
                            className={`p-1.5 rounded-lg transition-all ${
                              post.liked
                                ? "bg-primary text-primary-foreground shadow-soft"
                                : "text-muted-foreground hover:bg-primary/10 hover:text-primary"
                            }`}
                          >
                            <ChevronUp
                              className={`w-5 h-5 ${post.liked ? "fill-current" : ""}`}
                            />
                          </button>
                          <span
                            className={`font-display text-sm font-bold ${
                              post.liked ? "text-primary" : "text-foreground"
                            }`}
                          >
                            {post.likes}
                          </span>
                          <span className="text-[9px] uppercase tracking-wider text-muted-foreground">
                            karma
                          </span>
                        </div>

                        {/* Body */}
                        <div className="flex-1 p-4 min-w-0">
                          <div className="flex items-center gap-2 mb-2 flex-wrap">
                            <span className="text-xl">{post.profile.avatar_emoji}</span>
                            <span className="text-sm font-bold text-foreground">
                              {post.profile.display_name}
                            </span>
                            <span className="text-muted-foreground text-xs">·</span>
                            <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                              <Clock className="w-2.5 h-2.5" />
                              {timeAgo(post.created_at)}
                            </span>
                            {isPending && (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-yellow-400/15 text-yellow-600 dark:text-yellow-300 text-[10px] font-semibold">
                                <Hourglass className="w-2.5 h-2.5" />
                                Pending review
                              </span>
                            )}
                            {isRejected && (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-destructive/15 text-destructive text-[10px] font-semibold">
                                Not approved
                              </span>
                            )}
                          </div>

                          <p className="text-[15px] text-foreground leading-relaxed whitespace-pre-wrap mb-3">
                            {post.body}
                          </p>

                          {post.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 mb-3">
                              {post.tags.map((t) => (
                                <button
                                  key={t}
                                  onClick={() => setTagFilter(t)}
                                  className="px-2 py-0.5 rounded-full bg-muted/40 text-[10px] font-medium text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                                >
                                  #{t}
                                </button>
                              ))}
                            </div>
                          )}

                          <div className="flex items-center gap-1.5 pt-2 border-t border-border/20">
                            <button
                              onClick={() => loadReplies(post.id)}
                              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                                open
                                  ? "bg-primary/15 text-primary"
                                  : "text-muted-foreground hover:bg-primary/10 hover:text-primary"
                              }`}
                            >
                              <MessageCircle className="w-3.5 h-3.5" />
                              {post.replies}{" "}
                              {post.replies === 1 ? "reply" : "replies"}
                            </button>
                            {isOwner && (
                              <button
                                onClick={() => handleDeletePost(post)}
                                disabled={deletingId === post.id}
                                className="ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-all disabled:opacity-40"
                                aria-label="Delete thread"
                              >
                                {deletingId === post.id ? (
                                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                ) : (
                                  <Trash2 className="w-3.5 h-3.5" />
                                )}
                                Delete
                              </button>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Threaded replies */}
                      <AnimatePresence>
                        {open && !isPending && !isRejected && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="pl-6 pr-4 pb-4 pt-1 border-t border-border/20 bg-muted/10">
                              {replies === null && (
                                <div className="flex justify-center py-4">
                                  <Loader2 className="w-4 h-4 text-primary animate-spin" />
                                </div>
                              )}
                              {Array.isArray(replies) && replies.length > 0 && (
                                <div className="space-y-2 mt-3">
                                  {replies.map((r) => {
                                    const isReplyOwner = user?.id === r.user_id;
                                    return (
                                      <div
                                        key={r.id}
                                        className="relative pl-5 group"
                                      >
                                        <span
                                          className="absolute left-0 top-0 bottom-0 w-px bg-border/40"
                                          aria-hidden
                                        />
                                        <CornerDownRight
                                          className="absolute -left-0.5 top-2 w-3 h-3 text-border"
                                          aria-hidden
                                        />
                                        <div className="rounded-xl bg-background/60 border border-border/30 px-3 py-2.5">
                                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                                            <span className="text-sm">
                                              {r.profile.avatar_emoji}
                                            </span>
                                            <span className="text-xs font-semibold text-foreground">
                                              {r.profile.display_name}
                                            </span>
                                            <span className="text-[10px] text-muted-foreground">
                                              {timeAgo(r.created_at)}
                                            </span>
                                            {isReplyOwner && (
                                              <button
                                                onClick={() =>
                                                  handleDeleteReply(post.id, r)
                                                }
                                                className="ml-auto text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                                                aria-label="Delete reply"
                                              >
                                                <Trash2 className="w-3 h-3" />
                                              </button>
                                            )}
                                          </div>
                                          <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">
                                            {r.body}
                                          </p>
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                              )}

                              <div className="flex gap-2 mt-3 pl-5">
                                <input
                                  type="text"
                                  value={replyDrafts[post.id] || ""}
                                  onChange={(e) =>
                                    setReplyDrafts((d) => ({
                                      ...d,
                                      [post.id]: e.target.value,
                                    }))
                                  }
                                  onKeyDown={(e) =>
                                    e.key === "Enter" && submitReply(post.id)
                                  }
                                  placeholder={
                                    user
                                      ? "Reply with kindness…"
                                      : "Sign in to reply…"
                                  }
                                  disabled={!user}
                                  maxLength={500}
                                  className="flex-1 px-3 py-2 rounded-xl bg-background/70 border border-border/40 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-60"
                                />
                                <button
                                  onClick={() => submitReply(post.id)}
                                  disabled={
                                    !user ||
                                    !replyDrafts[post.id]?.trim() ||
                                    replying === post.id
                                  }
                                  className="px-3 py-2 rounded-xl bg-primary text-primary-foreground disabled:opacity-40"
                                  aria-label="Send reply"
                                >
                                  {replying === post.id ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                  ) : (
                                    <Send className="w-4 h-4" />
                                  )}
                                </button>
                              </div>
                            </div>
                          </motion.div>
                        )}
                        {open && (isPending || isRejected) && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="px-5 py-3 border-t border-border/20 text-xs text-muted-foreground">
                              Replies open once an admin approves this thread.
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.article>
                  );
                })}
              </AnimatePresence>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Community;
