import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingParticles from "@/components/FloatingParticles";
import CursorGlow from "@/components/CursorGlow";
import AccessibilityPanel from "@/components/AccessibilityPanel";
import mimiLightbulb from "@/assets/mimi-lightbulb.webp";

const phases = [
  {
    phase: "Phase 1",
    title: "Foundation",
    status: "in-progress",
    emoji: "🌱",
    items: [
      "Core cycle tracking with phase detection",
      "Mimi companion with 5 personalities",
      "Symptom & mood logging (minimal taps)",
      "9 accessibility themes",
      "Low-stim & dyslexia-friendly modes",
    ],
  },
  {
    phase: "Phase 2",
    title: "Intelligence",
    status: "upcoming",
    emoji: "🧠",
    items: [
      "Pattern detection engine (connects symptoms to phases)",
      "Personalized nudges & gentle reminders",
      "Energy & mood forecasting",
      "Weekly & monthly insight reports",
      "Data export & privacy controls",
    ],
  },
  {
    phase: "Phase 3",
    title: "Community",
    status: "planned",
    emoji: "🌸",
    items: [
      "Community spaces (anonymous, moderated)",
      "Shared experiences & pattern stories",
      "Educational content library",
      "Practitioner-reviewed health tips",
      "Cycle syncing with partners/friends",
    ],
  },
  {
    phase: "Phase 4",
    title: "Expansion",
    status: "planned",
    emoji: "🚀",
    items: [
      "Wearable integrations (Apple Watch, Fitbit)",
      "Nutrition & exercise phase-aligned suggestions",
      "Telehealth partner connections",
      "Workplace wellness tools",
      "API for developers & researchers",
    ],
  },
];

const statusColors = {
  "in-progress": "bg-primary/20 text-primary border-primary/30",
  upcoming: "bg-accent/20 text-accent-foreground border-accent/30",
  planned: "bg-muted text-muted-foreground border-border",
};

const statusLabels = {
  "in-progress": "🔨 In Progress",
  upcoming: "⏳ Up Next",
  planned: "📋 Planned",
};

const Roadmap = () => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <FloatingParticles />
      <CursorGlow />
      <Header />
      <AccessibilityPanel />

      <main className="pt-28 pb-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16 space-y-4"
          >
            <motion.img loading="lazy" decoding="async"
              src={mimiLightbulb}
              alt="Mimi with lightbulb"
              className="w-20 h-20 object-contain mx-auto mb-4"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold">
              Where We're <span className="text-gradient">Going</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Our roadmap is shaped by you. Here's what we're building — and dreaming of.
            </p>
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 sm:left-8 top-0 bottom-0 w-px bg-border" />

            <div className="space-y-12">
              {phases.map((phase, i) => (
                <motion.div
                  key={phase.phase}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="relative pl-16 sm:pl-20"
                >
                  {/* Timeline dot */}
                  <div className={`absolute left-4 sm:left-6 top-2 w-4 h-4 rounded-full border-2 ${
                    phase.status === "in-progress"
                      ? "bg-primary border-primary shadow-glow"
                      : phase.status === "upcoming"
                      ? "bg-accent border-accent"
                      : "bg-muted border-border"
                  }`} />

                  <div className="glass-card rounded-2xl p-6 sm:p-8">
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <span className="text-2xl">{phase.emoji}</span>
                      <div>
                        <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                          {phase.phase}
                        </span>
                        <h3 className="font-display text-xl sm:text-2xl font-bold text-foreground">
                          {phase.title}
                        </h3>
                      </div>
                      <span className={`ml-auto px-3 py-1 rounded-full text-xs font-medium border ${statusColors[phase.status as keyof typeof statusColors]}`}>
                        {statusLabels[phase.status as keyof typeof statusLabels]}
                      </span>
                    </div>

                    <ul className="space-y-2">
                      {phase.items.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2 text-sm text-muted-foreground"
                        >
                          <span className="text-primary mt-0.5">✦</span>
                          <span className="leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-20 text-center glass-card rounded-3xl p-8 sm:p-10"
          >
            <p className="text-2xl font-display font-bold mb-2">
              Want to shape the roadmap? 🗳️
            </p>
            <p className="text-muted-foreground mb-6">
              Early waitlist members get to vote on features.
            </p>
            <a
              href="/#waitlist"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium text-primary-foreground"
              style={{ background: "var(--gradient-button)" }}
            >
              Join & Vote ✨
            </a>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Roadmap;
