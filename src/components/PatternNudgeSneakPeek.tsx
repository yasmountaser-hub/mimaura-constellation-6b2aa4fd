import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Bell, TrendingUp, Lightbulb, Moon, Coffee, Heart, Sparkles, ArrowRight, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import patternPreview from "@/assets/pattern-nudge-preview.png";
import mimiLightbulb from "@/assets/mimi-lightbulb.png";

const nudgeExamples = [
  {
    icon: Moon,
    time: "8:42 PM",
    title: "Evening Insight",
    message: "Hey! Last Tuesday you felt similar. An early night helped then — maybe tonight too?",
    color: "from-primary to-lavender-light",
  },
  {
    icon: Coffee,
    time: "2:15 PM",
    title: "Energy Pattern",
    message: "Your energy tends to dip around now. This is normal for your cycle day. Gentle reminder to hydrate! 💧",
    color: "from-accent to-gold-soft",
  },
  {
    icon: Heart,
    time: "10:30 AM",
    title: "Mood Connection",
    message: "I noticed you've logged 3 great days in a row! What's working? Tap to reflect.",
    color: "from-rose to-rose-soft",
  },
];

const features = [
  {
    icon: TrendingUp,
    title: "Pattern History",
    description: "See what your body's been telling you over time. Visualize trends, not just data.",
  },
  {
    icon: Lightbulb,
    title: "Personalized Insights",
    description: "Suggestions based on YOUR data — not generic advice from a textbook.",
  },
  {
    icon: Bell,
    title: "Opt-in Nudges",
    description: "You control when and how Mimi reaches out. No pushy notifications, ever.",
  },
  {
    icon: Zap,
    title: "Smart Timing",
    description: "Nudges arrive when they're actually helpful, not on a rigid schedule.",
  },
];

const PatternNudgeSneakPeek = () => {
  const [activeNudge, setActiveNudge] = useState(0);

  // Cycle through nudges
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveNudge((prev) => (prev + 1) % nudgeExamples.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative py-24 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
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
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6"
          >
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium">Sneak Peek Feature</span>
          </motion.div>

          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            The <span className="text-gradient">Pattern Nudge</span> System
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            No alarms. No guilt. Just a soft tap when Mimi notices something that might help.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Interactive Demo */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Phone mockup */}
            <motion.div
              className="relative z-10 bg-card/80 backdrop-blur-xl rounded-[3rem] p-3 shadow-float border border-primary/20 max-w-sm mx-auto"
              whileHover={{ scale: 1.02 }}
            >
              {/* Phone screen */}
              <div className="bg-background rounded-[2.5rem] overflow-hidden">
                {/* Status bar */}
                <div className="flex justify-between items-center px-6 py-3 bg-primary/5">
                  <span className="text-xs font-medium">9:41</span>
                  <div className="flex gap-1">
                    <div className="w-4 h-2 bg-foreground/80 rounded-sm" />
                    <div className="w-4 h-4 border-2 border-foreground/80 rounded-full" />
                  </div>
                </div>

                {/* App header */}
                <div className="p-6 pb-4">
                  <h3 className="font-display font-bold text-xl">Pattern Nudge</h3>
                  <p className="text-sm text-muted-foreground">Gentle insights for you</p>
                </div>

                {/* Nudge cards - animated */}
                <div className="px-4 pb-6 space-y-3 min-h-[280px]">
                  <AnimatePresence mode="wait">
                    {nudgeExamples.map((nudge, index) =>
                      index === activeNudge ? (
                        <motion.div
                          key={nudge.title}
                          initial={{ opacity: 0, y: 20, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -20, scale: 0.95 }}
                          transition={{ duration: 0.4 }}
                          className="glass-card rounded-2xl p-4 relative overflow-hidden"
                        >
                          <div className={`absolute inset-0 bg-gradient-to-r ${nudge.color} opacity-10`} />
                          <div className="relative z-10">
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center gap-2">
                                <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${nudge.color} flex items-center justify-center`}>
                                  <nudge.icon className="w-4 h-4 text-white" />
                                </div>
                                <span className="font-medium text-sm">{nudge.title}</span>
                              </div>
                              <span className="text-xs text-muted-foreground">{nudge.time}</span>
                            </div>
                            <p className="text-sm text-foreground leading-relaxed">{nudge.message}</p>
                          </div>
                        </motion.div>
                      ) : null
                    )}
                  </AnimatePresence>

                  {/* Nudge indicators */}
                  <div className="flex justify-center gap-2 pt-2">
                    {nudgeExamples.map((_, index) => (
                      <motion.button
                        key={index}
                        onClick={() => setActiveNudge(index)}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          index === activeNudge ? "bg-primary" : "bg-primary/30"
                        }`}
                        whileHover={{ scale: 1.3 }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Floating Mimi */}
            <motion.img
              src={mimiLightbulb}
              alt="Mimi with lightbulb"
              className="absolute -right-4 -bottom-4 w-28 h-28 object-contain z-20"
              animate={{ y: [0, -10, 0], rotate: [-3, 3, -3] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Glow effect */}
            <motion.div
              className="absolute inset-0 bg-primary/20 blur-3xl rounded-full scale-75 -z-10"
              animate={{ scale: [0.7, 0.85, 0.7], opacity: [0.2, 0.4, 0.2] }}
              transition={{ duration: 6, repeat: Infinity }}
            />
          </motion.div>

          {/* Right: Features */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h3 className="font-display text-2xl font-bold mb-4">
                How Pattern Nudge Works
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Mimi quietly observes your patterns over time. When she notices something helpful — 
                like a recurring energy dip or a mood pattern — she gently lets you know. 
                No judgment, no pressure, just awareness.
              </p>
            </div>

            {/* Feature list */}
            <div className="space-y-4">
              {features.map((feature, i) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  whileHover={{ x: 5 }}
                  className="flex items-start gap-4 p-4 rounded-2xl hover:bg-primary/5 transition-all cursor-default"
                >
                  <motion.div
                    whileHover={{ rotate: 10, scale: 1.1 }}
                    className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0"
                  >
                    <feature.icon className="w-6 h-6 text-primary" />
                  </motion.div>
                  <div>
                    <h4 className="font-display font-bold text-lg mb-1">{feature.title}</h4>
                    <p className="text-muted-foreground text-sm">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
            >
              <Button
                variant="hero"
                size="lg"
                className="group"
                onClick={() => document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" })}
              >
                Get Early Access
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PatternNudgeSneakPeek;
