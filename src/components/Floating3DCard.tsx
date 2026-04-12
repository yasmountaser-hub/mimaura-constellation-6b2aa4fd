import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, ReactNode } from "react";

interface Floating3DCardProps {
  children: ReactNode;
  className?: string;
  depth?: number;
  glare?: boolean;
}

const Floating3DCard = ({ children, className = "", depth = 20, glare = true }: Floating3DCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(y, [0, 1], [depth, -depth]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(x, [0, 1], [-depth, depth]), { stiffness: 150, damping: 20 });
  const z = useSpring(0, { stiffness: 200, damping: 25 });

  const glareX = useTransform(x, [0, 1], [0, 100]);
  const glareY = useTransform(y, [0, 1], [0, 100]);
  const glareOpacity = useSpring(0, { stiffness: 200, damping: 30 });

  const innerZ = useSpring(0, { stiffness: 200, damping: 25 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width);
    y.set((e.clientY - rect.top) / rect.height);
    glareOpacity.set(0.2);
    z.set(30);
    innerZ.set(40);
  };

  const handleMouseLeave = () => {
    x.set(0.5);
    y.set(0.5);
    glareOpacity.set(0);
    z.set(0);
    innerZ.set(0);
  };

  return (
    <motion.div
      ref={ref}
      style={{
        rotateX,
        rotateY,
        translateZ: z,
        transformPerspective: 1200,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative ${className}`}
    >
      <motion.div style={{ translateZ: innerZ, transformStyle: "preserve-3d" }}>
        {children}
      </motion.div>

      {glare && (
        <motion.div
          className="absolute inset-0 rounded-3xl pointer-events-none z-10"
          style={{
            background: useTransform(
              [glareX, glareY],
              ([gx, gy]) =>
                `radial-gradient(circle at ${gx}% ${gy}%, hsl(var(--primary) / 0.2), transparent 60%)`
            ),
            opacity: glareOpacity,
          }}
        />
      )}
    </motion.div>
  );
};

export default Floating3DCard;
