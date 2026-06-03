import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight, Download, Instagram, Linkedin } from "lucide-react";

const TikTokIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.69a8.16 8.16 0 0 0 4.77 1.52V6.69h-1.84z" />
  </svg>
);
import MagneticButton from "@/components/MagneticButton";
import GlassOrb from "@/components/GlassOrb";
import mimiMagic from "@/assets/mimi-magic.png";

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const textY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const mimiY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const starsY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const sectionRotateX = useTransform(scrollYProgress, [0, 1], [0, 5]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 py-20 pt-24 sm:pt-20 overflow-hidden"
      style={{ perspective: "1400px" }}
    >
      {/* Floating glass orbs — depth layer background */}
      <div className="absolute inset-0 -z-5 overflow-hidden">
        <GlassOrb size={350} color="hsl(var(--primary) / 0.08)" blur={80} className="top-[10%] left-[-5%]" delay={0} duration={10} />
        <GlassOrb size={250} color="hsl(var(--accent) / 0.1)" blur={60} className="top-[60%] right-[-3%]" delay={2} duration={8} />
        <GlassOrb size={180} color="hsl(var(--rose) / 0.08)" blur={50} className="top-[30%] right-[20%]" delay={4} duration={12} />
        <GlassOrb size={120} color="hsl(var(--sky) / 0.1)" blur={40} className="bottom-[15%] left-[15%]" delay={1} duration={9} />
        <GlassOrb size={160} color="hsl(var(--mint) / 0.08)" blur={45} className="top-[5%] right-[40%]" delay={3} duration={11} />
      </div>

      {/* Parallax gradient background */}
      <motion.div
        className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/5 via-transparent to-accent/5"
        style={{ scale: bgScale, opacity: bgOpacity }}
      />

      {/* Main content with 3D perspective tilt on scroll */}
      <motion.div
        className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center w-full"
        style={{ rotateX: sectionRotateX, transformOrigin: "center top" }}
      >
        {/* Left content — foreground parallax */}
        <motion.div
          initial={{ opacity: 0, x: -50, rotateY: -5 }}
          animate={{ opacity: 1, x: 0, rotateY: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          style={{ y: textY, transformStyle: "preserve-3d" }}
          className="text-center lg:text-left space-y-8"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20, z: -20 }}
            animate={{ opacity: 1, y: 0, z: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-md"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Neurodiverse-Friendly Wellness</span>
          </motion.div>

          {/* Headline — staggered 3D entrance */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight"
          >
            Your Body Has{" "}
            <motion.span
              className="text-gradient inline-block"
              initial={{ rotateX: 30, opacity: 0 }}
              animate={{ rotateX: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              style={{ transformStyle: "preserve-3d" }}
            >
              Patterns.
            </motion.span>
            <br />
            <span className="text-muted-foreground">Let's Learn Them</span>{" "}
            <motion.span
              className="text-gradient inline-block"
              initial={{ rotateX: 30, opacity: 0 }}
              animate={{ rotateX: 0, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              style={{ transformStyle: "preserve-3d" }}
            >
              Together.
            </motion.span>
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
            <MagneticButton strength={0.35}>
              <Button
                variant="hero"
                size="xl"
                className="group"
                onClick={() =>
                  document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Join the Waitlist
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </MagneticButton>
            <MagneticButton strength={0.25}>
              <Button variant="glass" size="lg" className="gap-2">
                <Download className="w-4 h-4" />
                Get the App Soon
              </Button>
            </MagneticButton>
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
              {[
                { Icon: Instagram, href: "https://www.instagram.com/mimaura_app/", label: "Instagram" },
                { Icon: TikTokIcon, href: "https://www.tiktok.com/@mimaura_app", label: "TikTok" },
                { Icon: Linkedin, href: "https://www.linkedin.com/company/mimaura", label: "LinkedIn" },
              ].map(({ Icon, href, label }) => (
                <MagneticButton key={label} strength={0.5}>
                  <motion.a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Follow Mimaura on ${label}`}
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors block"
                  >
                    <Icon className="w-4 h-4 text-primary" />
                  </motion.a>
                </MagneticButton>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Right: Mimi mascot — 3D floating platform */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotateY: 10 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          style={{ y: mimiY, transformStyle: "preserve-3d" }}
          className="relative flex justify-center items-center"
        >
          {/* 3D floating platform shadow */}
          <motion.div
            className="absolute bottom-[-10%] w-64 h-16 rounded-[50%] mx-auto"
            style={{
              background: "radial-gradient(ellipse, hsl(var(--primary) / 0.15) 0%, transparent 70%)",
              filter: "blur(15px)",
            }}
            animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.3, 0.5] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Outer ring */}
          <motion.div
            className="absolute w-72 h-72 md:w-80 md:h-80 rounded-full border-2 border-primary/10"
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            style={{ transformStyle: "preserve-3d", rotateX: 60 }}
          />

          {/* Second ring — opposite direction, different tilt */}
          <motion.div
            className="absolute w-64 h-64 md:w-72 md:h-72 rounded-full border border-accent/15"
            animate={{ rotate: -360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            style={{ transformStyle: "preserve-3d", rotateX: 70, rotateZ: 30 }}
          />
          
          {/* Floating stars — deepest parallax layer */}
          <motion.div style={{ y: starsY }} className="absolute inset-0">
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
          </motion.div>

          {/* Mimi image — floating with 3D bob */}
          <motion.img
            src={mimiMagic}
            alt="Magic Mimi - Your wellness companion"
            className="relative w-64 h-64 md:w-80 md:h-80 object-contain drop-shadow-2xl z-10"
            animate={{
              y: [0, -18, 0],
              rotateY: [0, 3, 0, -3, 0],
              rotateZ: [0, 1, 0, -1, 0],
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformStyle: "preserve-3d" }}
          />

          {/* Speech bubble — slight 3D offset */}
          <motion.div
            initial={{ opacity: 0, scale: 0, z: 30 }}
            animate={{ opacity: 1, scale: 1, z: 30 }}
            transition={{ delay: 1, type: "spring", stiffness: 200 }}
            className="absolute -top-4 right-0 md:right-10 bg-card/90 backdrop-blur-md px-4 py-3 rounded-2xl rounded-br-sm shadow-card border border-primary/10 z-20"
            style={{ transformStyle: "preserve-3d", translateZ: 30 }}
          >
            <p className="text-sm font-medium">Hi! I'm Mimi ✨</p>
            <p className="text-xs text-muted-foreground">Your pattern pal!</p>
          </motion.div>
        </motion.div>
      </motion.div>

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
