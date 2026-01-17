import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Particle {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
}

const FloatingParticles = () => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const newParticles: Particle[] = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: Math.random() * 8 + 4,
      duration: Math.random() * 20 + 15,
      delay: Math.random() * 10,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="particles">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="particle"
          initial={{ 
            y: "100vh", 
            x: `${particle.x}vw`, 
            opacity: 0 
          }}
          animate={{ 
            y: "-100vh", 
            opacity: [0, 0.6, 0.6, 0] 
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
          }}
        />
      ))}
      
      {/* Floating sparkles */}
      {Array.from({ length: 15 }).map((_, i) => (
        <motion.div
          key={`sparkle-${i}`}
          className="absolute text-accent/40"
          initial={{ 
            x: `${Math.random() * 100}vw`, 
            y: `${Math.random() * 100}vh`,
            scale: 0 
          }}
          animate={{ 
            scale: [0, 1, 0],
            opacity: [0, 1, 0] 
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: Math.random() * 3,
            ease: "easeInOut",
          }}
          style={{ fontSize: Math.random() * 12 + 8 }}
        >
          ✦
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingParticles;
