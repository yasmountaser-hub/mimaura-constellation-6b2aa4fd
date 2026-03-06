import { motion } from "framer-motion";
import { Check, X, Sparkles, Zap, Heart, Shield, Brain, Moon } from "lucide-react";
import mimiMagic from "@/assets/mimi-magic.png";

const comparisons = [
  {
    feature: "Period & Cycle Tracking",
    emoji: "🗓️",
    mimaura: "plus",
    others: true,
    detail: "Basic tracking + AI-powered pattern insights",
  },
  {
    feature: "Symptom Logging",
    emoji: "📊",
    mimaura: "plus",
    others: true,
    detail: "100+ symptoms + custom tracking tailored to you",
  },
  {
    feature: "Reminders & Notifications",
    emoji: "🔔",
    mimaura: "plus",
    others: true,
    detail: "Gentle, trauma-informed nudges (never guilt trips!)",
  },
  {
    feature: "Neurodivergent-Friendly Design",
    emoji: "🧠",
    mimaura: "plus",
    others: false,
    detail: "Low-stim mode, ADHD-friendly UI, no overwhelm",
  },
  {
    feature: "AI Pattern Recognition",
    emoji: "✨",
    mimaura: "plus",
    others: "partial",
    detail: "Learns YOUR unique patterns, not generic 28-day cycles",
  },
  {
    feature: "Chronic Condition Support",
    emoji: "💜",
    mimaura: "plus",
    others: false,
    detail: "Built for PCOS, endo, fibro & more from day one",
  },
  {
    feature: "Cultural & Faith Inclusivity",
    emoji: "🌍",
    mimaura: "plus",
    others: false,
    detail: "Respects all backgrounds without assumptions",
  },
  {
    feature: "100% Data Privacy",
    emoji: "🔒",
    mimaura: "plus",
    others: "partial",
    detail: "Never sold, never shared, always encrypted",
  },
];

const uniqueFeatures = [
  {
    icon: Brain,
    title: "Smart Pattern Learning",
    description: "Our AI doesn't assume a 28-day cycle. It learns YOUR patterns over time.",
    color: "from-primary to-lavender-light",
  },
  {
    icon: Zap,
    title: "Gentle Nudge System",
    description: "Soft reminders that help without overwhelming. You're in control.",
    color: "from-accent to-gold-soft",
  },
  {
    icon: Moon,
    title: "Low-Stim Mode",
    description: "Reduce animations, simplify UI, gentle colors — designed for sensory needs.",
    color: "from-sky to-mint",
  },
  {
    icon: Heart,
    title: "Chronic Care First",
    description: "Built with chronic conditions in mind, not as an afterthought.",
    color: "from-rose to-rose-soft",
  },
];

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
            <span className="text-sm font-medium">Why We're Different</span>
          </motion.div>

          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Not Just <span className="text-gradient">Another</span> Tracker
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            We built Mimaura because existing apps weren't working for us. 
            Here's what makes the difference.
          </p>
        </motion.div>

        {/* Comparison — Card style on mobile, table on desktop */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card rounded-3xl p-4 sm:p-6 md:p-8 mb-16 overflow-hidden"
        >
          {/* Table header — hidden on mobile */}
          <div className="hidden sm:grid grid-cols-3 gap-4 mb-6 pb-4 border-b border-primary/10">
            <div className="text-left">
              <span className="font-display font-bold text-muted-foreground">Feature</span>
            </div>
            <div className="text-center">
              <motion.span
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 font-display font-bold text-primary"
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Sparkles className="w-4 h-4" />
                Mimaura
              </motion.span>
            </div>
            <div className="text-center">
              <span className="text-muted-foreground font-medium">Other Apps</span>
            </div>
          </div>

          {/* Comparison rows — stacked cards on mobile */}
          <div className="space-y-3 sm:space-y-4">
            {comparisons.map((item, index) => (
              <motion.div
                key={item.feature}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index }}
                className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-center py-3 sm:py-4 hover:bg-primary/5 rounded-xl px-3 transition-colors"
              >
                {/* Feature name */}
                <div className="mb-2 sm:mb-0">
                  <p className="font-medium flex items-center gap-2">
                    <span className="text-lg">{item.emoji}</span>
                    <span className="text-sm sm:text-base">{item.feature}</span>
                  </p>
                  <p className="text-xs text-muted-foreground ml-8 sm:ml-0 mt-0.5">{item.detail}</p>
                </div>

                {/* Mobile: side-by-side comparison */}
                <div className="flex sm:hidden items-center gap-3 ml-8 mt-2">
                  <div className="flex items-center gap-1.5">
                    <div className="w-7 h-7 rounded-full bg-mint/20 flex items-center justify-center">
                      <Check className="w-4 h-4 text-mint" />
                    </div>
                    <span className="text-xs font-bold text-primary">Mimaura</span>
                    {item.mimaura === "plus" && (
                      <span className="text-[10px] font-bold text-primary bg-primary/10 px-1.5 py-0.5 rounded-full">+</span>
                    )}
                  </div>
                  <span className="text-muted-foreground/40">vs</span>
                  <div className="flex items-center gap-1.5">
                    {item.others === true ? (
                      <div className="w-7 h-7 rounded-full bg-mint/10 flex items-center justify-center">
                        <Check className="w-4 h-4 text-mint/60" />
                      </div>
                    ) : item.others === "partial" ? (
                      <div className="w-7 h-7 rounded-full bg-accent/10 flex items-center justify-center">
                        <span className="text-accent text-xs">~</span>
                      </div>
                    ) : (
                      <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center">
                        <X className="w-4 h-4 text-muted-foreground" />
                      </div>
                    )}
                    <span className="text-xs text-muted-foreground">Others</span>
                  </div>
                </div>

                {/* Desktop: Mimaura column */}
                <div className="hidden sm:flex justify-center">
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    className="flex items-center gap-1"
                  >
                    <div className="w-10 h-10 rounded-full bg-mint/20 flex items-center justify-center">
                      <Check className="w-5 h-5 text-mint" />
                    </div>
                    {item.mimaura === "plus" && (
                      <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">+MORE</span>
                    )}
                  </motion.div>
                </div>

                {/* Desktop: Others column */}
                <div className="hidden sm:flex justify-center">
                  {item.others === true ? (
                    <div className="w-10 h-10 rounded-full bg-mint/10 flex items-center justify-center">
                      <Check className="w-5 h-5 text-mint/60" />
                    </div>
                  ) : item.others === "partial" ? (
                    <div className="flex items-center gap-1">
                      <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                        <span className="text-accent text-sm">~</span>
                      </div>
                      <span className="text-xs text-muted-foreground">limited</span>
                    </div>
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                      <X className="w-5 h-5 text-muted-foreground" />
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Unique features grid */}
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
              Built Different, On Purpose
            </h3>
            <p className="text-sm sm:text-base text-muted-foreground">
              Every feature in Mimaura was designed by people who've struggled with traditional 
              health apps. We're not just adding "accessibility features" — we're rethinking 
              wellness tech from the ground up.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DifferenceSection;
