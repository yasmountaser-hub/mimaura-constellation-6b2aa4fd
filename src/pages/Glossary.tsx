import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Search, AlertTriangle, Heart, Lightbulb, ChevronRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingParticles from "@/components/FloatingParticles";
import CursorGlow from "@/components/CursorGlow";
import AccessibilityPanel from "@/components/AccessibilityPanel";

interface Term {
  term: string;
  emoji: string;
  category: string;
  definition: string;
  signs: string[];
  whatToDo: string[];
}

const terms: Term[] = [
  {
    term: "Executive Dysfunction",
    emoji: "🧊",
    category: "ADHD",
    definition: "Difficulty starting, organizing, or completing tasks — not due to laziness, but because the brain's 'manager' system isn't cooperating. Often worsens during hormonal shifts.",
    signs: [
      "Staring at a task for ages but can't start",
      "Knowing what to do but feeling physically stuck",
      "Forgetting steps mid-task",
      "Feeling overwhelmed by simple decisions",
    ],
    whatToDo: [
      "Break tasks into the smallest possible steps",
      "Use body doubling (work alongside someone)",
      "Set timers for 5-minute 'just start' sprints",
      "Remove friction — prep everything before you need it",
      "Be kind to yourself — this is neurological, not a character flaw",
    ],
  },
  {
    term: "Sensory Overload",
    emoji: "🔊",
    category: "Neurodiversity",
    definition: "When your brain receives more sensory input than it can process, leading to distress, shutdown, or meltdown. Can be triggered by noise, light, textures, or social situations.",
    signs: [
      "Sudden irritability or anxiety in busy environments",
      "Need to cover ears, close eyes, or escape",
      "Difficulty concentrating when there's background noise",
      "Feeling 'touched out' or skin-crawling sensation",
    ],
    whatToDo: [
      "Identify your top triggers and plan around them",
      "Keep noise-cancelling earbuds accessible",
      "Create a sensory 'safe space' at home",
      "Use Mimaura's low-stim mode during overload periods",
      "Schedule recovery time after intense sensory experiences",
    ],
  },
  {
    term: "Rejection Sensitive Dysphoria (RSD)",
    emoji: "💔",
    category: "ADHD",
    definition: "Intense emotional pain triggered by perceived rejection or criticism. It's not being 'too sensitive' — it's a neurological response common in ADHD that can intensify during the luteal phase.",
    signs: [
      "Extreme emotional reactions to mild criticism",
      "Avoiding situations where rejection is possible",
      "People-pleasing to prevent perceived rejection",
      "Replaying conversations looking for signs of disapproval",
    ],
    whatToDo: [
      "Name it — 'this is RSD, not reality'",
      "Wait 24 hours before reacting to perceived rejection",
      "Track if intensity correlates with your cycle phase",
      "Practice self-compassion scripts",
      "Talk to a neurodivergent-aware therapist",
    ],
  },
  {
    term: "Emotional Dysregulation",
    emoji: "🌊",
    category: "Mental Health",
    definition: "Difficulty managing emotional responses — emotions feel bigger, last longer, and are harder to recover from than expected. Common in ADHD, autism, and can fluctuate with hormones.",
    signs: [
      "Crying or rage that feels disproportionate to the trigger",
      "Difficulty calming down once upset",
      "Emotional reactions that surprise even you",
      "Mood shifts that feel uncontrollable",
    ],
    whatToDo: [
      "Track emotional intensity alongside your cycle",
      "Practice grounding techniques (5-4-3-2-1 senses)",
      "Identify your 'window of tolerance' and respect it",
      "Communicate needs to loved ones proactively",
      "Consider if hormonal fluctuations are amplifying emotions",
    ],
  },
  {
    term: "Masking",
    emoji: "🎭",
    category: "Neurodiversity",
    definition: "Consciously or unconsciously hiding neurodivergent traits to appear 'normal.' It's exhausting and can lead to burnout, identity confusion, and late diagnosis — especially in women.",
    signs: [
      "Feeling exhausted after social interactions",
      "Acting differently in public vs. private",
      "Suppressing stims, tics, or natural behaviors",
      "Not knowing who you 'really are' underneath",
    ],
    whatToDo: [
      "Start noticing when and where you mask most",
      "Create safe spaces where you can unmask",
      "Practice small acts of authenticity daily",
      "Connect with neurodivergent communities",
      "Remember: masking is a survival skill, not a flaw",
    ],
  },
  {
    term: "PMDD (Premenstrual Dysphoric Disorder)",
    emoji: "🌑",
    category: "Cycles",
    definition: "A severe form of PMS that causes intense mood changes, depression, irritability, and anxiety in the 1-2 weeks before your period. It's not 'just PMS' — it's a recognized medical condition.",
    signs: [
      "Severe depression or hopelessness before your period",
      "Intense anxiety or panic attacks cyclically",
      "Rage or irritability that disrupts relationships",
      "Feeling like a different person in your luteal phase",
    ],
    whatToDo: [
      "Track symptoms for 2-3 cycles to confirm the pattern",
      "Talk to a doctor who takes PMDD seriously",
      "Join PMDD support communities (you're not alone)",
      "Consider cycle-specific treatment options",
      "Use Mimaura to document and share patterns with your provider",
    ],
  },
  {
    term: "Burnout",
    emoji: "🔥",
    category: "Mental Health",
    definition: "Chronic physical and emotional exhaustion from prolonged stress. Neurodivergent people are especially vulnerable due to the extra energy spent on masking, executive function, and sensory management.",
    signs: [
      "Exhaustion that sleep doesn't fix",
      "Cynicism or detachment from things you used to enjoy",
      "Reduced ability to function in daily tasks",
      "Increased sensitivity to everything",
    ],
    whatToDo: [
      "This is not a productivity problem — reduce demands",
      "Identify and eliminate unnecessary masking situations",
      "Prioritize rest without guilt",
      "Seek professional support early",
      "Track energy patterns — some cycle phases are more vulnerable",
    ],
  },
  {
    term: "Dissociation",
    emoji: "🫧",
    category: "Mental Health",
    definition: "Feeling disconnected from your body, thoughts, or surroundings. It's a spectrum — from mild 'zoning out' to feeling like you're watching yourself from outside your body.",
    signs: [
      "Feeling 'not real' or like you're in a dream",
      "Time passing without awareness",
      "Emotional numbness or feeling disconnected",
      "Difficulty remembering parts of your day",
    ],
    whatToDo: [
      "Grounding: hold ice, smell something strong, feel textures",
      "Name 5 things you can see, 4 you can hear, 3 you can touch",
      "Move your body — stomp, stretch, splash cold water",
      "If frequent, talk to a trauma-informed therapist",
      "Track occurrences — they may correlate with cycle phases",
    ],
  },
];

const categories = ["All", "ADHD", "Neurodiversity", "Mental Health", "Cycles"];

const Glossary = () => {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [expandedTerm, setExpandedTerm] = useState<string | null>(null);

  const filtered = terms.filter((t) => {
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
            {categories.map((cat) => (
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
