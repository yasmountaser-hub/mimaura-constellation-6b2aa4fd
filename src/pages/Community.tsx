import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import {
  MessageCircle,
  Heart,
  Send,
  Loader2,
  Sparkles,
  TrendingUp,
  Clock,
  Users,
  Tag,
  X,
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
  { key: "trending", label: "Trending", icon: TrendingUp },
  { key: "new", label: "New", icon: Sparkles },
  { key: "top", label: "Top", icon: Heart },
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
  const [openReplies, setOpenReplies] = useState<Record<string, Reply[] | null>>(
    {},
  );
  const [replyDrafts, setReplyDrafts] = useState<Record<string, string>>({});
  const [replying, setReplying] = useState<string | null>(null);

  const fetchPosts = useCallback(async () => {
    let query = supabase
      .from("circle_posts")
      .select(
        "id,user_id,body,tags,likes,replies,created_at, profiles:profiles!circle_posts_user_id_fkey(display_name, avatar_emoji)",
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

  // Realtime
  useEffect(() => {
    const ch = supabase
      .channel("circle-realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "circle_posts" },
        () => fetchPosts(),
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "circle_post_likes" },
        () => fetchPosts(),
      )
      .subscribe();
    return () => {
      supabase.removeChannel(ch);
    };
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
    toast.success("Shared with The Circle 💜");
    fetchPosts();
  };

  const handleLike = async (post: Post) => {
    if (!user) {
      toast.error("Sign in to like posts");
      return;
    }
    // optimistic
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

  const loadReplies = async (postId: string) => {
    if (openReplies[postId] !== undefined) {
      // toggle close
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
    // refresh replies and post counts
    setOpenReplies((r) => ({ ...r, [postId]: undefined as any }));
    await loadReplies(postId);
    fetchPosts();
  };

  const allTags = Array.from(
    new Set(posts.flatMap((p) => p.tags)),
  ).slice(0, 12);

  const visible = tagFilter
    ? posts.filter((p) => p.tags.includes(tagFilter))
    : posts;

  return (
    <div className="min-h-screen relative overflow-hidden">
      <FloatingParticles />
      <CursorGlow />
      <Header />
      <AccessibilityPanel />

      <main className="pt-28 pb-20 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8 space-y-3"
          >
            <span className="text-5xl">💬</span>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold">
              The <span className="text-gradient">Circle</span>
            </h1>
            <p className="text-base text-muted-foreground max-w-xl mx-auto leading-relaxed">
              A safe, anonymous space to share experiences and remind each other: you're not alone.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-3 gap-3 mb-6"
          >
            {[
              { label: "Posts", value: posts.length, icon: MessageCircle },
              {
                label: "Likes given",
                value: posts.reduce((s, p) => s + p.likes, 0),
                icon: Heart,
              },
              {
                label: "Replies",
                value: posts.reduce((s, p) => s + p.replies, 0),
                icon: Users,
              },
            ].map((stat) => (
              <div
                key={stat.label}
                className="glass-card rounded-xl p-3 text-center"
              >
                <stat.icon className="w-4 h-4 text-primary mx-auto mb-1" />
                <p className="font-display text-lg font-bold text-foreground">
                  {stat.value}
                </p>
                <p className="text-[10px] text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </motion.div>

          {/* Composer */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="glass-card rounded-2xl p-4 mb-6"
          >
            <textarea
              value={composer}
              onChange={(e) => setComposer(e.target.value)}
              placeholder={
                user
                  ? "What's on your mind? Use #tags to help others find your post."
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
                  Post
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

          {/* Sort + tag filter */}
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
                Be the first to share — every story makes someone feel less alone.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <AnimatePresence initial={false}>
                {visible.map((post) => {
                  const replies = openReplies[post.id];
                  const open = post.id in openReplies;
                  return (
                    <motion.article
                      key={post.id}
                      layout
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="glass-card rounded-2xl p-5"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-2xl">{post.profile.avatar_emoji}</span>
                        <div className="min-w-0">
                          <span className="text-sm font-bold text-foreground">
                            {post.profile.display_name}
                          </span>
                          <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                            <Clock className="w-2.5 h-2.5" />
                            {timeAgo(post.created_at)}
                          </span>
                        </div>
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

                      <div className="flex items-center gap-2 pt-2 border-t border-border/20">
                        <button
                          onClick={() => handleLike(post)}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                            post.liked
                              ? "bg-primary/15 text-primary"
                              : "bg-muted/30 text-muted-foreground hover:bg-primary/10 hover:text-primary"
                          }`}
                        >
                          <Heart
                            className={`w-3.5 h-3.5 ${post.liked ? "fill-current" : ""}`}
                          />
                          {post.likes}
                        </button>
                        <button
                          onClick={() => loadReplies(post.id)}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                            open
                              ? "bg-primary/15 text-primary"
                              : "bg-muted/30 text-muted-foreground hover:bg-primary/10 hover:text-primary"
                          }`}
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          {post.replies}
                        </button>
                      </div>

                      <AnimatePresence>
                        {open && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="mt-4 pt-4 border-t border-border/20 space-y-3">
                              {replies === null && (
                                <div className="flex justify-center py-2">
                                  <Loader2 className="w-4 h-4 text-primary animate-spin" />
                                </div>
                              )}
                              {Array.isArray(replies) &&
                                replies.map((r) => (
                                  <div
                                    key={r.id}
                                    className="bg-muted/20 rounded-xl px-3 py-2.5"
                                  >
                                    <div className="flex items-center gap-2 mb-1">
                                      <span className="text-sm">
                                        {r.profile.avatar_emoji}
                                      </span>
                                      <span className="text-xs font-semibold text-foreground">
                                        {r.profile.display_name}
                                      </span>
                                      <span className="text-[10px] text-muted-foreground">
                                        {timeAgo(r.created_at)}
                                      </span>
                                    </div>
                                    <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">
                                      {r.body}
                                    </p>
                                  </div>
                                ))}

                              <div className="flex gap-2">
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
                                  className="flex-1 px-3 py-2 rounded-xl bg-background/50 border border-border/30 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-60"
                                />
                                <button
                                  onClick={() => submitReply(post.id)}
                                  disabled={
                                    !user ||
                                    !replyDrafts[post.id]?.trim() ||
                                    replying === post.id
                                  }
                                  className="px-3 py-2 rounded-xl bg-primary text-primary-foreground disabled:opacity-40"
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
