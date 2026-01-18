import { motion } from "framer-motion";
import { useState } from "react";
import { Sparkles, Moon, Sun, Brain, Heart, Zap, Star } from "lucide-react";

const journeySteps = [
  {
    id: "track",
    icon: Moon,
    title: "Track",
    subtitle: "Log your patterns",
    description: "Quick check-ins on symptoms, mood, and energy. Takes seconds, not minutes.",
    color: "from-primary to-lavender-light",
    position: { x: 15, y: 20 },
  },
  {
    id: "learn",
    icon: Brain,
    title: "Learn",
    subtitle: "Mimi finds connections",
    description: "AI-powered pattern recognition surfaces insights you might miss.",
    color: "from-accent to-gold-soft",
    position: { x: 50, y: 10 },
  },
  {
    id: "nudge",
    icon: Zap,
    title: "Nudge",
    subtitle: "Gentle reminders",
    description: "Soft notifications when Mimi notices something that might help.",
    color: "from-mint to-sky",
    position: { x: 85, y: 25 },
  },
  {
    id: "grow",
    icon: Sun,
    title: "Grow",
    subtitle: "Build understanding",
    description: "Over time, understand your body like never before.",
    color: "from-rose to-rose-soft",
    position: { x: 70, y: 60 },
  },
  {
    id: "thrive",
    icon: Heart,
    title: "Thrive",
    subtitle: "Live in harmony",
    description: "Make decisions aligned with your natural rhythms.",
    color: "from-sky to-primary",
    position: { x: 30, y: 55 },
  },
];

const JourneyMapSection = () => {
  const [activeStep, setActiveStep] = useState<string | null>(null);

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
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
          >
            <Star className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Your Journey</span>
          </motion.div>

          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            The <span className="text-gradient">Mimaura Journey</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A constellation of understanding — each step builds on the last, 
            creating your unique wellness map.
          </p>
        </motion.div>

        {/* Journey Map */}
        <div className="relative h-[500px] md:h-[400px]">
          {/* Connection lines - SVG paths */}
          <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }}>
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
                <stop offset="50%" stopColor="hsl(var(--accent))" stopOpacity="0.5" />
                <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
              </linearGradient>
            </defs>
            
            {/* Animated constellation lines */}
            <motion.path
              d="M 15% 20% Q 30% 5% 50% 10% Q 70% 5% 85% 25% Q 90% 45% 70% 60% Q 55% 70% 30% 55% Q 10% 45% 15% 20%"
              fill="none"
              stroke="url(#lineGradient)"
              strokeWidth="2"
              strokeDasharray="8 4"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
          </svg>

          {/* Journey nodes */}
          {journeySteps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + index * 0.15, type: "spring", stiffness: 200 }}
              className="absolute cursor-pointer z-10"
              style={{
                left: `${step.position.x}%`,
                top: `${step.position.y}%`,
                transform: "translate(-50%, -50%)",
              }}
              onMouseEnter={() => setActiveStep(step.id)}
              onMouseLeave={() => setActiveStep(null)}
            >
              {/* Glow ring */}
              <motion.div
                className={`absolute inset-0 bg-gradient-to-r ${step.color} rounded-full blur-xl`}
                animate={{
                  scale: activeStep === step.id ? [1, 1.5, 1] : 1,
                  opacity: activeStep === step.id ? [0.3, 0.6, 0.3] : 0.2,
                }}
                transition={{ duration: 1.5, repeat: activeStep === step.id ? Infinity : 0 }}
                style={{ width: "120px", height: "120px", left: "-30px", top: "-30px" }}
              />

              {/* Node circle */}
              <motion.div
                whileHover={{ scale: 1.15 }}
                className={`relative w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center shadow-float`}
              >
                <step.icon className="w-7 h-7 md:w-8 md:h-8 text-white" />
                
                {/* Pulse effect */}
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-white/30"
                  animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                />
              </motion.div>

              {/* Label */}
              <motion.div
                className={`absolute ${index % 2 === 0 ? "top-full mt-3" : "bottom-full mb-3"} left-1/2 -translate-x-1/2 text-center whitespace-nowrap`}
                animate={{ opacity: activeStep === step.id ? 1 : 0.8 }}
              >
                <p className="font-display font-bold text-sm md:text-base">{step.title}</p>
                <p className="text-xs text-muted-foreground">{step.subtitle}</p>
              </motion.div>

              {/* Tooltip card */}
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={{
                  opacity: activeStep === step.id ? 1 : 0,
                  y: activeStep === step.id ? 0 : 10,
                  scale: activeStep === step.id ? 1 : 0.9,
                }}
                className="absolute z-20 glass-card rounded-2xl p-4 w-56 pointer-events-none"
                style={{
                  left: "50%",
                  transform: "translateX(-50%)",
                  top: index % 2 === 0 ? "calc(100% + 60px)" : "auto",
                  bottom: index % 2 !== 0 ? "calc(100% + 60px)" : "auto",
                }}
              >
                <p className="text-sm text-foreground">{step.description}</p>
              </motion.div>
            </motion.div>
          ))}

          {/* Center Mimi */}
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-5"
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1, type: "spring" }}
          >
            <motion.div
              className="w-24 h-24 rounded-full bg-card/80 backdrop-blur-sm border-2 border-primary/20 flex items-center justify-center shadow-glow"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <Sparkles className="w-10 h-10 text-primary" />
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="text-center text-muted-foreground mt-8"
        >
          Hover over each star to explore your wellness journey ✨
        </motion.p>
      </div>
    </section>
  );
};

export default JourneyMapSection;
