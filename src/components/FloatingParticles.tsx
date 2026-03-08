import { motion } from "framer-motion";
import { useMemo } from "react";
import { useTheme } from "./ThemeProvider";

interface Particle {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
}

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  opacity: number;
}

const FloatingParticles = () => {
  const { theme } = useTheme();
  const isNight = theme === "night";

  const particles = useMemo<Particle[]>(
    () =>
      Array.from({ length: 8 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        size: Math.random() * 5 + 2,
        duration: Math.random() * 30 + 30,
        delay: Math.random() * 15,
      })),
    []
  );

  const sparkles = useMemo(
    () =>
      Array.from({ length: 5 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 6,
        size: Math.random() * 8 + 8,
      })),
    []
  );

  const stars = useMemo<Star[]>(
    () =>
      Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2.5 + 0.5,
        delay: Math.random() * 5,
        opacity: Math.random() * 0.6 + 0.2,
      })),
    []
  );

  // Shooting stars for night mode
  const shootingStars = useMemo(
    () =>
      Array.from({ length: 3 }, (_, i) => ({
        id: i,
        startX: Math.random() * 60 + 20,
        startY: Math.random() * 30 + 5,
        delay: i * 8 + Math.random() * 5,
      })),
    []
  );

  return (
    <div className="particles" style={{ willChange: "auto" }}>
      {/* Regular particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="particle"
          initial={{ y: "100vh", opacity: 0 }}
          animate={{ y: "-100vh", opacity: [0, 0.25, 0.25, 0] }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "linear",
          }}
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            willChange: "transform",
          }}
        />
      ))}

      {/* Sparkles */}
      {sparkles.map((s) => (
        <motion.div
          key={`sparkle-${s.id}`}
          className="absolute text-accent/20 pointer-events-none select-none"
          animate={{ scale: [0, 1, 0], opacity: [0, 0.4, 0] }}
          transition={{
            duration: 5,
            repeat: Infinity,
            delay: s.delay,
            ease: "easeInOut",
          }}
          style={{ left: `${s.x}vw`, top: `${s.y}vh`, fontSize: s.size }}
        >
          ✦
        </motion.div>
      ))}

      {/* Night mode: twinkling stars */}
      {isNight &&
        stars.map((star) => (
          <motion.div
            key={`star-${star.id}`}
            className="absolute rounded-full pointer-events-none"
            style={{
              left: `${star.x}vw`,
              top: `${star.y}vh`,
              width: star.size,
              height: star.size,
              background: star.id % 5 === 0
                ? `hsl(var(--accent) / ${star.opacity})`
                : `hsl(var(--primary) / ${star.opacity})`,
              boxShadow: `0 0 ${star.size * 4}px hsl(var(--primary) / ${star.opacity * 0.6})`,
            }}
            animate={{
              opacity: [star.opacity, star.opacity * 2.5, star.opacity],
              scale: [1, 1.8, 1],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: star.delay,
              ease: "easeInOut",
            }}
          />
        ))}

      {/* Night mode: shooting stars */}
      {isNight &&
        shootingStars.map((ss) => (
          <motion.div
            key={`shoot-${ss.id}`}
            className="absolute pointer-events-none"
            style={{
              left: `${ss.startX}%`,
              top: `${ss.startY}%`,
              width: "2px",
              height: "2px",
              borderRadius: "50%",
              background: "hsl(var(--primary-foreground))",
              boxShadow: `
                0 0 4px 1px hsl(var(--primary) / 0.8),
                -30px 0 20px 1px hsl(var(--primary) / 0.3),
                -60px 0 30px 0px hsl(var(--primary) / 0.1)
              `,
            }}
            animate={{
              x: [0, 300],
              y: [0, 150],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              delay: ss.delay,
              repeatDelay: 12,
              ease: "easeOut",
            }}
          />
        ))}

      {/* Night mode: nebula glow blobs */}
      {isNight && (
        <>
          <motion.div
            className="absolute pointer-events-none rounded-full"
            style={{
              width: "50vw",
              height: "50vw",
              left: "5%",
              top: "15%",
              background: "radial-gradient(circle, hsl(280 70% 50% / 0.08) 0%, hsl(260 60% 40% / 0.03) 40%, transparent 70%)",
              filter: "blur(80px)",
            }}
            animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
            transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute pointer-events-none rounded-full"
            style={{
              width: "45vw",
              height: "45vw",
              right: "0%",
              top: "45%",
              background: "radial-gradient(circle, hsl(220 70% 55% / 0.07) 0%, hsl(240 50% 40% / 0.03) 40%, transparent 70%)",
              filter: "blur(70px)",
            }}
            animate={{ x: [0, -30, 0], y: [0, 20, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute pointer-events-none rounded-full"
            style={{
              width: "40vw",
              height: "40vw",
              left: "40%",
              bottom: "5%",
              background: "radial-gradient(circle, hsl(340 60% 50% / 0.06) 0%, hsl(320 40% 40% / 0.02) 40%, transparent 70%)",
              filter: "blur(60px)",
            }}
            animate={{ x: [0, 20, 0], y: [0, -35, 0] }}
            transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* Additional purple aurora band */}
          <motion.div
            className="absolute pointer-events-none"
            style={{
              width: "100vw",
              height: "30vh",
              left: "0",
              top: "10%",
              background: "linear-gradient(90deg, transparent 0%, hsl(270 60% 50% / 0.04) 30%, hsl(300 50% 50% / 0.06) 50%, hsl(270 60% 50% / 0.04) 70%, transparent 100%)",
              filter: "blur(40px)",
            }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
        </>
      )}
    </div>
  );
};

export default FloatingParticles;
