import { motion } from "framer-motion";
import { TrendingUp, Bell, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import patternPreview from "@/assets/pattern-nudge-preview.png";
import mimiLightbulb from "@/assets/mimi-lightbulb.png";

const PatternNudgeSection = () => {
  return (
    <section className="relative py-24 px-6 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10 aurora-bg opacity-30" />

      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: App Preview */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Phone mockup glow */}
            <motion.div
              className="absolute inset-0 bg-primary/20 blur-3xl rounded-full scale-75"
              animate={{ scale: [0.75, 0.85, 0.75] }}
              transition={{ duration: 6, repeat: Infinity }}
            />
            
            {/* App screenshot */}
            <motion.div
              className="relative z-10 rounded-3xl overflow-hidden shadow-float border border-primary/20"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src={patternPreview}
                alt="Pattern Nudge feature preview"
                className="w-full h-auto rounded-3xl"
              />
            </motion.div>

            {/* Floating Mimi */}
            <motion.img
              src={mimiLightbulb}
              alt="Mimi with lightbulb"
              className="absolute -right-8 -bottom-8 w-32 h-32 object-contain z-20"
              animate={{ y: [0, -10, 0], rotate: [-3, 3, -3] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
              >
                <Bell className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">Gentle Nudges</span>
              </motion.div>

              <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
                The <span className="text-gradient">Pattern Nudge</span> System
              </h2>

              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                No alarms. No guilt. Just a soft tap when Mimi notices something that might help — 
                like "Hey, you felt this way last Tuesday too. Maybe an earlier night tonight?"
              </p>
            </div>

            {/* Feature list */}
            <div className="space-y-6">
              {[
                {
                  icon: TrendingUp,
                  title: "Pattern History",
                  description: "See what your body's been telling you over time",
                },
                {
                  icon: Lightbulb,
                  title: "Personalized Insights",
                  description: "Suggestions based on YOUR data, not generic advice",
                },
                {
                  icon: Bell,
                  title: "Opt-in Nudges",
                  description: "You control when and how Mimi reaches out",
                },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="flex items-start gap-4 p-4 rounded-2xl hover:bg-primary/5 transition-colors"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-lg mb-1">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <Button variant="hero" size="lg" className="mt-8">
              See How It Works
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PatternNudgeSection;
