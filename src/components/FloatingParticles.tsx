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

  // Stars for night mode
  const stars = useMemo<Star[]>(
    () =>
      Array.from({ length: 30 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 1,
        delay: Math.random() * 5,
        opacity: Math.random() * 0.5 + 0.2,
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
          initial={{
            y: "100vh",
            opacity: 0,
          }}
          animate={{
            y: "-100vh",
            opacity: [0, 0.25, 0.25, 0],
          }}
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
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 0.4, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            delay: s.delay,
            ease: "easeInOut",
          }}
          style={{
            left: `${s.x}vw`,
            top: `${s.y}vh`,
            fontSize: s.size,
          }}
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
              background: `hsl(var(--primary) / ${star.opacity})`,
              boxShadow: `0 0 ${star.size * 3}px hsl(var(--primary) / ${star.opacity * 0.5})`,
            }}
            animate={{
              opacity: [star.opacity, star.opacity * 2, star.opacity],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: star.delay,
              ease: "easeInOut",
            }}
          />
        ))}

      {/* Night mode: nebula glow blobs */}
      {isNight && (
        <>
          <motion.div
            className="absolute pointer-events-none rounded-full"
            style={{
              width: "40vw",
              height: "40vw",
              left: "10%",
              top: "20%",
              background: "radial-gradient(circle, hsl(280 60% 50% / 0.06) 0%, transparent 70%)",
              filter: "blur(60px)",
            }}
            animate={{
              x: [0, 30, 0],
              y: [0, -20, 0],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute pointer-events-none rounded-full"
            style={{
              width: "35vw",
              height: "35vw",
              right: "5%",
              top: "50%",
              background: "radial-gradient(circle, hsl(220 60% 50% / 0.05) 0%, transparent 70%)",
              filter: "blur(50px)",
            }}
            animate={{
              x: [0, -20, 0],
              y: [0, 15, 0],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute pointer-events-none rounded-full"
            style={{
              width: "30vw",
              height: "30vw",
              left: "50%",
              bottom: "10%",
              background: "radial-gradient(circle, hsl(340 50% 50% / 0.04) 0%, transparent 70%)",
              filter: "blur(40px)",
            }}
            animate={{
              x: [0, 15, 0],
              y: [0, -25, 0],
            }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          />
        </>
      )}
    </div>
  );
};

export default FloatingParticles;
