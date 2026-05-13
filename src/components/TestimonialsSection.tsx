import { motion } from "framer-motion";
import { Quote, Star, Sparkles, Heart } from "lucide-react";

const testimonials = [
  {
    quote:
      "Mimaura feels like the first app that actually understands me. No pressure, no guilt — just support. It’s the first time tracking my cycle hasn’t stressed me out.",
    name: "Anujin",
    context: "The Work Bestie Who Cheered Me Through Everything",
    avatar: "🌷",
    rating: 5,
    color: "from-primary/20 to-lavender-light/30",
  },

  {
    quote:
      "I love how Mimaura doesn’t assume everyone has a perfect 28‑day cycle. It actually adapts to me. Finally an app that doesn’t make me feel broken.",
    name: "Maroua",
    context: "A Quiet Anchor in My Life",
    avatar: "🌙",
    rating: 5,
    color: "from-mint/20 to-sky-soft/30",
  },

  {
    quote:
      "I’ve tried Flo and Clue, but they always felt too clinical. Mimaura feels human. It feels like someone finally built an app for real women with real lives.",
    name: "Laris",
    context: "One of My Most Supportive Voices",
    avatar: "🌼",
    rating: 5,
    color: "from-rose/20 to-rose-soft/30",
  },

  {
    quote:
      "The inclusivity alone made me sign up. The tone, the design, the softness — it’s everything I’ve been missing in other apps. I can’t wait for the full launch.",
    name: "Hajar",
    context: "A Gentle Constant in My Life",
    avatar: "✨",
    rating: 5,
    color: "from-accent/20 to-gold-soft/30",
  },

  {
    quote:
      "As a student juggling stress, deadlines, and hormones, this app feels like a breath of fresh air. It’s gentle, calming, and actually helpful.",
    name: "Sabrina",
    context: "Student & Wellness Learner",
    avatar: "📚",
    rating: 5,
    color: "from-sky/20 to-mint-soft/30",
  },

  {
    quote:
      "You can tell this app was built with real care. The tone is gentle, the design is calming, and the features feel genuinely helpful. This is the future of women’s health.",
    name: "Laura",
    context: "A Warm Light in Every Season",
    avatar: "🌻",
    rating: 5,
    color: "from-gold/20 to-accent/30",
  },
];

const TestimonialsSection = () => {
  return (
    <section className="relative py-24 px-4 sm:px-6 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 aurora-bg opacity-20" />
      </div>

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
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/20 mb-6"
          >
            <Heart className="w-4 h-4 text-gold" />
            <span className="text-sm font-medium">Early Believers</span>
          </motion.div>

          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Why They're <span className="text-gradient">Excited</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real words from real people who can't wait for Mimaura to launch. 
            Join them on this journey.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 40, rotateX: 15 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * index, duration: 0.5 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="group"
            >
              <div className="glass-card rounded-3xl p-6 h-full hover:shadow-float transition-all duration-300 relative overflow-hidden">
                {/* Gradient background on hover */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${testimonial.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                />

                <div className="relative z-10">
                  {/* Quote icon */}
                  <Quote className="w-8 h-8 text-primary/30 mb-4" />

                  {/* Stars */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + i * 0.1 }}
                      >
                        <Star className="w-4 h-4 fill-accent text-accent" />
                      </motion.div>
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-foreground leading-relaxed mb-6 italic">
                    "{testimonial.quote}"
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-3">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 10 }}
                      className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-2xl"
                    >
                      {testimonial.avatar}
                    </motion.div>
                    <div>
                      <p className="font-display font-bold">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.context}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <p className="text-muted-foreground flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4 text-accent" />
            Join 5,000+ people waiting for something different
            <Sparkles className="w-4 h-4 text-accent" />
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
