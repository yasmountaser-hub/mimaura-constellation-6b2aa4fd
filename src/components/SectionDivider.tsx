import { motion } from "framer-motion";

const SectionDivider = () => {
  return (
    <div className="relative py-4 flex justify-center items-center overflow-hidden">
      <motion.div
        className="w-full max-w-xs h-px"
        style={{
          background: "linear-gradient(90deg, transparent, hsl(var(--primary) / 0.3), hsl(var(--accent) / 0.3), hsl(var(--primary) / 0.3), transparent)",
        }}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut" }}
      />
      <motion.div
        className="absolute w-1.5 h-1.5 rounded-full bg-primary/40"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, type: "spring" }}
      />
    </div>
  );
};

export default SectionDivider;
