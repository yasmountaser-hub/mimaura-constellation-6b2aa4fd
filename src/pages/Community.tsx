import { motion } from "framer-motion";
import { useState } from "react";
import { MessageCircle, Heart, ArrowUp, Clock, Users, Filter, TrendingUp, Sparkles } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingParticles from "@/components/FloatingParticles";
import CursorGlow from "@/components/CursorGlow";
import AccessibilityPanel from "@/components/AccessibilityPanel";

interface Post {
  id: number;
  author: string;
  avatar: string;
  flair: string;
  flairColor: string;
  title: string;
  body: string;
  upvotes: number;
  comments: number;
  timeAgo: string;
  tags: string[];
}

const posts: Post[] = [
  {
    id: 1,
    author: "luna_moth",
    avatar: "🦋",
    flair: "ADHD + PMDD warrior",
    flairColor: "primary",
    title: "Anyone else's ADHD meds feel less effective in their luteal phase?",
    body: "I've been tracking with Mimaura for 3 months and I can clearly see my focus drops about 5 days before my period. My psychiatrist said it's because estrogen affects how Adderall is metabolized. Has anyone found strategies that help during this time?",
    upvotes: 247,
    comments: 63,
    timeAgo: "4h ago",
    tags: ["ADHD", "Medication", "Luteal Phase"],
  },
  {
    id: 2,
    author: "gentle_storm",
    avatar: "🌿",
    flair: "Autistic + cyclist",
    flairColor: "accent",
    title: "My sensory overload survival kit (updated for each cycle phase)",
    body: "I made a phase-specific sensory kit and it's been a game changer! Follicular: I can handle more, so I tackle noisy errands. Luteal: noise-cancelling earbuds are NON-NEGOTIABLE. Period: weighted blanket, dim lights, no plans. Sharing in case it helps anyone else 💜",
    upvotes: 389,
    comments: 91,
    timeAgo: "7h ago",
    tags: ["Sensory", "Self-care", "Tips"],
  },
  {
    id: 3,
    author: "brain_fog_queen",
    avatar: "☁️",
    flair: "Late-diagnosed ADHDer",
    flairColor: "lavender",
    title: "I cried when Mimi told me my pattern",
    body: "Mimi showed me that my 'random' crying days happen exactly 3 days before my period EVERY month. I genuinely thought I was just emotional for no reason. Seeing the pattern laid out so gently... I don't feel broken anymore. I feel understood.",
    upvotes: 512,
    comments: 127,
    timeAgo: "12h ago",
    tags: ["Patterns", "Emotional", "Mimi"],
  },
  {
    id: 4,
    author: "cycle_syncer",
    avatar: "🌙",
    flair: "Menstrual health advocate",
    flairColor: "rose",
    title: "Phase-aligned work schedule: how I pitched it to my boss",
    body: "I used 6 months of Mimaura data to show my manager that my productivity naturally peaks in my follicular phase. I now schedule creative work then and admin tasks during luteal. My output actually improved. Happy to share my template if anyone wants it!",
    upvotes: 198,
    comments: 45,
    timeAgo: "1d ago",
    tags: ["Work", "Productivity", "Cycle Syncing"],
  },
  {
    id: 5,
    author: "dopamine_detective",
    avatar: "🔎",
    flair: "ADHD researcher",
    flairColor: "primary",
    title: "PSA: Iron deficiency can mimic/worsen ADHD symptoms during your period",
    body: "Heavy periods = lower iron = worse brain fog, fatigue, and focus. I started supplementing iron (with my doctor's approval) and the difference during my period is significant. Get your ferritin checked, not just hemoglobin!",
    upvotes: 431,
    comments: 78,
    timeAgo: "1d ago",
    tags: ["ADHD", "Health", "PSA"],
  },
];

const sortOptions = [
  { label: "Trending", icon: TrendingUp },
  { label: "New", icon: Sparkles },
  { label: "Top", icon: ArrowUp },
];

const Community = () => {
  const [activeSort, setActiveSort] = useState("Trending");
  const [votedPosts, setVotedPosts] = useState<Set<number>>(new Set());

  const handleVote = (postId: number) => {
    setVotedPosts((prev) => {
      const next = new Set(prev);
      if (next.has(postId)) next.delete(postId);
      else next.add(postId);
      return next;
    });
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <FloatingParticles />
      <CursorGlow />
      <Header />
      <AccessibilityPanel />

      <main className="pt-28 pb-20 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10 space-y-4"
          >
            <span className="text-5xl">💬</span>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold">
              The <span className="text-gradient">Circle</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              A safe, anonymous space to share experiences, swap strategies, and remind each other: you're not alone.
            </p>
          </motion.div>

          {/* Community stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-3 gap-3 mb-8"
          >
            {[
              { label: "Members", value: "2.4k", icon: Users },
              { label: "Posts today", value: "47", icon: MessageCircle },
              { label: "Upvotes given", value: "12k", icon: Heart },
            ].map((stat) => (
              <div
                key={stat.label}
                className="glass-card rounded-xl p-4 text-center"
              >
                <stat.icon className="w-4 h-4 text-primary mx-auto mb-1" />
                <p className="font-display text-xl font-bold text-foreground">{stat.value}</p>
                <p className="text-[10px] text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </motion.div>

          {/* Sort + Filter bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="flex items-center gap-2 mb-6 overflow-x-auto pb-1"
          >
            {sortOptions.map((opt) => (
              <button
                key={opt.label}
                onClick={() => setActiveSort(opt.label)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  activeSort === opt.label
                    ? "bg-primary text-primary-foreground shadow-soft"
                    : "bg-card border border-border/50 text-muted-foreground hover:text-foreground"
                }`}
              >
                <opt.icon className="w-3.5 h-3.5" />
                {opt.label}
              </button>
            ))}
            <div className="flex-1" />
            <button className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-card border border-border/50 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <Filter className="w-3.5 h-3.5" />
              Filter
            </button>
          </motion.div>

          {/* Posts */}
          <div className="space-y-4">
            {posts.map((post, i) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * i }}
                className="glass-card rounded-2xl p-5 hover:shadow-card transition-all"
              >
                {/* Author line */}
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">{post.avatar}</span>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-bold text-foreground">
                        {post.author}
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[9px] font-bold uppercase tracking-wider">
                        {post.flair}
                      </span>
                    </div>
                    <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                      <Clock className="w-2.5 h-2.5" />
                      {post.timeAgo}
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-display text-base sm:text-lg font-bold text-foreground mb-2 leading-snug cursor-pointer hover:text-primary transition-colors">
                  {post.title}
                </h3>

                {/* Body preview */}
                <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-3">
                  {post.body}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-full bg-muted/50 text-[10px] font-medium text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => handleVote(post.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                      votedPosts.has(post.id)
                        ? "bg-primary/15 text-primary"
                        : "bg-muted/30 text-muted-foreground hover:bg-primary/10 hover:text-primary"
                    }`}
                  >
                    <ArrowUp className="w-4 h-4" />
                    {post.upvotes + (votedPosts.has(post.id) ? 1 : 0)}
                  </button>
                  <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted/30 text-sm text-muted-foreground hover:bg-primary/10 hover:text-primary transition-all">
                    <MessageCircle className="w-4 h-4" />
                    {post.comments}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Coming soon banner */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-12 glass-card rounded-3xl p-8 sm:p-10 text-center"
          >
            <span className="text-4xl mb-3 block">🚀</span>
            <p className="text-2xl font-display font-bold mb-2">
              The Circle is launching soon
            </p>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto leading-relaxed">
              This is a preview of what our community will look like. Join the waitlist to be among the first members — and help set the culture.
            </p>
            <a
              href="/#waitlist"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium text-primary-foreground"
              style={{ background: "var(--gradient-button)" }}
            >
              Join The Circle ✨
            </a>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Community;
