import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight, Download, Instagram, Twitter, Linkedin, Youtube } from "lucide-react";
import mimiMagic from "@/assets/mimi-magic.png";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 py-20 pt-24 sm:pt-20 overflow-hidden">
      {/* Subtle gradient background - no animated blobs */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        {/* Left content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center lg:text-left space-y-8"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Neurodiverse-Friendly Wellness</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight"
          >
            Your Body Has{" "}
            <span className="text-gradient">Patterns.</span>
            <br />
            <span className="text-muted-foreground">Let's Learn Them</span>{" "}
            <span className="text-gradient">Together.</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg md:text-xl text-muted-foreground max-w-lg mx-auto lg:mx-0 leading-relaxed"
          >
            Mimaura gently connects the dots between your symptoms, moods, and rhythms — 
            no pressure, no judgment. Just soft insights when you need them.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
          >
            <Button variant="hero" size="xl" className="group">
              Join the Waitlist
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="glass" size="lg" className="gap-2">
              <Download className="w-4 h-4" />
              Get the App Soon
            </Button>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="flex items-center gap-4 justify-center lg:justify-start pt-4"
          >
            <span className="text-sm text-muted-foreground">Follow Mimi:</span>
            <div className="flex gap-3">
              {[Instagram, Twitter, Linkedin, Youtube].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
                >
                  <Icon className="w-4 h-4 text-primary" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Right: Mimi mascot */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="relative flex justify-center items-center"
        >
          {/* Outer ring - subtle border only */}
          <motion.div
            className="absolute w-72 h-72 md:w-80 md:h-80 rounded-full border-2 border-primary/20"
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          />
          
          {/* Floating stars around Mimi */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-accent text-2xl"
              style={{
                top: `${20 + i * 15}%`,
                left: `${10 + i * 20}%`,
              }}
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, 180, 360],
                scale: [1, 1.2, 1]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity, 
                delay: i * 0.5,
                ease: "easeInOut"
              }}
            >
              ✦
            </motion.div>
          ))}

          {/* Mimi image */}
          <motion.img
            src={mimiMagic}
            alt="Magic Mimi - Your wellness companion"
            className="relative w-64 h-64 md:w-80 md:h-80 object-contain drop-shadow-2xl"
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Speech bubble */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, type: "spring", stiffness: 200 }}
            className="absolute -top-4 right-0 md:right-10 bg-card/90 backdrop-blur-sm px-4 py-3 rounded-2xl rounded-br-sm shadow-card border border-primary/10"
          >
            <p className="text-sm font-medium">Hi! I'm Mimi ✨</p>
            <p className="text-xs text-muted-foreground">Your pattern pal!</p>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-muted-foreground"
        >
          <span className="text-xs tracking-widest uppercase">Scroll to explore</span>
          <div className="w-6 h-10 rounded-full border-2 border-primary/30 p-1">
            <motion.div
              className="w-2 h-2 bg-primary rounded-full mx-auto"
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
