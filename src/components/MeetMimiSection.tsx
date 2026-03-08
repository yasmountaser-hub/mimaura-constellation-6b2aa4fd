import { motion } from "framer-motion";
import { Star, Heart, Sparkles } from "lucide-react";
import InteractiveMimi from "@/components/InteractiveMimi";

const MeetMimiSection = () => {
  return (
    <section className="relative py-24 px-4 sm:px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6"
            >
              <Star className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium">Your Companion</span>
            </motion.div>

            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
              Meet <span className="text-gradient">Mimi</span>
            </h2>

            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Mimi is your soft, supportive pattern pal — always there, never pushy. 
              Think of her as the friend who notices when you're off without making a big deal about it.
            </p>

            {/* Mimi traits */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {[
                { emoji: "💜", text: "Always supportive" },
                { emoji: "🌙", text: "Night owl friendly" },
                { emoji: "✨", text: "Celebrates small wins" },
                { emoji: "🧠", text: "ADHD-aware" },
                { emoji: "💪", text: "Chronic pain ally" },
                { emoji: "🌈", text: "Inclusive vibes" },
              ].map((trait, i) => (
                <motion.div
                  key={trait.text}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * i }}
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-3 p-3 rounded-xl bg-card/50 border border-primary/10"
                >
                  <span className="text-2xl">{trait.emoji}</span>
                  <span className="font-medium text-sm">{trait.text}</span>
                </motion.div>
              ))}
            </div>

            {/* Quote */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative p-6 rounded-2xl glass-card"
            >
              <Heart className="w-6 h-6 text-rose absolute -top-3 -left-3" />
              <p className="italic text-muted-foreground">
                "Mimi doesn't judge when I skip a week of logging. She just says 'Welcome back!' 
                and that means everything."
              </p>
              <p className="mt-3 text-sm font-medium">— Early tester with ADHD & PCOS</p>
            </motion.div>
          </motion.div>

          {/* Right: Mimi poses */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-1 lg:order-2 relative flex items-center justify-center min-h-[400px]"
          >
            <InteractiveMimi className="w-full max-w-sm" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MeetMimiSection;
