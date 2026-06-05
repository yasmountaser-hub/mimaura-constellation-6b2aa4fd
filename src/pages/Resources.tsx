import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { BookOpen, Clock, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingParticles from "@/components/FloatingParticles";
import CursorGlow from "@/components/CursorGlow";
import AccessibilityPanel from "@/components/AccessibilityPanel";
import mimiSmart from "@/assets/mimi-smart.webp";
import { articles } from "@/data/articles";

const categories = [
  { label: "Cycles & Hormones", emoji: "🌙" },
  { label: "ADHD & Neurodiversity", emoji: "🧠" },
  { label: "Mental Health", emoji: "💜" },
  { label: "Nutrition & Movement", emoji: "🥑" },
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

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            {categories.map((cat) => (
              <span
                key={cat.label}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border/50 text-sm font-medium"
              >
                <span>{cat.emoji}</span>
                <span className="text-foreground">{cat.label}</span>
              </span>
            ))}
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article, i) => (
              <motion.div
                key={article.slug}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * i }}
              >
                <Link
                  to={`/resources/${article.slug}`}
                  className="group relative glass-card rounded-2xl p-6 flex flex-col hover:shadow-float transition-all duration-300 hover:-translate-y-1 h-full"
                >
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
                </Link>
              </motion.div>
            ))}
          </div>

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
            <Link
              to="/#waitlist"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium text-primary-foreground"
              style={{ background: "var(--gradient-button)" }}
            >
              Stay in the Loop ✨
            </Link>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Resources;
