import { motion } from "framer-motion";
import type { ReactNode } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingParticles from "@/components/FloatingParticles";
import CursorGlow from "@/components/CursorGlow";
import AccessibilityPanel from "@/components/AccessibilityPanel";
import LutealPhaseMockup from "@/components/mockups/LutealPhaseMockup";
import phasesPreview from "@/assets/app-phases-preview.png";
import patternNudge from "@/assets/pattern-nudge-preview.png";
import mimiTypes from "@/assets/mimi-types.png";

type Screen = {
  title: string;
  description: string;
  image?: string;
  component?: ReactNode;
  color: string;
};

const screens: Screen[] = [
  {
    title: "Cycle Phase Dashboard",
    description: "See where you are in your cycle at a glance — with color-coded phases, energy forecasts, and gentle daily tips from Mimi.",
    image: phasesPreview,
    color: "primary",
  },
  {
    title: "Luteal Phase Insights",
    description: "Deep-dive into each phase. Understand why you feel the way you do, with symptom correlations and personalized recommendations.",
    component: <LutealPhaseMockup />,
    color: "accent",
  },
  {
    title: "Pattern Nudges",
    description: "Mimi spots patterns in your data you'd never catch yourself — like 'your headaches peak 2 days before your period' — and nudges you gently.",
    image: patternNudge,
    color: "rose",
  },
  {
    title: "Meet Your Mimi",
    description: "Choose from 5 Mimi personalities — Fairy, Warrior, Mystic, Boss, or Angel — each with their own vibe and communication style.",
    image: mimiTypes,
    color: "lavender",
  },
];

const AppPreview = () => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <FloatingParticles />
      <CursorGlow />
      <Header />
      <AccessibilityPanel />

      <main className="pt-28 pb-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-20 space-y-4"
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium text-primary mb-4"
            >
              ✨ Sneak Peek
            </motion.span>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold">
              A Glimpse Inside <span className="text-gradient">Mimaura</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Beautifully designed, thoughtfully crafted. Here's what awaits you.
            </p>
          </motion.div>

          {/* Storybook screens */}
          <div className="space-y-32">
            {screens.map((screen, i) => (
              <motion.div
                key={screen.title}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className={`flex flex-col ${
                  i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                } items-center gap-10 lg:gap-16`}
              >
                {/* Image */}
                <div className="flex-1 w-full max-w-lg">
                  <motion.div
                    className="relative rounded-3xl overflow-hidden border border-border/50 shadow-float bg-card/30 backdrop-blur-sm"
                    whileHover={{ scale: 1.02, y: -4 }}
                    transition={{ duration: 0.3 }}
                  >
                    <img
                      src={screen.image}
                      alt={screen.title}
                      className="w-full h-auto"
                      loading="lazy"
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent pointer-events-none" />
                  </motion.div>
                </div>

                {/* Text */}
                <div className="flex-1 space-y-4 text-center lg:text-left">
                  <span className="inline-block text-xs font-bold uppercase tracking-widest text-primary">
                    Chapter {i + 1}
                  </span>
                  <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
                    {screen.title}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed text-base sm:text-lg max-w-md mx-auto lg:mx-0">
                    {screen.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-24 text-center glass-card rounded-3xl p-8 sm:p-12"
          >
            <p className="text-2xl sm:text-3xl font-display font-bold mb-3">
              Want to see more? 🔮
            </p>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Join the waitlist to get early access and be the first to experience Mimaura.
            </p>
            <a
              href="/#waitlist"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium text-primary-foreground"
              style={{ background: "var(--gradient-button)" }}
            >
              Join the Waitlist ✨
            </a>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AppPreview;
