import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";

import mimiMagic from "@/assets/mimi-magic.webp";
import mimiThumbsup from "@/assets/mimi-thumbsup.webp";
import mimiLightbulb from "@/assets/mimi-lightbulb.webp";
import mimiWizard from "@/assets/mimi-wizard.webp";

const poses = [
  { src: mimiMagic, alt: "Magic Mimi" },
  { src: mimiThumbsup, alt: "Thumbsup Mimi" },
  { src: mimiLightbulb, alt: "Lightbulb Mimi" },
  { src: mimiWizard, alt: "Wizard Mimi" },
];

const reactions = ["✨", "💜", "🌟", "💖", "🦋", "🌸"];

interface InteractiveMimiProps {
  className?: string;
}

const InteractiveMimi = ({ className = "" }: InteractiveMimiProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [poseIndex, setPoseIndex] = useState(0);
  const [clickSparks, setClickSparks] = useState<{ id: number; x: number; y: number; emoji: string }[]>([]);
  const sparkId = useRef(0);

  // Eyes (entire Mimi image) follow cursor
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const followX = useSpring(mouseX, { stiffness: 100, damping: 20 });
  const followY = useSpring(mouseY, { stiffness: 100, damping: 20 });

  // Convert to tilt
  const tiltX = useTransform(followY, [-200, 200], [8, -8]);
  const tiltY = useTransform(followX, [-200, 200], [-8, 8]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  }, [mouseX, mouseY]);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  // Click reaction — change pose + spark emoji
  const handleClick = (e: React.MouseEvent) => {
    setPoseIndex((prev) => (prev + 1) % poses.length);
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const id = sparkId.current++;
    const emoji = reactions[Math.floor(Math.random() * reactions.length)];
    setClickSparks((prev) => [...prev, { id, x: e.clientX - rect.left, y: e.clientY - rect.top, emoji }]);
    setTimeout(() => setClickSparks((prev) => prev.filter((s) => s.id !== id)), 1200);
  };

  const currentPose = poses[poseIndex];

  return (
    <div
      ref={ref}
      onClick={handleClick}
      className={`relative cursor-pointer select-none ${className}`}
      style={{ perspective: 600 }}
    >
      {/* Glow behind Mimi */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: "radial-gradient(circle, hsl(var(--primary) / 0.15) 0%, transparent 70%)",
        }}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Mimi image with tilt following cursor */}
      <motion.img loading="lazy" decoding="async"
        key={poseIndex}
        src={currentPose.src}
        alt={currentPose.alt}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1, y: [0, -12, 0] }}
        transition={{
          scale: { duration: 0.3, type: "spring", stiffness: 300 },
          opacity: { duration: 0.2 },
          y: { duration: 5, repeat: Infinity, ease: "easeInOut" },
        }}
        style={{ rotateX: tiltX, rotateY: tiltY }}
        className="relative z-10 w-full max-w-xs mx-auto drop-shadow-2xl"
      />

      {/* Tooltip */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs text-muted-foreground whitespace-nowrap"
      >
        Click me! 👆
      </motion.div>

      {/* Click sparks */}
      {clickSparks.map((spark) => (
        <motion.span
          key={spark.id}
          className="absolute text-2xl pointer-events-none z-20"
          initial={{ opacity: 1, scale: 0, x: spark.x, y: spark.y }}
          animate={{
            opacity: 0,
            scale: 1.5,
            y: spark.y - 60,
            x: spark.x + (Math.random() - 0.5) * 80,
          }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {spark.emoji}
        </motion.span>
      ))}
    </div>
  );
};

export default InteractiveMimi;
