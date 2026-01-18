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
    // Reduced particle count for better performance
    const newParticles: Particle[] = Array.from({ length: 10 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: Math.random() * 6 + 3,
      duration: Math.random() * 30 + 25,
      delay: Math.random() * 15,
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
            opacity: [0, 0.3, 0.3, 0] 
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
      
      {/* Reduced floating sparkles */}
      {Array.from({ length: 6 }).map((_, i) => (
        <motion.div
          key={`sparkle-${i}`}
          className="absolute text-accent/30"
          initial={{ 
            x: `${Math.random() * 100}vw`, 
            y: `${Math.random() * 100}vh`,
            scale: 0 
          }}
          animate={{ 
            scale: [0, 1, 0],
            opacity: [0, 0.6, 0] 
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "easeInOut",
          }}
          style={{ fontSize: Math.random() * 10 + 8 }}
        >
          ✦
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingParticles;
