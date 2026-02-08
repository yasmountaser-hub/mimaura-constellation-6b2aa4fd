import { motion } from "framer-motion";
import { useMemo } from "react";

interface Particle {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
}

const FloatingParticles = () => {
  // Memoize particles so they don't re-create on every render
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

  return (
    <div className="particles" style={{ willChange: "auto" }}>
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
    </div>
  );
};

export default FloatingParticles;
