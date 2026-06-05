import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useRef, useEffect } from "react";

interface AnimatedCounterProps {
  target: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
  label: string;
}

const AnimatedCounter = ({
  target,
  suffix = "",
  prefix = "",
  duration = 2,
  className = "",
  label,
}: AnimatedCounterProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const count = useMotionValue(0);
  const display = useTransform(count, (v) => `${prefix}${Math.round(v).toLocaleString()}${suffix}`);

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(count, target, {
      duration,
      ease: "easeOut",
    });
    return () => controls.stop();
  }, [isInView, target, duration, count]);

  return (
    <div ref={ref} className={`text-center ${className}`}>
      <motion.span className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-gradient block tabular-nums">
        {display}
      </motion.span>
      <span className="text-sm sm:text-base text-muted-foreground mt-2 block">{label}</span>
    </div>
  );
};

export default AnimatedCounter;
