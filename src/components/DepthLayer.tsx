import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";

interface DepthLayerProps {
  children: ReactNode;
  className?: string;
  /** How much this layer moves relative to scroll. Negative = foreground (moves faster), positive = background */
  speed?: number;
  /** Optional 3D rotation on scroll */
  rotateOnScroll?: boolean;
}

const DepthLayer = ({ children, className = "", speed = 0, rotateOnScroll = false }: DepthLayerProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [speed * 60, -speed * 60]);
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [3, 0, -3]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.97, 1, 0.97]);

  return (
    <motion.div
      ref={ref}
      style={{
        y,
        rotateX: rotateOnScroll ? rotateX : 0,
        scale: rotateOnScroll ? scale : 1,
        transformPerspective: 1200,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default DepthLayer;
