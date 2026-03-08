import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { ArrowUp, MessageCircle, Send, Loader2 } from "lucide-react";
import { useAuth } from "@/components/AuthProvider";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

interface Experience {
  id: string;
  body: string;
  upvotes: number;
  created_at: string;
  user_id: string;
  profile: {
    display_name: string;
    avatar_emoji: string;
  };
  user_has_upvoted: boolean;
}

interface TermCommunityProps {
  termName: string;
}

const TermCommunity = ({ termName }: TermCommunityProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [newPost, setNewPost] = useState("");
  const [posting, setPosting] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchExperiences = async () => {
    const { data, error } = await supabase
      .from("community_experiences")
      .select("*, profiles!community_experiences_user_id_fkey(display_name, avatar_emoji)")
      .eq("glossary_term", termName)
      .order("upvotes", { ascending: false });

    if (error) {
      console.error("Error fetching experiences:", error);
      setLoading(false);
      return;
    }

    // Check which ones user has upvoted
    let upvotedIds = new Set<string>();
    if (user) {
      const { data: upvotes } = await supabase
        .from("experience_upvotes")
        .select("experience_id")
        .eq("user_id", user.id);
      upvotedIds = new Set((upvotes || []).map((u: { experience_id: string }) => u.experience_id));
    }

    const mapped: Experience[] = (data || []).map((exp: any) => ({
      id: exp.id,
      body: exp.body,
      upvotes: exp.upvotes,
      created_at: exp.created_at,
      user_id: exp.user_id,
      profile: {
        display_name: exp.profiles?.display_name || "Anonymous",
        avatar_emoji: exp.profiles?.avatar_emoji || "🌸",
      },
      user_has_upvoted: upvotedIds.has(exp.id),
    }));

    setExperiences(mapped);
    setLoading(false);
  };

  useEffect(() => {
    fetchExperiences();
  }, [termName, user]);

  const handlePost = async () => {
    if (!user) {
      navigate("/auth");
      return;
    }
    if (!newPost.trim() || posting) return;

    setPosting(true);
    const { error } = await supabase.from("community_experiences").insert({
      user_id: user.id,
      glossary_term: termName,
      body: newPost.trim(),
    });

    if (!error) {
      setNewPost("");
      await fetchExperiences();
    }
    setPosting(false);
  };

  const handleUpvote = async (experienceId: string, hasUpvoted: boolean) => {
    if (!user) {
      navigate("/auth");
      return;
    }

    if (hasUpvoted) {
      await supabase
        .from("experience_upvotes")
        .delete()
        .eq("user_id", user.id)
        .eq("experience_id", experienceId);
    } else {
      await supabase.from("experience_upvotes").insert({
        user_id: user.id,
        experience_id: experienceId,
      });
    }
    await fetchExperiences();
  };

  const timeAgo = (date: string) => {
    const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
    if (seconds < 60) return "just now";
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
  };

  return (
    <div className="mt-5 border-t border-border/30 pt-5">
      <div className="flex items-center gap-2 mb-4">
        <MessageCircle className="w-4 h-4 text-primary" />
        <h4 className="font-display text-sm font-bold text-foreground">
          Community Experiences
        </h4>
        <span className="text-[10px] text-muted-foreground">
          ({experiences.length})
        </span>
      </div>

      {/* Post input */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handlePost()}
          placeholder={user ? "Share your experience..." : "Sign in to share..."}
          maxLength={500}
          className="flex-1 px-3 py-2.5 rounded-xl bg-background/50 border border-border/30 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
        />
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={handlePost}
          disabled={posting || !newPost.trim()}
          className="px-3 py-2.5 rounded-xl bg-primary text-primary-foreground disabled:opacity-40 transition-all"
        >
          {posting ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Send className="w-4 h-4" />
          )}
        </motion.button>
      </div>

      {/* Experiences list */}
      {loading ? (
        <div className="text-center py-4">
          <Loader2 className="w-5 h-5 animate-spin text-primary mx-auto" />
        </div>
      ) : experiences.length === 0 ? (
        <p className="text-xs text-muted-foreground text-center py-4">
          No experiences shared yet. Be the first! 💜
        </p>
      ) : (
        <div className="space-y-3 max-h-80 overflow-y-auto">
          <AnimatePresence>
            {experiences.map((exp) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-muted/20 rounded-xl px-4 py-3 border border-border/20"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm">{exp.profile.avatar_emoji}</span>
                  <span className="text-xs font-medium text-foreground">
                    {exp.profile.display_name}
                  </span>
                  <span className="text-[10px] text-muted-foreground">
                    {timeAgo(exp.created_at)}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-2">
                  {exp.body}
                </p>
                <button
                  onClick={() => handleUpvote(exp.id, exp.user_has_upvoted)}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium transition-all ${
                    exp.user_has_upvoted
                      ? "bg-primary/15 text-primary"
                      : "bg-muted/30 text-muted-foreground hover:bg-primary/10 hover:text-primary"
                  }`}
                >
                  <ArrowUp className="w-3 h-3" />
                  {exp.upvotes}
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default TermCommunity;
