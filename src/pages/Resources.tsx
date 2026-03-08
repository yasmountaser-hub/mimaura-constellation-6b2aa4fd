import { motion } from "framer-motion";
import { BookOpen, Clock, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingParticles from "@/components/FloatingParticles";
import CursorGlow from "@/components/CursorGlow";
import AccessibilityPanel from "@/components/AccessibilityPanel";
import mimiSmart from "@/assets/mimi-smart.png";

const categories = [
  { label: "Cycles & Hormones", emoji: "🌙", color: "primary" },
  { label: "ADHD & Neurodiversity", emoji: "🧠", color: "accent" },
  { label: "Mental Health", emoji: "💜", color: "lavender" },
  { label: "Nutrition & Movement", emoji: "🥑", color: "mint" },
];

const articles = [
  {
    title: "Why Your ADHD Feels Worse Before Your Period",
    category: "ADHD & Neurodiversity",
    emoji: "🧠",
    readTime: "5 min",
    summary: "Estrogen drops affect dopamine levels — here's the science behind why focus crashes in your luteal phase and what you can do about it.",
    comingSoon: false,
  },
  {
    title: "The 4 Cycle Phases Explained (Without the Medical Jargon)",
    category: "Cycles & Hormones",
    emoji: "🌙",
    readTime: "7 min",
    summary: "A beginner-friendly, neurodivergent-accessible guide to understanding menstrual, follicular, ovulatory, and luteal phases.",
    comingSoon: false,
  },
  {
    title: "Sensory Overload & Your Cycle: The Connection Nobody Talks About",
    category: "ADHD & Neurodiversity",
    emoji: "🧠",
    readTime: "6 min",
    summary: "Your sensory sensitivity can fluctuate with your hormones. Learn to anticipate and prepare for high-sensitivity days.",
    comingSoon: true,
  },
  {
    title: "Gentle Movement for Every Phase",
    category: "Nutrition & Movement",
    emoji: "🥑",
    readTime: "4 min",
    summary: "Not every day is a HIIT day. Phase-aligned movement suggestions that honor where your body is right now.",
    comingSoon: true,
  },
  {
    title: "Anxiety vs. Hormones: How to Tell the Difference",
    category: "Mental Health",
    emoji: "💜",
    readTime: "6 min",
    summary: "Sometimes anxiety is situational, sometimes it's hormonal. Here's how to start noticing the patterns.",
    comingSoon: true,
  },
  {
    title: "The Executive Dysfunction Survival Guide",
    category: "ADHD & Neurodiversity",
    emoji: "🧠",
    readTime: "8 min",
    summary: "Practical, no-shame strategies for when your brain won't cooperate — especially during hormone shifts.",
    comingSoon: true,
  },
];

const Resources = () => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <FloatingParticles />
      <CursorGlow />
      <Header />
      <AccessibilityPanel />

      <main className="pt-28 pb-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12 space-y-4"
          >
            <motion.img
              src={mimiSmart}
              alt="Smart Mimi"
              className="w-20 h-20 object-contain mx-auto mb-4"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold">
              The <span className="text-gradient">Learning</span> Corner
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Articles, guides, and resources written with neurodivergent minds in mind. No jargon, no judgment.
            </p>
          </motion.div>

          {/* Category pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            {categories.map((cat) => (
              <button
                key={cat.label}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border/50 hover:border-primary/30 hover:bg-primary/5 transition-all text-sm font-medium"
              >
                <span>{cat.emoji}</span>
                <span className="text-foreground">{cat.label}</span>
              </button>
            ))}
          </motion.div>

          {/* Articles grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article, i) => (
              <motion.article
                key={article.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i }}
                className="group relative glass-card rounded-2xl p-6 flex flex-col hover:shadow-float transition-all duration-300 hover:-translate-y-1 cursor-pointer"
              >
                {article.comingSoon && (
                  <span className="absolute top-4 right-4 px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider">
                    Coming Soon
                  </span>
                )}

                <span className="text-3xl mb-3">{article.emoji}</span>

                <span className="text-[10px] font-bold uppercase tracking-widest text-primary mb-2">
                  {article.category}
                </span>

                <h3 className="font-display text-lg font-bold text-foreground mb-2 leading-snug group-hover:text-primary transition-colors">
                  {article.title}
                </h3>

                <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-4">
                  {article.summary}
                </p>

                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    {article.readTime} read
                  </span>
                  <span className="flex items-center gap-1 text-xs font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    Read <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </motion.article>
            ))}
          </div>

          {/* Newsletter CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-16 glass-card rounded-3xl p-8 sm:p-10 text-center"
          >
            <BookOpen className="w-8 h-8 text-primary mx-auto mb-3" />
            <p className="text-2xl font-display font-bold mb-2">
              New articles dropping soon 📬
            </p>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Join the waitlist to get notified when we publish new resources.
            </p>
            <a
              href="/#waitlist"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium text-primary-foreground"
              style={{ background: "var(--gradient-button)" }}
            >
              Stay in the Loop ✨
            </a>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Resources;
