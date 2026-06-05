import { motion } from "framer-motion";
import { Shield, Lock, Eye, Heart } from "lucide-react";
import mimiPrivacy from "@/assets/mimi-privacy.webp";

const TrustSection = () => {
  const trustItems = [
    {
      icon: Lock,
      title: "End-to-End Encrypted",
      description: "Your health data is encrypted at rest and in transit. Only you can access it.",
    },
    {
      icon: Eye,
      title: "No Data Selling",
      description: "We will never sell your data. Period. That's not how we make money.",
    },
    {
      icon: Shield,
      title: "HIPAA-Ready",
      description: "Built with healthcare compliance in mind from day one.",
    },
    {
      icon: Heart,
      title: "Trauma-Informed",
      description: "Designed with care for those who've had bad experiences with health tech.",
    },
  ];

  return (
    <section className="relative py-24 px-4 sm:px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Mimi with lock */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative flex justify-center"
          >
            <motion.div
              className="absolute w-64 h-64 bg-primary/10 rounded-full blur-3xl"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 5, repeat: Infinity }}
            />
            <motion.img loading="lazy" decoding="async"
              src={mimiPrivacy}
              alt="Mimi holding a lock - Privacy first"
              className="relative z-10 w-64 h-64 object-contain"
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />
            
            {/* Floating shield icons */}
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  top: `${20 + i * 20}%`,
                  left: i % 2 === 0 ? "10%" : "85%",
                }}
                animate={{
                  y: [0, -10, 0],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.5,
                }}
              >
                <Shield className="w-6 h-6 text-primary/40" />
              </motion.div>
            ))}
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-mint/10 border border-mint/20 mb-6"
              >
                <Shield className="w-4 h-4 text-mint" />
                <span className="text-sm font-medium text-mint">Your Privacy Matters</span>
              </motion.div>

              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
                Built on <span className="text-gradient">Trust</span>
              </h2>

              <p className="text-lg text-muted-foreground leading-relaxed">
                Your body's data is deeply personal. We treat it that way — 
                with the care, security, and respect it deserves.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {trustItems.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * i }}
                  whileHover={{ scale: 1.02 }}
                  className="p-5 rounded-2xl bg-card/50 border border-primary/10 hover:border-primary/20 transition-all"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-display font-bold mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
