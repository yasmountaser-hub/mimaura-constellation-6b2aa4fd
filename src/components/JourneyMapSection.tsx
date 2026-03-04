import { motion } from "framer-motion";
import { useState } from "react";
import { Moon, Sun, Brain, Heart, Zap, Star, ChevronRight } from "lucide-react";
import mimiMagic from "@/assets/mimi-magic.png";

const journeySteps = [
  {
    id: "track",
    icon: Moon,
    title: "Track",
    subtitle: "Log your patterns",
    description: "Quick check-ins on symptoms, mood, and energy. Takes seconds, not minutes.",
    emoji: "🌙",
  },
  {
    id: "learn",
    icon: Brain,
    title: "Learn",
    subtitle: "Mimi finds connections",
    description: "AI-powered pattern recognition surfaces insights you might miss.",
    emoji: "🧠",
  },
  {
    id: "nudge",
    icon: Zap,
    title: "Nudge",
    subtitle: "Gentle reminders",
    description: "Soft notifications when Mimi notices something that might help.",
    emoji: "⚡",
  },
  {
    id: "grow",
    icon: Sun,
    title: "Grow",
    subtitle: "Build understanding",
    description: "Over time, understand your body like never before.",
    emoji: "☀️",
  },
  {
    id: "thrive",
    icon: Heart,
    title: "Thrive",
    subtitle: "Live in harmony",
    description: "Make decisions aligned with your natural rhythms.",
    emoji: "💜",
  },
];

const JourneyMapSection = () => {
  const [activeStep, setActiveStep] = useState<string | null>(null);

  return (
    <section className="relative py-24 sm:py-32 px-4 sm:px-6 overflow-hidden">
      {/* Soft background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
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
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
          >
            <Star className="w-4 h-4 text-primary" />
            <span className="text-sm font-display font-semibold text-primary">Your Journey</span>
          </motion.div>

          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            The <span className="text-gradient">Mimaura Constellation</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Navigate your wellness journey through interconnected stars —
            each one a step toward understanding yourself better.
          </p>
        </motion.div>

        {/* Constellation — responsive card-based layout */}
        <div className="relative">
          {/* Center Mimi mascot — visible on md+ */}
          <motion.div
            className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 items-center justify-center"
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8, type: "spring", stiffness: 100 }}
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="relative"
            >
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background: "radial-gradient(circle, hsl(var(--primary) / 0.15) 0%, transparent 70%)",
                  width: "200%",
                  height: "200%",
                  left: "-50%",
                  top: "-50%",
                }}
              />
              <motion.img
                src={mimiMagic}
                alt="Mimi - Your wellness companion"
                className="w-20 h-20 object-contain relative z-10 drop-shadow-lg"
                animate={{ rotate: [0, 5, 0, -5, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
          </motion.div>

          {/* Pentagon layout on desktop, vertical flow on mobile */}
          {/* Top row: 3 items */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10 mb-6 md:mb-24">
            {journeySteps.slice(0, 3).map((step, index) => (
              <JourneyNode
                key={step.id}
                step={step}
                index={index}
                isActive={activeStep === step.id}
                onHover={() => setActiveStep(step.id)}
                onLeave={() => setActiveStep(null)}
              />
            ))}
          </div>

          {/* Bottom row: 2 items */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-20">
            {journeySteps.slice(3).map((step, index) => (
              <JourneyNode
                key={step.id}
                step={step}
                index={index + 3}
                isActive={activeStep === step.id}
                onHover={() => setActiveStep(step.id)}
                onLeave={() => setActiveStep(null)}
              />
            ))}
          </div>

          {/* Mobile Mimi — visible below md */}
          <motion.div
            className="flex md:hidden justify-center mt-10"
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, type: "spring" }}
          >
            <motion.img
              src={mimiMagic}
              alt="Mimi"
              className="w-16 h-16 object-contain drop-shadow-lg"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </div>

        {/* Bottom hint */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.2 }}
          className="text-center mt-12"
        >
          <p className="text-sm text-muted-foreground inline-flex items-center gap-2">
            <Star className="w-3.5 h-3.5 text-accent" />
            Hover each star to discover your path
            <Star className="w-3.5 h-3.5 text-accent" />
          </p>
        </motion.div>
      </div>
    </section>
  );
};

/* ========== JOURNEY NODE ========== */
interface JourneyNodeProps {
  step: (typeof journeySteps)[number];
  index: number;
  isActive: boolean;
  onHover: () => void;
  onLeave: () => void;
}

const JourneyNode = ({ step, index, isActive, onHover, onLeave }: JourneyNodeProps) => {
  const Icon = step.icon;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.15 * index, type: "spring", stiffness: 150 }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={onHover}
      className="relative w-full md:w-56 cursor-pointer group"
    >
      <motion.div
        animate={isActive ? { scale: 1.03 } : { scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="glass-card rounded-2xl p-5 sm:p-6 border border-border/50 hover:border-primary/30 transition-colors duration-300 text-center relative overflow-hidden"
      >
        {/* Hover glow */}
        <motion.div
          animate={isActive ? { opacity: 0.1 } : { opacity: 0 }}
          className="absolute inset-0 bg-gradient-to-br from-primary to-accent rounded-2xl pointer-events-none"
        />

        {/* Star icon */}
        <div className="relative z-10">
          <motion.div
            className="mx-auto w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-card border-2 border-primary/30 flex items-center justify-center shadow-md mb-4 relative"
            animate={isActive ? { boxShadow: "0 0 25px hsl(var(--primary) / 0.4)" } : { boxShadow: "0 4px 15px hsl(var(--primary) / 0.1)" }}
          >
            <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />

            {/* Orbiting dot */}
            <motion.div
              className="absolute w-1.5 h-1.5 bg-accent rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              style={{ top: "-3px", left: "calc(50% - 3px)", transformOrigin: "3px 35px" }}
            />
          </motion.div>

          <h3 className="font-display font-bold text-base sm:text-lg mb-0.5 group-hover:text-primary transition-colors">
            {step.title}
          </h3>
          <p className="text-xs text-muted-foreground mb-2">{step.subtitle}</p>

          {/* Expanded description on hover */}
          <motion.div
            initial={false}
            animate={isActive ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed pt-2 border-t border-border/30">
              {step.description}
            </p>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default JourneyMapSection;
