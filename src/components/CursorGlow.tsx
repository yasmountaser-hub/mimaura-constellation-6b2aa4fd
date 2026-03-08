import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";
import { useTheme } from "./ThemeProvider";

const CursorGlow = () => {
  const { theme } = useTheme();
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springX = useSpring(cursorX, { stiffness: 150, damping: 15 });
  const springY = useSpring(cursorY, { stiffness: 150, damping: 15 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [cursorX, cursorY]);

  // Only show on desktop and skip low-stim
  if (theme === "low-stim") return null;

  return (
    <motion.div
      className="fixed pointer-events-none z-[9999] hidden md:block"
      style={{
        x: springX,
        y: springY,
        width: 300,
        height: 300,
        marginLeft: -150,
        marginTop: -150,
        background: `radial-gradient(circle, hsl(var(--primary) / 0.06) 0%, transparent 70%)`,
        borderRadius: "50%",
        filter: "blur(2px)",
      }}
    />
  );
};

export default CursorGlow;
