import { motion, useInView, useSpring, useTransform } from "framer-motion";
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
  const springValue = useSpring(0, { duration: duration * 1000 });
  const display = useTransform(springValue, (v) => `${prefix}${Math.round(v).toLocaleString()}${suffix}`);

  useEffect(() => {
    if (isInView) springValue.set(target);
  }, [isInView, target, springValue]);

  return (
    <div ref={ref} className={`text-center ${className}`}>
      <motion.span className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-gradient block">
        {display}
      </motion.span>
      <span className="text-sm sm:text-base text-muted-foreground mt-2 block">{label}</span>
    </div>
  );
};

export default AnimatedCounter;
