import { motion } from "framer-motion";
import { GraduationCap, BookOpen, Video, FileText, Brain, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import lutealPreview from "@/assets/luteal-preview.png";

const resources = [
  {
    icon: BookOpen,
    title: "Pattern Basics",
    description: "Learn how to read your body's signals",
    tag: "Beginner",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: Video,
    title: "Video Guides",
    description: "Visual walkthroughs for every feature",
    tag: "Popular",
    color: "bg-accent/10 text-accent",
  },
  {
    icon: FileText,
    title: "Research Hub",
    description: "Evidence-based insights explained simply",
    tag: "Science",
    color: "bg-sky/10 text-sky",
  },
  {
    icon: Brain,
    title: "ND-Friendly Tips",
    description: "Strategies for neurodivergent users",
    tag: "Accessible",
    color: "bg-mint/10 text-mint",
  },
];

const EducationSection = () => {
  return (
    <section className="relative py-24 px-4 sm:px-6 overflow-hidden">

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
            transition={{ type: "spring", stiffness: 200 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6"
          >
            <GraduationCap className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium">Education Hub</span>
          </motion.div>

          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Learn Your <span className="text-gradient">Patterns</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Short, accessible resources to help you understand what your body's trying to tell you — 
            at your own pace, in your own way.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: App preview */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <motion.div
              className="relative z-10 rounded-3xl overflow-hidden shadow-float border border-accent/20"
              whileHover={{ scale: 1.02 }}
            >
              <img
                src={lutealPreview}
                alt="Luteal phase education preview"
                className="w-full h-auto"
              />
            </motion.div>

            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="absolute -bottom-4 -right-4 glass-card px-4 py-2 rounded-xl flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium">Phase-aware insights</span>
            </motion.div>
          </motion.div>

          {/* Right: Resources grid */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            {resources.map((resource, i) => (
              <motion.div
                key={resource.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ x: 8 }}
                className="flex items-start gap-4 p-5 rounded-2xl bg-card/50 border border-primary/10 hover:border-primary/20 cursor-pointer transition-all group"
              >
                <div className={`w-12 h-12 rounded-xl ${resource.color.split(' ')[0]} flex items-center justify-center shrink-0`}>
                  <resource.icon className={`w-6 h-6 ${resource.color.split(' ')[1]}`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-display font-bold">{resource.title}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${resource.color}`}>
                      {resource.tag}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{resource.description}</p>
                </div>
                <motion.div
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                  whileHover={{ x: 5 }}
                >
                  →
                </motion.div>
              </motion.div>
            ))}

            <Button variant="soft" size="lg" className="w-full mt-6">
              Explore All Resources
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
