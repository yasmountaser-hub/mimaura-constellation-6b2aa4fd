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
  Heart,
  Flower2,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingParticles from "@/components/FloatingParticles";
import CursorGlow from "@/components/CursorGlow";
import AccessibilityPanel from "@/components/AccessibilityPanel";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/AuthProvider";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

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

// Deterministic pastel accent per post so cards feel alive but stable.
const ACCENTS = ["primary", "rose", "gold", "sky", "mint", "lavender"] as const;
const accentFor = (id: string) => {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0;
  return ACCENTS[h % ACCENTS.length];
};

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
  const [confirmDelete, setConfirmDelete] = useState<
    | { type: "post"; post: Post }
    | { type: "reply"; postId: string; reply: Reply }
    | null
  >(null);

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

  const performDeletePost = async (post: Post) => {
    if (!user || user.id !== post.user_id) return;
    setDeletingId(post.id);
    const { error } = await supabase.from("circle_posts").delete().eq("id", post.id);
    setDeletingId(null);
    if (error) {
      toast.error("Couldn't delete");
      return;
    }
    setPosts((ps) => ps.filter((p) => p.id !== post.id));
    toast.success("Thread deleted 🌙");
  };

  const performDeleteReply = async (postId: string, reply: Reply) => {
    if (!user || user.id !== reply.user_id) return;
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

      {/* Ambient aurora backdrop */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-24 left-[10%] w-[520px] h-[520px] rounded-full bg-primary/15 blur-[120px]" />
        <div className="absolute top-[40%] right-[5%] w-[420px] h-[420px] rounded-full bg-rose/15 blur-[120px]" />
        <div className="absolute bottom-10 left-[30%] w-[480px] h-[480px] rounded-full bg-gold/10 blur-[120px]" />
      </div>

      <main className="pt-28 pb-20 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative text-center mb-10 space-y-4 pt-6"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-[11px] font-medium text-primary">
              <ShieldCheck className="w-3 h-3" />
              Moderated for kindness — every thread reviewed
            </div>

            <div className="relative inline-block">
              <motion.span
                aria-hidden
                animate={{ rotate: 360 }}
                transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
                className="absolute -top-6 -left-8 text-2xl text-primary/50"
              >
                ✿
              </motion.span>
              <motion.span
                aria-hidden
                animate={{ scale: [0.9, 1.15, 0.9], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-3 -right-6 text-xl text-gold"
              >
                ✦
              </motion.span>
              <h1
                className="font-display font-black tracking-tight text-5xl sm:text-6xl md:text-7xl leading-none italic"
                style={{
                  backgroundImage:
                    "linear-gradient(120deg, hsl(var(--primary)) 0%, hsl(var(--rose)) 40%, hsl(var(--gold)) 75%, hsl(var(--primary)) 100%)",
                  backgroundSize: "200% 100%",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  filter: "drop-shadow(0 2px 8px hsl(var(--primary) / 0.25))",
                }}
              >
                The Circle
              </h1>
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

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-3 gap-3 mb-6"
          >
            {[
              { label: "Threads", value: posts.length, icon: MessageCircle, tint: "primary" },
              {
                label: "Upvotes",
                value: posts.reduce((s, p) => s + p.likes, 0),
                icon: Heart,
                tint: "rose",
              },
              {
                label: "Replies",
                value: posts.reduce((s, p) => s + p.replies, 0),
                icon: Users,
                tint: "gold",
              },
            ].map((stat) => (
              <div
                key={stat.label}
                className="relative rounded-2xl p-4 text-center overflow-hidden border border-border/40"
                style={{
                  background: `linear-gradient(155deg, hsl(var(--${stat.tint}) / 0.14), hsl(var(--card) / 0.7) 60%)`,
                  backdropFilter: "blur(12px)",
                }}
              >
                <stat.icon
                  className="relative w-4 h-4 mx-auto mb-1"
                  style={{ color: `hsl(var(--${stat.tint}))` }}
                />
                <p className="relative font-display text-2xl font-black text-foreground tracking-tight">
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
            className="relative rounded-3xl mb-6 overflow-hidden"
            style={{
              padding: "1px",
              background:
                "linear-gradient(135deg, hsl(var(--primary) / 0.5), hsl(var(--rose) / 0.35), hsl(var(--gold) / 0.4))",
            }}
          >
            <div className="rounded-[calc(1.5rem-1px)] bg-card/85 backdrop-blur-xl p-5">
              <div className="flex items-center gap-2 mb-3 text-[11px] text-muted-foreground">
                <Flower2 className="w-3.5 h-3.5 text-primary" />
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
                className="w-full bg-transparent text-foreground placeholder:text-muted-foreground/70 text-[15px] leading-relaxed focus:outline-none resize-none disabled:opacity-60"
              />
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/30">
                <span className="text-[11px] text-muted-foreground">
                  {composer.length}/1000 · #tags supported
                </span>
                {user ? (
                  <button
                    onClick={handlePost}
                    disabled={!composer.trim() || posting}
                    className="group inline-flex items-center gap-1.5 px-5 py-2 rounded-full text-sm font-semibold text-primary-foreground disabled:opacity-40 transition-all shadow-soft hover:shadow-glow hover:-translate-y-0.5"
                    style={{
                      background:
                        "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--rose)))",
                    }}
                  >
                    {posting ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Send className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    )}
                    Submit thread
                  </button>
                ) : (
                  <Link
                    to="/auth"
                    className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full text-sm font-semibold text-primary-foreground shadow-soft"
                    style={{
                      background:
                        "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--rose)))",
                    }}
                  >
                    Sign in to post
                  </Link>
                )}
              </div>
            </div>
          </motion.div>

          {/* Sort */}
          <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-1">
            {SORTS.map((opt) => (
              <button
                key={opt.key}
                onClick={() => setSort(opt.key)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  sort === opt.key
                    ? "text-primary-foreground shadow-soft"
                    : "bg-card/60 backdrop-blur border border-border/40 text-muted-foreground hover:text-foreground hover:border-primary/30"
                }`}
                style={
                  sort === opt.key
                    ? {
                        background:
                          "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--rose)))",
                      }
                    : undefined
                }
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
            <div className="glass-card rounded-3xl p-12 text-center">
              <motion.span
                animate={{ rotate: [0, 8, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="text-5xl block mb-3"
              >
                🌸
              </motion.span>
              <p className="font-display text-lg font-bold text-foreground mb-1">
                The Circle is quiet right now
              </p>
              <p className="text-sm text-muted-foreground">
                Be the first to start a thread — every story makes someone feel
                less alone.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <AnimatePresence initial={false}>
                {visible.map((post) => {
                  const replies = openReplies[post.id];
                  const open = post.id in openReplies;
                  const isOwner = user?.id === post.user_id;
                  const isPending = post.status === "pending";
                  const isRejected = post.status === "rejected";
                  const accent = accentFor(post.id);

                  return (
                    <motion.article
                      key={post.id}
                      layout
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.97 }}
                      whileHover={{ y: -2 }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      className={`relative rounded-3xl overflow-hidden group ${
                        isRejected ? "opacity-70" : ""
                      }`}
                      style={{
                        padding: "1px",
                        background: isPending
                          ? "linear-gradient(135deg, hsl(var(--gold) / 0.6), hsl(var(--gold) / 0.15))"
                          : isRejected
                            ? "linear-gradient(135deg, hsl(var(--destructive) / 0.5), hsl(var(--destructive) / 0.15))"
                            : `linear-gradient(135deg, hsl(var(--${accent}) / 0.45), hsl(var(--border) / 0.4) 60%)`,
                      }}
                    >
                      <div className="relative rounded-[calc(1.5rem-1px)] bg-card/90 backdrop-blur-xl overflow-hidden">
                        {/* Corner glow */}
                        <div
                          aria-hidden
                          className="absolute -top-16 -right-16 w-40 h-40 rounded-full blur-3xl opacity-40 pointer-events-none"
                          style={{ background: `hsl(var(--${accent}) / 0.5)` }}
                        />

                        <div className="relative flex">
                          {/* Vote rail */}
                          <div
                            className="flex flex-col items-center justify-start gap-1 px-3 py-5 min-w-[64px] border-r border-border/20"
                            style={{
                              background: `linear-gradient(180deg, hsl(var(--${accent}) / 0.08), transparent)`,
                            }}
                          >
                            <button
                              onClick={() => handleLike(post)}
                              aria-label="Upvote"
                              className={`p-2 rounded-xl transition-all active:scale-90 ${
                                post.liked
                                  ? "text-primary-foreground shadow-glow"
                                  : "text-muted-foreground hover:bg-primary/10 hover:text-primary"
                              }`}
                              style={
                                post.liked
                                  ? {
                                      background:
                                        "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--rose)))",
                                    }
                                  : undefined
                              }
                            >
                              <ChevronUp
                                className={`w-5 h-5 ${post.liked ? "fill-current" : ""}`}
                              />
                            </button>
                            <span
                              className={`font-display text-base font-black tracking-tight ${
                                post.liked ? "text-primary" : "text-foreground"
                              }`}
                            >
                              {post.likes}
                            </span>
                            <span className="text-[9px] uppercase tracking-widest text-muted-foreground font-semibold">
                              karma
                            </span>
                          </div>

                          {/* Body */}
                          <div className="flex-1 p-5 min-w-0">
                            <div className="flex items-center gap-2 mb-3 flex-wrap">
                              <div
                                className="w-9 h-9 rounded-full flex items-center justify-center text-lg shrink-0 border border-border/40"
                                style={{
                                  background: `linear-gradient(135deg, hsl(var(--${accent}) / 0.25), hsl(var(--card)))`,
                                }}
                              >
                                {post.profile.avatar_emoji}
                              </div>
                              <div className="flex flex-col leading-tight">
                                <span className="text-sm font-bold text-foreground">
                                  {post.profile.display_name}
                                </span>
                                <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                                  <Clock className="w-2.5 h-2.5" />
                                  {timeAgo(post.created_at)}
                                </span>
                              </div>
                              {isPending && (
                                <span className="ml-auto inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-gold/15 text-gold text-[10px] font-bold uppercase tracking-wider">
                                  <Hourglass className="w-2.5 h-2.5" />
                                  Pending
                                </span>
                              )}
                              {isRejected && (
                                <span className="ml-auto inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-destructive/15 text-destructive text-[10px] font-bold uppercase tracking-wider">
                                  Not approved
                                </span>
                              )}
                            </div>

                            <p className="text-[15px] text-foreground leading-relaxed whitespace-pre-wrap mb-3">
                              {post.body}
                            </p>

                            {post.tags.length > 0 && (
                              <div className="flex flex-wrap gap-1.5 mb-4">
                                {post.tags.map((t) => (
                                  <button
                                    key={t}
                                    onClick={() => setTagFilter(t)}
                                    className="px-2.5 py-1 rounded-full text-[10px] font-semibold transition-all hover:-translate-y-0.5"
                                    style={{
                                      background: `hsl(var(--${accent}) / 0.12)`,
                                      color: `hsl(var(--${accent}))`,
                                    }}
                                  >
                                    #{t}
                                  </button>
                                ))}
                              </div>
                            )}

                            <div className="flex items-center gap-1.5 pt-3 border-t border-border/20">
                              <button
                                onClick={() => loadReplies(post.id)}
                                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                                  open
                                    ? "bg-primary/15 text-primary"
                                    : "text-muted-foreground hover:bg-primary/10 hover:text-primary"
                                }`}
                              >
                                <MessageCircle className="w-3.5 h-3.5" />
                                {post.replies}{" "}
                                {post.replies === 1 ? "reply" : "replies"}
                              </button>
                              <button
                                onClick={() => handleLike(post)}
                                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                                  post.liked
                                    ? "bg-rose/15 text-rose"
                                    : "text-muted-foreground hover:bg-rose/10 hover:text-rose"
                                }`}
                              >
                                <Heart
                                  className={`w-3.5 h-3.5 ${post.liked ? "fill-current" : ""}`}
                                />
                                {post.liked ? "Loved" : "Love"}
                              </button>
                              {isOwner && (
                                <button
                                  onClick={() =>
                                    setConfirmDelete({ type: "post", post })
                                  }
                                  disabled={deletingId === post.id}
                                  className="ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-all disabled:opacity-40"
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
                              <div
                                className="pl-6 pr-5 pb-5 pt-2 border-t border-border/20"
                                style={{
                                  background: `linear-gradient(180deg, hsl(var(--${accent}) / 0.05), transparent)`,
                                }}
                              >
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
                                          className="relative pl-5 group/reply"
                                        >
                                          <span
                                            className="absolute left-0 top-0 bottom-0 w-px"
                                            style={{
                                              background: `linear-gradient(180deg, hsl(var(--${accent}) / 0.5), transparent)`,
                                            }}
                                            aria-hidden
                                          />
                                          <CornerDownRight
                                            className="absolute -left-0.5 top-2 w-3 h-3"
                                            style={{ color: `hsl(var(--${accent}) / 0.5)` }}
                                            aria-hidden
                                          />
                                          <div className="rounded-2xl bg-background/70 border border-border/30 px-3.5 py-2.5 backdrop-blur">
                                            <div className="flex items-center gap-2 mb-1 flex-wrap">
                                              <span className="text-sm">
                                                {r.profile.avatar_emoji}
                                              </span>
                                              <span className="text-xs font-bold text-foreground">
                                                {r.profile.display_name}
                                              </span>
                                              <span className="text-[10px] text-muted-foreground">
                                                {timeAgo(r.created_at)}
                                              </span>
                                              {isReplyOwner && (
                                                <button
                                                  onClick={() =>
                                                    setConfirmDelete({
                                                      type: "reply",
                                                      postId: post.id,
                                                      reply: r,
                                                    })
                                                  }
                                                  className="ml-auto text-muted-foreground hover:text-destructive opacity-0 group-hover/reply:opacity-100 transition-opacity"
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
                                    className="flex-1 px-3.5 py-2 rounded-full bg-background/80 border border-border/40 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 disabled:opacity-60 transition-all"
                                  />
                                  <button
                                    onClick={() => submitReply(post.id)}
                                    disabled={
                                      !user ||
                                      !replyDrafts[post.id]?.trim() ||
                                      replying === post.id
                                    }
                                    className="px-3 py-2 rounded-full text-primary-foreground disabled:opacity-40 shadow-soft transition-transform active:scale-95"
                                    style={{
                                      background:
                                        "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--rose)))",
                                    }}
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
                      </div>
                    </motion.article>
                  );
                })}
              </AnimatePresence>
            </div>
          )}
        </div>
      </main>

      {/* Delete confirmation */}
      <AlertDialog
        open={!!confirmDelete}
        onOpenChange={(o) => !o && setConfirmDelete(null)}
      >
        <AlertDialogContent className="rounded-3xl border-border/40">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-display flex items-center gap-2">
              <Trash2 className="w-4 h-4 text-destructive" />
              {confirmDelete?.type === "post"
                ? "Delete this thread?"
                : "Delete this reply?"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {confirmDelete?.type === "post"
                ? "This will remove your thread and all its replies from The Circle. This can't be undone."
                : "This reply will be permanently removed. This can't be undone."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-full">Keep it</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (!confirmDelete) return;
                if (confirmDelete.type === "post") {
                  performDeletePost(confirmDelete.post);
                } else {
                  performDeleteReply(confirmDelete.postId, confirmDelete.reply);
                }
                setConfirmDelete(null);
              }}
              className="rounded-full bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Footer />
    </div>
  );
};

export default Community;
