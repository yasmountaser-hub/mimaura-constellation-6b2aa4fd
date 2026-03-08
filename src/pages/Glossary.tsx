import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Search, AlertTriangle, Heart, Lightbulb, ChevronRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingParticles from "@/components/FloatingParticles";
import CursorGlow from "@/components/CursorGlow";
import AccessibilityPanel from "@/components/AccessibilityPanel";
import { glossaryTerms, glossaryCategories } from "@/data/glossaryTerms";
import TermCommunity from "@/components/TermCommunity";

const Glossary = () => {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [expandedTerm, setExpandedTerm] = useState<string | null>(null);

  const filtered = glossaryTerms.filter((t) => {
    const matchesSearch =
      t.term.toLowerCase().includes(search.toLowerCase()) ||
      t.definition.toLowerCase().includes(search.toLowerCase());
    const matchesCat = activeCategory === "All" || t.category === activeCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="min-h-screen relative overflow-hidden">
      <FloatingParticles />
      <CursorGlow />
      <Header />
      <AccessibilityPanel />

      <main className="pt-28 pb-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12 space-y-4"
          >
            <span className="text-5xl">📖</span>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold">
              Mental Health <span className="text-gradient">Glossary</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Real terms, real signs, real strategies. No gatekeeping, no shame — just understanding.
            </p>
          </motion.div>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="relative mb-6"
          >
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search terms..."
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-card border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
            />
          </motion.div>

          {/* Category filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="flex flex-wrap gap-2 mb-10"
          >
            {glossaryCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground shadow-soft"
                    : "bg-card border border-border/50 text-muted-foreground hover:text-foreground hover:border-primary/30"
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>

          {/* Terms */}
          <div className="space-y-4">
            <AnimatePresence mode="popLayout">
              {filtered.map((term, i) => (
                <motion.div
                  key={term.term}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: i * 0.05 }}
                  className="glass-card rounded-2xl overflow-hidden"
                >
                  <button
                    onClick={() =>
                      setExpandedTerm(expandedTerm === term.term ? null : term.term)
                    }
                    className="w-full flex items-center gap-4 px-5 py-5 text-left hover:bg-primary/5 transition-colors"
                  >
                    <span className="text-3xl">{term.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-display text-lg font-bold text-foreground">
                          {term.term}
                        </h3>
                        <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider">
                          {term.category}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1 leading-relaxed line-clamp-2">
                        {term.definition}
                      </p>
                    </div>
                    <motion.div
                      animate={{ rotate: expandedTerm === term.term ? 90 : 0 }}
                      className="shrink-0"
                    >
                      <ChevronRight className="w-5 h-5 text-muted-foreground" />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {expandedTerm === term.term && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-6 space-y-5 border-t border-border/30 pt-5">
                          {/* Full definition */}
                          <p className="text-sm text-foreground leading-relaxed">
                            {term.definition}
                          </p>

                          {/* Signs */}
                          <div>
                            <div className="flex items-center gap-2 mb-3">
                              <AlertTriangle className="w-4 h-4 text-accent" />
                              <h4 className="font-display text-sm font-bold text-foreground">
                                How to spot it
                              </h4>
                            </div>
                            <ul className="space-y-2">
                              {term.signs.map((sign) => (
                                <li
                                  key={sign}
                                  className="flex items-start gap-2 text-sm text-muted-foreground"
                                >
                                  <span className="text-accent mt-0.5 shrink-0">•</span>
                                  <span className="leading-relaxed">{sign}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* What to do */}
                          <div>
                            <div className="flex items-center gap-2 mb-3">
                              <Heart className="w-4 h-4 text-primary" />
                              <h4 className="font-display text-sm font-bold text-foreground">
                                What you can do
                              </h4>
                            </div>
                            <ul className="space-y-2">
                              {term.whatToDo.map((action) => (
                                <li
                                  key={action}
                                  className="flex items-start gap-2 text-sm text-muted-foreground"
                                >
                                  <span className="text-primary mt-0.5 shrink-0">✦</span>
                                  <span className="leading-relaxed">{action}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Disclaimer */}
                          <div className="bg-muted/30 rounded-xl px-4 py-3 border border-border/30">
                            <p className="text-[11px] text-muted-foreground leading-relaxed">
                              💜 This is educational content, not medical advice. If you're struggling, please reach out to a qualified professional. You deserve support.
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </AnimatePresence>

            {filtered.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
              >
                <span className="text-4xl mb-4 block">🔍</span>
                <p className="text-muted-foreground">No terms found. Try a different search?</p>
              </motion.div>
            )}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-16 glass-card rounded-3xl p-8 sm:p-10 text-center"
          >
            <Lightbulb className="w-8 h-8 text-primary mx-auto mb-3" />
            <p className="text-2xl font-display font-bold mb-2">
              Know a term we should add? 💡
            </p>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              This glossary grows with our community. Join the waitlist to suggest terms and help others.
            </p>
            <a
              href="/#waitlist"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium text-primary-foreground"
              style={{ background: "var(--gradient-button)" }}
            >
              Join & Contribute ✨
            </a>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Glossary;
