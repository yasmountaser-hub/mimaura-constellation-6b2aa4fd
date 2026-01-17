import { motion } from "framer-motion";
import { Check, X, Sparkles, Zap, Heart, Shield, Brain, Moon } from "lucide-react";
import mimiMagic from "@/assets/mimi-magic.png";

const comparisons = [
  {
    feature: "Neurodivergent-friendly design",
    mimaura: true,
    others: false,
    detail: "Low-stim mode, gentle nudges, no guilt trips",
  },
  {
    feature: "Pattern recognition that learns YOU",
    mimaura: true,
    others: false,
    detail: "AI that adapts to your unique rhythms, not generic cycles",
  },
  {
    feature: "Chronic condition support",
    mimaura: true,
    others: false,
    detail: "Built for PCOS, endo, fibro, and more",
  },
  {
    feature: "Cultural & faith inclusivity",
    mimaura: true,
    others: false,
    detail: "Respects all backgrounds without assumptions",
  },
  {
    feature: "Trauma-informed approach",
    mimaura: true,
    others: false,
    detail: "No pushy notifications or guilt-inducing language",
  },
  {
    feature: "100% data privacy",
    mimaura: true,
    others: false,
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
    <section className="relative py-24 px-6 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
          animate={{ y: [0, 30, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
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

          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Not Just <span className="text-gradient">Another</span> Tracker
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We built Mimaura because existing apps weren't working for us. 
            Here's what makes the difference.
          </p>
        </motion.div>

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card rounded-3xl p-6 md:p-8 mb-16 overflow-hidden"
        >
          {/* Table header */}
          <div className="grid grid-cols-3 gap-4 mb-6 pb-4 border-b border-primary/10">
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

          {/* Comparison rows */}
          <div className="space-y-4">
            {comparisons.map((item, index) => (
              <motion.div
                key={item.feature}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index }}
                className="grid grid-cols-3 gap-4 items-center py-4 hover:bg-primary/5 rounded-xl px-3 transition-colors"
              >
                <div>
                  <p className="font-medium">{item.feature}</p>
                  <p className="text-xs text-muted-foreground">{item.detail}</p>
                </div>
                <div className="flex justify-center">
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    className="w-10 h-10 rounded-full bg-mint/20 flex items-center justify-center"
                  >
                    <Check className="w-5 h-5 text-mint" />
                  </motion.div>
                </div>
                <div className="flex justify-center">
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                    <X className="w-5 h-5 text-muted-foreground" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Unique features grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
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
              <div className="glass-card rounded-3xl p-6 h-full hover:shadow-float transition-all duration-300 relative overflow-hidden">
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                />
                <div className="relative z-10 flex items-start gap-4">
                  <motion.div
                    whileHover={{ rotate: 10, scale: 1.1 }}
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center shrink-0 shadow-soft`}
                  >
                    <feature.icon className="w-7 h-7 text-white" />
                  </motion.div>
                  <div>
                    <h3 className="font-display font-bold text-lg mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
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
          className="relative glass-card rounded-3xl p-8 flex flex-col md:flex-row items-center gap-8"
        >
          <motion.img
            src={mimiMagic}
            alt="Magic Mimi"
            className="w-32 h-32 object-contain"
            animate={{ y: [0, -10, 0], rotate: [-3, 3, -3] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="text-center md:text-left">
            <h3 className="font-display text-2xl font-bold mb-2">
              Built Different, On Purpose
            </h3>
            <p className="text-muted-foreground">
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
