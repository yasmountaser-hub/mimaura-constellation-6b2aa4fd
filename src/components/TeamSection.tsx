import { useState, useRef } from "react";
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

  const bgY1 = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const bgY2 = useTransform(scrollYProgress, [0, 1], [0, 40]);

  return (
    <section ref={sectionRef} className="relative py-24 sm:py-32 px-4 sm:px-6 overflow-hidden">
      {/* Subtle background orbs */}
      <motion.div style={{ y: bgY1 }} className="absolute top-20 left-[10%] w-[300px] h-[300px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <motion.div style={{ y: bgY2 }} className="absolute bottom-20 right-[10%] w-[250px] h-[250px] bg-rose/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
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

        {/* Views */}
        <AnimatePresence mode="wait">
          {viewMode === "constellation" ? (
            <motion.div
              key="constellation"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.35 }}
            >
              <ConstellationView />
            </motion.div>
          ) : (
            <motion.div
              key="list"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35 }}
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
              <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>
                <Shield className="w-8 h-8 text-primary" />
              </motion.div>
            </div>
            <p className="text-muted-foreground italic leading-relaxed mb-6">
              "Privacy-first by design. Built by real people who care."
            </p>
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
              <motion.div animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>
                <Heart className="w-5 h-5 text-rose mx-auto mb-2" />
              </motion.div>
              <p className="text-sm font-display font-semibold text-primary">— The Mimaura Team ✨</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

/* ========== CONSTELLATION VIEW ========== */
const ConstellationView = () => {
  return (
    <div className="space-y-16 sm:space-y-20">
      {teamGroups.map((group, groupIndex) => (
        <motion.div
          key={group.label}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ delay: 0.08 * groupIndex, duration: 0.5 }}
        >
          {/* Group label */}
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-card/80 border border-border shadow-sm text-sm font-display font-semibold backdrop-blur-sm">
              <span className="text-base">{group.emoji}</span>
              {group.label}
            </span>
            <p className="text-xs text-muted-foreground mt-2 font-display">{group.subtitle}</p>
          </div>

          {/* Members — clean centered grid with generous gaps */}
          <div className="flex flex-wrap justify-center gap-8 sm:gap-12 md:gap-14">
            {group.members.map((member, index) => (
              <div
                key={member.name}
                className={
                  member.tier === "founder"
                    ? "w-36 sm:w-44"
                    : member.tier === "core"
                    ? "w-32 sm:w-40"
                    : "w-28 sm:w-36"
                }
              >
                <TeamCard member={member} index={index} />
              </div>
            ))}
          </div>

          {/* Subtle divider between groups (except last) */}
          {groupIndex < teamGroups.length - 1 && (
            <div className="flex justify-center mt-12 sm:mt-16">
              <div className="flex items-center gap-2">
                <div className="w-8 h-px bg-border/50" />
                <div className="w-1.5 h-1.5 rounded-full bg-primary/20" />
                <div className="w-8 h-px bg-border/50" />
              </div>
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
};

/* ========== LIST VIEW ========== */
const ListView = () => (
  <div className="mt-8 max-w-3xl mx-auto space-y-8">
    {teamGroups.map((group) => (
      <motion.div
        key={group.label}
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h3 className="font-display font-bold text-lg mb-3 flex items-center gap-2">
          <span>{group.emoji}</span> {group.label}
          <span className="text-xs font-normal text-muted-foreground ml-1">{group.subtitle}</span>
        </h3>
        <div className="space-y-2">
          {group.members.map((member) => (
            <div
              key={member.name}
              className="glass-card rounded-xl p-4 flex items-center gap-4 border border-border/50 hover:border-primary/20 transition-colors"
            >
              <div className="shrink-0">
                {member.image ? (
                  <img src={member.image} alt={member.name} className="w-12 h-12 rounded-full object-cover border-2 border-primary/20" loading="lazy" />
                ) : (
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${member.color} flex items-center justify-center`}>
                    <span className="text-xl">{member.emoji}</span>
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-display font-bold text-sm">{member.name}</span>
                  <span className="text-[10px] font-semibold tracking-wider uppercase text-muted-foreground">{member.role}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5 truncate">{member.hoverText}</p>
              </div>
              <div className="flex gap-1.5 shrink-0">
                {member.socials?.linkedin && (
                  <a href={member.socials.linkedin} className="p-1.5 rounded-full bg-primary/10 hover:bg-primary hover:text-primary-foreground transition-all">
                    <Linkedin className="w-3 h-3" />
                  </a>
                )}
                {member.socials?.instagram && (
                  <a href={member.socials.instagram} className="p-1.5 rounded-full bg-primary/10 hover:bg-primary hover:text-primary-foreground transition-all">
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
