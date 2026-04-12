import { motion } from "framer-motion";

interface GlassOrbProps {
  size?: number;
  color?: string;
  blur?: number;
  className?: string;
  delay?: number;
  duration?: number;
}

const GlassOrb = ({
  size = 200,
  color = "hsl(var(--primary) / 0.12)",
  blur = 60,
  className = "",
  delay = 0,
  duration = 8,
}: GlassOrbProps) => {
  return (
    <motion.div
      className={`absolute rounded-full pointer-events-none ${className}`}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        filter: `blur(${blur}px)`,
      }}
      animate={{
        y: [0, -30, 0, 20, 0],
        x: [0, 15, -10, 5, 0],
        scale: [1, 1.1, 0.95, 1.05, 1],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    />
  );
};

export default GlassOrb;
