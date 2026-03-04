import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Sparkles, Shield, Heart, List, Orbit, Linkedin, Instagram } from "lucide-react";
import { teamGroups } from "./team/teamData";
import TeamCard from "./team/TeamCard";

const trustBadges = [
  { icon: "🔒", label: "Offline-first" },
  { icon: "🚫", label: "No data selling" },
  { icon: "🧬", label: "Science-reviewed" },
  { icon: "🧠", label: "Neurodivergent-friendly" },
];

const TeamSection = () => {
  const [viewMode, setViewMode] = useState<"constellation" | "list">("constellation");
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgY1 = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const bgY2 = useTransform(scrollYProgress, [0, 1], [0, 60]);

  return (
    <section ref={sectionRef} className="relative py-24 sm:py-32 px-4 sm:px-6 overflow-hidden">
      {/* Parallax background orbs */}
      <motion.div
        style={{ y: bgY1 }}
        className="absolute top-20 left-[10%] w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        style={{ y: bgY2 }}
        className="absolute bottom-20 right-[10%] w-[350px] h-[350px] bg-rose/5 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        style={{ y: bgY1 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-accent/3 rounded-full blur-3xl pointer-events-none"
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-display font-semibold text-primary">
              Meet the Humans Behind Mimaura
            </span>
          </motion.div>

          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3">
            The humans behind your{" "}
            <span className="text-gradient">rhythm</span> 💜
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto mb-8">
            Science, empathy, and technology — in sync.
          </p>

          {/* View Toggle */}
          <div className="inline-flex items-center gap-1 p-1 rounded-full bg-card/80 border border-border shadow-sm">
            <button
              onClick={() => setViewMode("constellation")}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-display font-semibold transition-all duration-300 ${
                viewMode === "constellation"
                  ? "bg-primary text-primary-foreground shadow-soft"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Orbit className="w-3.5 h-3.5" />
              Constellation
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-display font-semibold transition-all duration-300 ${
                viewMode === "list"
                  ? "bg-primary text-primary-foreground shadow-soft"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <List className="w-3.5 h-3.5" />
              Team List
            </button>
          </div>
        </motion.div>

        {/* Constellation View */}
        <AnimatePresence mode="wait">
          {viewMode === "constellation" ? (
            <motion.div
              key="constellation"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
            >
              {/* Constellation SVG lines drawn between groups */}
              <ConstellationView />
            </motion.div>
          ) : (
            <motion.div
              key="list"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <ListView />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Trust Signal */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-20"
        >
          <div className="glass-card rounded-3xl p-8 sm:p-10 max-w-2xl mx-auto border border-primary/10 text-center">
            <div className="flex justify-center mb-4">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <Shield className="w-8 h-8 text-primary" />
              </motion.div>
            </div>

            <p className="text-muted-foreground italic leading-relaxed mb-6">
              "Privacy-first by design. Built by real people who care."
            </p>

            {/* Trust badges */}
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
              {trustBadges.map((badge, i) => (
                <motion.div
                  key={badge.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * i }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/5 border border-primary/10 text-xs sm:text-sm font-display font-semibold text-muted-foreground"
                >
                  <span>{badge.icon}</span>
                  {badge.label}
                </motion.div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-border/30">
              <motion.div
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <Heart className="w-5 h-5 text-rose mx-auto mb-2" />
              </motion.div>
              <p className="text-sm font-display font-semibold text-primary">
                — The Mimaura Team ✨
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

/* ========== CONSTELLATION VIEW ========== */
const ConstellationView = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [lines, setLines] = useState<{ x1: number; y1: number; x2: number; y2: number }[]>([]);
  const groupRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Calculate connecting lines between group centers
  useEffect(() => {
    const calculateLines = () => {
      if (!containerRef.current) return;
      const containerRect = containerRef.current.getBoundingClientRect();
      const centers: { x: number; y: number }[] = [];

      groupRefs.current.forEach((ref) => {
        if (ref) {
          const rect = ref.getBoundingClientRect();
          centers.push({
            x: rect.left + rect.width / 2 - containerRect.left,
            y: rect.top + rect.height / 2 - containerRect.top,
          });
        }
      });

      const newLines: { x1: number; y1: number; x2: number; y2: number }[] = [];
      for (let i = 0; i < centers.length - 1; i++) {
        newLines.push({
          x1: centers[i].x,
          y1: centers[i].y,
          x2: centers[i + 1].x,
          y2: centers[i + 1].y,
        });
      }
      setLines(newLines);
    };

    const timer = setTimeout(calculateLines, 500);
    window.addEventListener("resize", calculateLines);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", calculateLines);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative mt-12">
      {/* SVG Constellation lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible">
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(270 60% 65%)" stopOpacity="0.15" />
            <stop offset="50%" stopColor="hsl(270 60% 65%)" stopOpacity="0.3" />
            <stop offset="100%" stopColor="hsl(270 60% 65%)" stopOpacity="0.15" />
          </linearGradient>
        </defs>
        {lines.map((line, i) => (
          <motion.line
            key={i}
            x1={line.x1}
            y1={line.y1}
            x2={line.x2}
            y2={line.y2}
            stroke="url(#lineGradient)"
            strokeWidth="1.5"
            strokeDasharray="6 4"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.3 + i * 0.2 }}
          />
        ))}
      </svg>

      {/* Team groups */}
      {teamGroups.map((group, groupIndex) => (
        <motion.div
          key={group.label}
          ref={(el) => { groupRefs.current[groupIndex] = el; }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ delay: 0.08 * groupIndex }}
          className="relative z-10 mb-14 sm:mb-16"
        >
          {/* Group label */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-center mb-6"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-card/80 border border-border shadow-sm text-sm font-display font-semibold backdrop-blur-sm">
              <span className="text-base">{group.emoji}</span>
              {group.label}
            </span>
            <p className="text-xs text-muted-foreground mt-1.5 font-display">
              {group.subtitle}
            </p>
          </motion.div>

          {/* Members in floating constellation arrangement */}
          <div className="flex flex-wrap justify-center gap-10 sm:gap-14 md:gap-16 pt-4">
            {group.members.map((member, index) => (
              <motion.div
                key={member.name}
                animate={{
                  y: [0, -4, 0, 3, 0],
                }}
                transition={{
                  duration: 5 + index * 0.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: index * 0.3,
                }}
                className={
                  member.tier === "founder"
                    ? "w-40 sm:w-48"
                    : member.tier === "core"
                    ? "w-36 sm:w-44"
                    : "w-32 sm:w-40"
                }
              >
                <TeamCard member={member} index={index} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

/* ========== LIST VIEW ========== */
const ListView = () => (
  <div className="mt-12 max-w-3xl mx-auto space-y-8">
    {teamGroups.map((group) => (
      <motion.div
        key={group.label}
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h3 className="font-display font-bold text-lg mb-3 flex items-center gap-2">
          <span>{group.emoji}</span> {group.label}
          <span className="text-xs font-normal text-muted-foreground ml-1">
            {group.subtitle}
          </span>
        </h3>
        <div className="space-y-2">
          {group.members.map((member) => (
            <div
              key={member.name}
              className="glass-card rounded-xl p-4 flex items-center gap-4 border border-border/50 hover:border-primary/20 transition-colors"
            >
              {/* Small avatar */}
              <div className="shrink-0">
                {member.image ? (
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-primary/20"
                    loading="lazy"
                  />
                ) : (
                  <div
                    className={`w-12 h-12 rounded-full bg-gradient-to-br ${member.color} flex items-center justify-center`}
                  >
                    <span className="text-xl">{member.emoji}</span>
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-display font-bold text-sm">{member.name}</span>
                  <span className="text-[10px] font-semibold tracking-wider uppercase text-muted-foreground">
                    {member.role}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5 truncate">
                  {member.hoverText}
                </p>
              </div>

              {/* Social links */}
              <div className="flex gap-1.5 shrink-0">
                {member.socials?.linkedin && (
                  <a
                    href={member.socials.linkedin}
                    className="p-1.5 rounded-full bg-primary/10 hover:bg-primary hover:text-primary-foreground transition-all"
                  >
                    <Linkedin className="w-3 h-3" />
                  </a>
                )}
                {member.socials?.instagram && (
                  <a
                    href={member.socials.instagram}
                    className="p-1.5 rounded-full bg-primary/10 hover:bg-primary hover:text-primary-foreground transition-all"
                  >
                    <Instagram className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    ))}
  </div>
);

export default TeamSection;
