import { motion } from "framer-motion";
import { Check, X, Sparkles, Zap, Heart, Shield, Brain, Moon } from "lucide-react";
import mimiMagic from "@/assets/mimi-magic.png";

type Mark = "yes" | "plus" | "partial" | "no";

interface Comparison {
  feature: string;
  emoji: string;
  detail: string;
  mimaura: Mark;
  flo: Mark;
  clue: Mark;
}

const comparisons: Comparison[] = [
  {
    feature: "Cycle & Symptom Tracking",
    emoji: "🗓️",
    detail: "The basics — done well by everyone, deepened by us.",
    mimaura: "plus",
    flo: "yes",
    clue: "yes",
  },
  {
    feature: "Learns YOUR Pattern (not 28-day default)",
    emoji: "✨",
    detail: "Mimaura adapts to irregular, PCOS, perimenopause & chronic cycles.",
    mimaura: "plus",
    flo: "partial",
    clue: "partial",
  },
  {
    feature: "Mental Health × Hormone Insights",
    emoji: "🧠",
    detail: "Why anxiety spikes, motivation drops, mood shifts — explained.",
    mimaura: "plus",
    flo: "partial",
    clue: "no",
  },
  {
    feature: "Mood, Energy & Focus Forecasting",
    emoji: "🌤️",
    detail: "Not just 'period in 3 days' — your whole week, predicted.",
    mimaura: "plus",
    flo: "no",
    clue: "no",
  },
  {
    feature: "Neurodivergent-Friendly (ADHD, Autism)",
    emoji: "💜",
    detail: "Low-stim mode, dyslexia fonts, sensory-aware UI — built in.",
    mimaura: "plus",
    flo: "no",
    clue: "no",
  },
  {
    feature: "Chronic Condition Support",
    emoji: "🩺",
    detail: "PCOS, endo, fibro, thyroid — first-class, not an afterthought.",
    mimaura: "plus",
    flo: "partial",
    clue: "partial",
  },
  {
    feature: "Privacy-First (no data selling, ever)",
    emoji: "🔒",
    detail: "Encrypted, anonymous mode, no third-party tracking.",
    mimaura: "plus",
    flo: "no",
    clue: "yes",
  },
  {
    feature: "Feels Like a Companion, Not a Tool",
    emoji: "🤍",
    detail: "Reassurance, context & emotional check-ins — not just charts.",
    mimaura: "plus",
    flo: "no",
    clue: "no",
  },
  {
    feature: "Cultural & Faith Inclusivity",
    emoji: "🌍",
    detail: "Respects all backgrounds without assumptions.",
    mimaura: "plus",
    flo: "no",
    clue: "partial",
  },
];

const gaps = [
  {
    icon: Brain,
    title: "Their personalisation is shallow",
    description: "Flo & Clue predict dates. They don't connect mood, hormones, lifestyle and chronic symptoms into one picture of YOU.",
  },
  {
    icon: Heart,
    title: "They ignore mental health",
    description: "Why you feel low, anxious, unmotivated — barely touched. Mimaura makes the hormone-mind link the centre of the experience.",
  },
  {
    icon: Shield,
    title: "Trust is fragile",
    description: "Flo was caught sharing data with Facebook. Mimaura is privacy-first by design — encrypted, never sold, anonymous mode available.",
  },
  {
    icon: Sparkles,
    title: "They feel like tools",
    description: "Clue is clinical. Flo is cluttered. Mimaura is the calm, intelligent companion that actually understands you.",
  },
];

const uniqueFeatures = [
  {
    icon: Brain,
    title: "Smart Pattern Learning",
    description: "Our AI doesn't assume a 28-day cycle. It learns YOUR rhythm — irregular, chronic, neurodivergent, all of it.",
    color: "from-primary to-lavender-light",
  },
  {
    icon: Zap,
    title: "Gentle Nudge System",
    description: "Soft, non-prescriptive reminders. No guilt-trips, no streaks, no shame. You stay in control.",
    color: "from-accent to-gold-soft",
  },
  {
    icon: Moon,
    title: "Low-Stim Mode",
    description: "Reduce animations, simplify UI, soften colors — designed for sensory needs and burnout days.",
    color: "from-sky to-mint",
  },
  {
    icon: Heart,
    title: "Chronic Care First",
    description: "PCOS, endo, fibro, thyroid — built in from day one, not bolted on as a 'condition mode'.",
    color: "from-rose to-rose-soft",
  },
];

const renderMark = (mark: Mark, highlight = false) => {
  if (mark === "plus" || mark === "yes") {
    return (
      <div
        className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center ${
          highlight ? "bg-mint/25" : "bg-mint/10"
        }`}
      >
        <Check className={`w-5 h-5 ${highlight ? "text-mint" : "text-mint/60"}`} />
      </div>
    );
  }
  if (mark === "partial") {
    return (
      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-accent/10 flex items-center justify-center">
        <span className="text-accent text-sm font-bold">~</span>
      </div>
    );
  }
  return (
    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-muted flex items-center justify-center">
      <X className="w-5 h-5 text-muted-foreground" />
    </div>
  );
};

const DifferenceSection = () => {
  return (
    <section className="relative py-24 px-4 sm:px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-mint/10 border border-mint/20 mb-6"
          >
            <Shield className="w-4 h-4 text-mint" />
            <span className="text-sm font-medium">Mimaura vs Flo vs Clue</span>
          </motion.div>

          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Why Mimaura, <span className="text-gradient">not Flo or Clue</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Flo and Clue built the first generation of cycle apps. Mimaura is the next one —
            personalised, mental-health aware, neurodivergent-friendly and genuinely private.
          </p>
        </motion.div>

        {/* Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card rounded-3xl p-4 sm:p-6 md:p-8 mb-16 overflow-hidden"
        >
          {/* Desktop header */}
          <div className="hidden sm:grid grid-cols-[1.6fr_1fr_1fr_1fr] gap-3 mb-6 pb-4 border-b border-primary/10 items-center">
            <div className="text-left">
              <span className="font-display font-bold text-muted-foreground">Feature</span>
            </div>
            <div className="text-center">
              <motion.span
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/15 font-display font-bold text-primary text-sm"
                animate={{ scale: [1, 1.03, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Sparkles className="w-4 h-4" />
                Mimaura
              </motion.span>
            </div>
            <div className="text-center">
              <span className="text-muted-foreground font-semibold text-sm">Flo</span>
            </div>
            <div className="text-center">
              <span className="text-muted-foreground font-semibold text-sm">Clue</span>
            </div>
          </div>

          <div className="space-y-3 sm:space-y-2">
            {comparisons.map((item, index) => (
              <motion.div
                key={item.feature}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.06 * index }}
                className="sm:grid sm:grid-cols-[1.6fr_1fr_1fr_1fr] sm:gap-3 sm:items-center py-3 sm:py-3 hover:bg-primary/5 rounded-xl px-3 transition-colors"
              >
                {/* Feature */}
                <div className="mb-3 sm:mb-0">
                  <p className="font-medium flex items-center gap-2">
                    <span className="text-lg">{item.emoji}</span>
                    <span className="text-sm sm:text-base">{item.feature}</span>
                  </p>
                  <p className="text-xs text-muted-foreground ml-8 sm:ml-8 mt-0.5">{item.detail}</p>
                </div>

                {/* Mobile: 3-up row */}
                <div className="grid grid-cols-3 gap-2 sm:hidden ml-8">
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-[10px] font-bold text-primary">Mimaura</span>
                    {renderMark(item.mimaura, true)}
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-[10px] text-muted-foreground">Flo</span>
                    {renderMark(item.flo)}
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-[10px] text-muted-foreground">Clue</span>
                    {renderMark(item.clue)}
                  </div>
                </div>

                {/* Desktop columns */}
                <div className="hidden sm:flex justify-center">
                  <motion.div whileHover={{ scale: 1.15 }} className="flex items-center gap-1">
                    {renderMark(item.mimaura, true)}
                    {item.mimaura === "plus" && (
                      <span className="text-[10px] font-bold text-primary bg-primary/10 px-1.5 py-0.5 rounded-full">
                        +MORE
                      </span>
                    )}
                  </motion.div>
                </div>
                <div className="hidden sm:flex justify-center">{renderMark(item.flo)}</div>
                <div className="hidden sm:flex justify-center">{renderMark(item.clue)}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Where Flo & Clue fall short */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose/10 border border-rose/20 mb-4">
              <AlertCircle className="w-4 h-4 text-rose" />
              <span className="text-sm font-medium">Where the giants fall short</span>
            </div>
            <h3 className="font-display text-2xl sm:text-3xl font-bold">
              The gaps Mimaura was <span className="text-gradient">built to close</span>
            </h3>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
            {gaps.map((gap, i) => (
              <motion.div
                key={gap.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * i }}
                whileHover={{ y: -4 }}
                className="glass-card rounded-3xl p-5 sm:p-6 hover:shadow-float transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-rose/20 to-primary/20 flex items-center justify-center shrink-0">
                    <gap.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-base sm:text-lg mb-1.5">{gap.title}</h4>
                    <p className="text-sm text-muted-foreground">{gap.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Unique features */}
        <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 mb-12">
          {uniqueFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 * index }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <div className="glass-card rounded-3xl p-5 sm:p-6 h-full hover:shadow-float transition-all duration-300 relative overflow-hidden">
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                />
                <div className="relative z-10 flex items-start gap-4">
                  <motion.div
                    whileHover={{ rotate: 10, scale: 1.1 }}
                    className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center shrink-0 shadow-soft`}
                  >
                    <feature.icon className="w-6 h-6 sm:w-7 sm:h-7 text-primary-foreground" />
                  </motion.div>
                  <div>
                    <h3 className="font-display font-bold text-base sm:text-lg mb-1 sm:mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mimi callout */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative glass-card rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6 sm:gap-8"
        >
          <motion.img
            src={mimiMagic}
            alt="Magic Mimi"
            className="w-24 h-24 sm:w-32 sm:h-32 object-contain"
            animate={{ y: [0, -10, 0], rotate: [-3, 3, -3] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="text-center sm:text-left">
            <h3 className="font-display text-xl sm:text-2xl font-bold mb-2">
              Built by the women Flo & Clue forgot
            </h3>
            <p className="text-sm sm:text-base text-muted-foreground">
              Neurodivergent. Chronically ill. Culturally diverse. We built Mimaura because the
              biggest apps in the world still weren't working for us. This is wellness tech,
              rethought from the ground up.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DifferenceSection;
