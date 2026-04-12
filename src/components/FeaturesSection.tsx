import { motion } from "framer-motion";
import { Brain, Heart, Moon, Sparkles, Users, Shield } from "lucide-react";
import TiltCard from "@/components/TiltCard";
import AnimatedCounter from "@/components/AnimatedCounter";
import mimiSmart from "@/assets/mimi-smart.png";
import mimiMeal from "@/assets/mimi-meal.png";
import mimiMood from "@/assets/mimi-mood.png";

const features = [
  {
    icon: Brain,
    title: "Pattern Recognition",
    description: "Mimi learns your unique rhythms and gently surfaces insights when they matter most.",
    color: "from-primary/20 to-lavender-light/30",
    delay: 0,
  },
  {
    icon: Heart,
    title: "Chronic Care Friendly",
    description: "Designed with chronic conditions in mind — PCOS, endo, ADHD, and more.",
    color: "from-rose/20 to-rose-soft/30",
    delay: 0.1,
  },
  {
    icon: Moon,
    title: "Cycle Aware",
    description: "Track phases, moods, and symptoms without overwhelm. Your data, your pace.",
    color: "from-sky/20 to-sky-soft/30",
    delay: 0.2,
  },
  {
    icon: Users,
    title: "Culturally Inclusive",
    description: "Respectful of all backgrounds, faiths, and identities. Wellness without assumptions.",
    color: "from-mint/20 to-mint-soft/30",
    delay: 0.3,
  },
  {
    icon: Sparkles,
    title: "Neurodivergent Design",
    description: "Low-stim mode, gentle nudges, no pressure. Built for brains that work differently.",
    color: "from-accent/20 to-gold-soft/30",
    delay: 0.4,
  },
  {
    icon: Shield,
    title: "Privacy First",
    description: "Your data stays yours. No selling, no sharing, no sneaky stuff. Ever.",
    color: "from-lavender-dark/20 to-primary/20",
    delay: 0.5,
  },
];

const stats = [
  { target: 10000, suffix: "+", label: "Waitlist sign-ups" },
  { target: 95, suffix: "%", label: "Would recommend" },
  { target: 30, suffix: "+", label: "Conditions tracked" },
  { target: 5, suffix: "", label: "Theme modes" },
];

const FeaturesSection = () => {
  return (
    <section className="relative py-24 px-4 sm:px-6 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
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
            <span className="text-sm font-medium text-accent-foreground">Why Mimaura?</span>
          </motion.div>
          
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Wellness That <span className="text-gradient">Gets You</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Not another tracker. A companion that learns how your body communicates — 
            and helps you listen.
          </p>
        </motion.div>

        {/* Features Grid — now with 3D tilt! */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: feature.delay }}
            >
              <Floating3DCard className="h-full" depth={12}>
                <div className="glass-card rounded-3xl p-8 h-full hover:shadow-float transition-all duration-300 group">
                  {/* Gradient blob */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                  
                  <div className="relative z-10">
                    <motion.div
                      whileHover={{ rotate: 10, scale: 1.1 }}
                      className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-5"
                    >
                      <feature.icon className="w-7 h-7 text-primary" />
                    </motion.div>
                    <h3 className="font-display text-xl font-bold mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </Floating3DCard>
            </motion.div>
          ))}
        </div>

        {/* Animated Counters — social proof */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16 py-12 px-6 glass-card rounded-3xl"
        >
          {stats.map((stat) => (
            <AnimatedCounter
              key={stat.label}
              target={stat.target}
              suffix={stat.suffix}
              label={stat.label}
            />
          ))}
        </motion.div>

        {/* Floating Mimis */}
        <div className="relative h-32 flex justify-center items-center gap-8">
          <motion.img
            src={mimiSmart}
            alt="Smart Mimi"
            className="w-24 h-24 object-contain"
            animate={{ y: [0, -10, 0], rotate: [-5, 5, -5] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.img
            src={mimiMeal}
            alt="Meal Mimi"
            className="w-28 h-28 object-contain"
            animate={{ y: [-5, 5, -5] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          />
          <motion.img
            src={mimiMood}
            alt="Mood Mimi"
            className="w-24 h-24 object-contain"
            animate={{ y: [0, -8, 0], rotate: [5, -5, 5] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
