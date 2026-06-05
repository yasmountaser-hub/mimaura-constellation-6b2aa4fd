import { motion } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingParticles from "@/components/FloatingParticles";
import CursorGlow from "@/components/CursorGlow";
import AccessibilityPanel from "@/components/AccessibilityPanel";
import mimiSmart from "@/assets/mimi-smart.webp";

const faqs = [
  {
    category: "🌸 About Mimaura",
    questions: [
      {
        q: "What exactly is Mimaura?",
        a: "Mimaura is a wellness companion app designed for people with cycles — especially those who are neurodivergent. It gently tracks your patterns (mood, energy, symptoms) and gives you soft, personalized nudges powered by your unique data. Think of it as a best friend who understands your body.",
      },
      {
        q: "Is Mimaura just another period tracker?",
        a: "Nope! While we do track cycles, Mimaura goes way deeper. We connect the dots between your mood, energy, sleep, symptoms, and cycle phases to reveal patterns you might never notice on your own. Plus, Mimi (your AI companion) learns your unique rhythms over time.",
      },
      {
        q: "Who is Mimi?",
        a: "Mimi is your personal wellness companion — a playful, emotionally intelligent AI character who lives inside the app. She has different 'personalities' (Fairy, Warrior, Mystic, Boss, Angel) and adapts her communication style to what you need in the moment.",
      },
    ],
  },
  {
    category: "🧠 Neurodiversity & Accessibility",
    questions: [
      {
        q: "How is Mimaura ADHD-friendly?",
        a: "We built Mimaura with neurodivergent minds at the core. Features include: minimal-tap logging (no overwhelming forms), gentle nudges instead of guilt-tripping reminders, a low-stim mode that reduces visual noise, pattern recognition that works even with inconsistent tracking, and Mimi who celebrates small wins.",
      },
      {
        q: "What accessibility features do you have?",
        a: "We offer 9 color themes (including low-stim), dyslexia-friendly font mode, reduced motion settings, large text options, high contrast mode, and all content is designed with clear visual hierarchy. We're continuously improving based on community feedback.",
      },
      {
        q: "Can I use Mimaura if I have sensory sensitivities?",
        a: "Absolutely! Our low-stim mode removes animations, reduces color intensity, and simplifies the interface. You can also customize individual accessibility settings independently — mix and match what works for your brain.",
      },
    ],
  },
  {
    category: "🔒 Privacy & Data",
    questions: [
      {
        q: "Is my health data safe?",
        a: "Your data is yours. Period. We use end-to-end encryption, never sell your data to third parties, and you can export or delete everything at any time. We're building Mimaura on privacy-first principles because reproductive health data is deeply personal.",
      },
      {
        q: "Do you share data with advertisers?",
        a: "Never. We will never sell, share, or monetize your health data. Our business model is based on the app itself, not on exploiting your information. Your trust is everything to us.",
      },
    ],
  },
  {
    category: "📱 App & Availability",
    questions: [
      {
        q: "When will Mimaura launch?",
        a: "We're currently in development with a waitlist open! Join the waitlist to get early access and help shape the app. We'll announce launch dates through our newsletter and social channels.",
      },
      {
        q: "Will it be free?",
        a: "Mimaura will have a generous free tier with core tracking and Mimi interactions. Premium features like advanced pattern analysis, personalized insights, and expanded Mimi personalities will be available through an affordable subscription.",
      },
      {
        q: "What platforms will it support?",
        a: "We're launching on iOS and Android simultaneously. A web companion is also planned for those who prefer tracking on desktop.",
      },
    ],
  },
];

const FAQItem = ({ q, a }: { q: string; a: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      className="border border-border/50 rounded-2xl overflow-hidden bg-card/50 backdrop-blur-sm"
      layout
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-primary/5 transition-colors"
      >
        <span className="font-medium text-foreground pr-4 leading-relaxed">{q}</span>
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="shrink-0"
        >
          <Plus className="w-5 h-5 text-primary" />
        </motion.div>
      </button>

      <motion.div
        initial={false}
        animate={{
          height: isOpen ? "auto" : 0,
          opacity: isOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="overflow-hidden"
      >
        <p className="px-5 pb-4 text-muted-foreground leading-relaxed text-sm">
          {a}
        </p>
      </motion.div>
    </motion.div>
  );
};

const FAQ = () => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <FloatingParticles />
      <CursorGlow />
      <Header />
      <AccessibilityPanel />

      <main className="pt-28 pb-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16 space-y-4"
          >
            <div className="flex justify-center mb-6">
              <motion.img loading="lazy" decoding="async"
                src={mimiSmart}
                alt="Smart Mimi"
                className="w-24 h-24 object-contain"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold">
              Got <span className="text-gradient">Questions?</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Mimi's got answers. Here's everything you need to know about Mimaura.
            </p>
          </motion.div>

          {/* FAQ Categories */}
          <div className="space-y-10">
            {faqs.map((category, ci) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: ci * 0.1 }}
              >
                <h2 className="font-display text-2xl font-bold mb-8 text-foreground">
                  {category.category}
                </h2>
                <div className="space-y-3">
                  {category.questions.map((faq) => (
                    <FAQItem key={faq.q} q={faq.q} a={faq.a} />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Still have questions CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-16 text-center glass-card rounded-3xl p-8 sm:p-10"
          >
            <p className="text-2xl font-display font-bold mb-2">Still curious? 💜</p>
            <p className="text-muted-foreground mb-6">
              Join the waitlist and be part of the conversation.
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

export default FAQ;
