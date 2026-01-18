import { motion } from "framer-motion";
import { useState } from "react";
import { Moon, Sun, Brain, Heart, Zap, Star } from "lucide-react";
import mimiMagic from "@/assets/mimi-magic.png";

const journeySteps = [
  {
    id: "track",
    icon: Moon,
    title: "Track",
    subtitle: "Log your patterns",
    description: "Quick check-ins on symptoms, mood, and energy. Takes seconds, not minutes.",
    position: { x: 20, y: 25 },
    starSize: "lg",
  },
  {
    id: "learn",
    icon: Brain,
    title: "Learn",
    subtitle: "Mimi finds connections",
    description: "AI-powered pattern recognition surfaces insights you might miss.",
    position: { x: 50, y: 12 },
    starSize: "xl",
  },
  {
    id: "nudge",
    icon: Zap,
    title: "Nudge",
    subtitle: "Gentle reminders",
    description: "Soft notifications when Mimi notices something that might help.",
    position: { x: 80, y: 25 },
    starSize: "lg",
  },
  {
    id: "grow",
    icon: Sun,
    title: "Grow",
    subtitle: "Build understanding",
    description: "Over time, understand your body like never before.",
    position: { x: 72, y: 65 },
    starSize: "md",
  },
  {
    id: "thrive",
    icon: Heart,
    title: "Thrive",
    subtitle: "Live in harmony",
    description: "Make decisions aligned with your natural rhythms.",
    position: { x: 28, y: 65 },
    starSize: "md",
  },
];

// Small twinkling stars for background ambiance
const backgroundStars = [
  { x: 8, y: 15, delay: 0 },
  { x: 35, y: 8, delay: 0.5 },
  { x: 65, y: 6, delay: 1 },
  { x: 92, y: 18, delay: 1.5 },
  { x: 12, y: 45, delay: 2 },
  { x: 88, y: 48, delay: 2.5 },
  { x: 5, y: 72, delay: 3 },
  { x: 42, y: 78, delay: 3.5 },
  { x: 58, y: 82, delay: 4 },
  { x: 95, y: 70, delay: 4.5 },
];

const JourneyMapSection = () => {
  const [activeStep, setActiveStep] = useState<string | null>(null);

  const getNodeSize = (size: string) => {
    switch (size) {
      case "xl": return "w-20 h-20 md:w-24 md:h-24";
      case "lg": return "w-16 h-16 md:w-20 md:h-20";
      default: return "w-14 h-14 md:w-16 md:h-16";
    }
  };

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
            The <span className="text-gradient">Mimaura Constellation</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Navigate your wellness journey through interconnected stars — 
            each one a step toward understanding yourself better.
          </p>
        </motion.div>

        {/* Constellation Map */}
        <div className="relative h-[550px] md:h-[450px]">
          {/* Background twinkling stars */}
          {backgroundStars.map((star, i) => (
            <motion.div
              key={`bg-star-${i}`}
              className="absolute w-1.5 h-1.5 bg-primary/40 rounded-full"
              style={{ left: `${star.x}%`, top: `${star.y}%` }}
              animate={{
                opacity: [0.2, 0.8, 0.2],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: star.delay,
                ease: "easeInOut",
              }}
            />
          ))}

          {/* SVG Constellation Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
            <defs>
              <linearGradient id="starLineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.6" />
                <stop offset="50%" stopColor="hsl(var(--accent))" stopOpacity="0.8" />
                <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.6" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            
            {/* Main constellation path - flowing star connections */}
            <motion.path
              d="M 20% 25% L 50% 12% L 80% 25%"
              fill="none"
              stroke="url(#starLineGradient)"
              strokeWidth="2"
              strokeLinecap="round"
              filter="url(#glow)"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
            <motion.path
              d="M 80% 25% L 72% 65%"
              fill="none"
              stroke="url(#starLineGradient)"
              strokeWidth="2"
              strokeLinecap="round"
              filter="url(#glow)"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
            />
            <motion.path
              d="M 72% 65% L 50% 50% L 28% 65%"
              fill="none"
              stroke="url(#starLineGradient)"
              strokeWidth="2"
              strokeLinecap="round"
              filter="url(#glow)"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 1.2, ease: "easeOut" }}
            />
            <motion.path
              d="M 28% 65% L 20% 25%"
              fill="none"
              stroke="url(#starLineGradient)"
              strokeWidth="2"
              strokeLinecap="round"
              filter="url(#glow)"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 1.8, ease: "easeOut" }}
            />
            
            {/* Cross connections to center */}
            <motion.path
              d="M 20% 25% L 50% 50%"
              fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth="1"
              strokeOpacity="0.3"
              strokeDasharray="4 6"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 2.2 }}
            />
            <motion.path
              d="M 80% 25% L 50% 50%"
              fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth="1"
              strokeOpacity="0.3"
              strokeDasharray="4 6"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 2.4 }}
            />
            <motion.path
              d="M 50% 12% L 50% 50%"
              fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth="1"
              strokeOpacity="0.3"
              strokeDasharray="4 6"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 2.6 }}
            />
          </svg>

          {/* Journey star nodes */}
          {journeySteps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + index * 0.2, type: "spring", stiffness: 150 }}
              className="absolute cursor-pointer z-10"
              style={{
                left: `${step.position.x}%`,
                top: `${step.position.y}%`,
                transform: "translate(-50%, -50%)",
              }}
              onMouseEnter={() => setActiveStep(step.id)}
              onMouseLeave={() => setActiveStep(null)}
            >
              {/* Star glow effect */}
              <motion.div
                className="absolute rounded-full bg-primary/30"
                style={{
                  width: "150%",
                  height: "150%",
                  left: "-25%",
                  top: "-25%",
                  filter: "blur(20px)",
                }}
                animate={{
                  opacity: activeStep === step.id ? [0.4, 0.7, 0.4] : 0.2,
                  scale: activeStep === step.id ? [1, 1.2, 1] : 1,
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />

              {/* Star node */}
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`relative ${getNodeSize(step.starSize)} rounded-full bg-card border-2 border-primary/40 flex items-center justify-center shadow-lg backdrop-blur-sm`}
                style={{
                  boxShadow: activeStep === step.id 
                    ? "0 0 30px hsl(var(--primary) / 0.5), 0 0 60px hsl(var(--primary) / 0.2)" 
                    : "0 4px 20px hsl(var(--primary) / 0.15)",
                }}
              >
                <step.icon className={`${step.starSize === "xl" ? "w-9 h-9" : step.starSize === "lg" ? "w-7 h-7" : "w-6 h-6"} text-primary`} />
                
                {/* Orbiting sparkle */}
                <motion.div
                  className="absolute w-2 h-2 bg-accent rounded-full"
                  animate={{ 
                    rotate: 360,
                  }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  style={{ 
                    transformOrigin: "center",
                    top: "-4px",
                    left: "calc(50% - 4px)",
                  }}
                />
              </motion.div>

              {/* Label */}
              <motion.div
                className="absolute left-1/2 -translate-x-1/2 text-center whitespace-nowrap"
                style={{
                  top: index < 3 ? "calc(100% + 12px)" : "auto",
                  bottom: index >= 3 ? "calc(100% + 12px)" : "auto",
                }}
                animate={{ 
                  y: activeStep === step.id ? [0, -3, 0] : 0,
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <p className="font-display font-bold text-base md:text-lg">{step.title}</p>
                <p className="text-xs text-muted-foreground">{step.subtitle}</p>
              </motion.div>

              {/* Info tooltip */}
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={{
                  opacity: activeStep === step.id ? 1 : 0,
                  y: activeStep === step.id ? 0 : 10,
                  scale: activeStep === step.id ? 1 : 0.9,
                  pointerEvents: activeStep === step.id ? "auto" : "none",
                }}
                className="absolute z-30 glass-card rounded-2xl p-4 w-64"
                style={{
                  left: step.position.x > 50 ? "auto" : "50%",
                  right: step.position.x > 50 ? "50%" : "auto",
                  transform: step.position.x > 50 ? "translateX(50%)" : "translateX(-50%)",
                  top: index < 3 ? "calc(100% + 70px)" : "auto",
                  bottom: index >= 3 ? "calc(100% + 70px)" : "auto",
                }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <step.icon className="w-5 h-5 text-primary" />
                  <span className="font-bold text-sm">{step.title}</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
              </motion.div>
            </motion.div>
          ))}

          {/* Center Mimi */}
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1.5, type: "spring", stiffness: 100 }}
          >
            <motion.div
              className="relative"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              {/* Soft glow behind Mimi */}
              <div 
                className="absolute inset-0 rounded-full"
                style={{
                  background: "radial-gradient(circle, hsl(var(--primary) / 0.2) 0%, transparent 70%)",
                  width: "150%",
                  height: "150%",
                  left: "-25%",
                  top: "-25%",
                }}
              />
              <motion.img
                src={mimiMagic}
                alt="Mimi - Your wellness companion"
                className="w-20 h-20 md:w-24 md:h-24 object-contain relative z-10 drop-shadow-lg"
                animate={{ rotate: [0, 5, 0, -5, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom hint */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 2 }}
          className="text-center mt-8"
        >
          <p className="text-muted-foreground inline-flex items-center gap-2">
            <Star className="w-4 h-4 text-accent" />
            Tap each star to discover your path
            <Star className="w-4 h-4 text-accent" />
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default JourneyMapSection;
