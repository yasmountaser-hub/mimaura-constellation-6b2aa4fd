import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Linkedin, Instagram, ArrowRight } from "lucide-react";
import type { TeamMember } from "./teamData";

interface TeamCardProps {
  member: TeamMember;
  index: number;
}

const tierSizes = {
  founder: "w-32 h-32 sm:w-40 sm:h-40",
  core: "w-28 h-28 sm:w-36 sm:h-36",
  team: "w-24 h-24 sm:w-32 sm:h-32",
  advisor: "w-24 h-24 sm:w-32 sm:h-32",
};

const TeamCard = ({ member, index }: TeamCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        delay: 0.08 * index,
        duration: 0.6,
        type: "spring",
        stiffness: 100,
        damping: 15,
      }}
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex flex-col items-center text-center relative">
        {/* Floating hover emojis that burst out */}
        <AnimatePresence>
          {isHovered &&
            member.hoverEmojis.map((emoji, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0, y: 0, x: 0 }}
                animate={{
                  opacity: [0, 1, 1, 0],
                  scale: [0.3, 1.2, 1, 0.8],
                  y: [-10, -40 - i * 15, -60 - i * 20, -80 - i * 20],
                  x: [0, (i - 1) * 30, (i - 1) * 40, (i - 1) * 45],
                }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{
                  duration: 1.5,
                  delay: i * 0.15,
                  ease: "easeOut",
                }}
                className="absolute top-0 text-xl sm:text-2xl pointer-events-none z-20"
              >
                {emoji}
              </motion.span>
            ))}
        </AnimatePresence>

        {/* Avatar container */}
        <div className="relative mb-3">
          {/* Outer glow ring - animated on hover */}
          <motion.div
            animate={
              isHovered
                ? {
                    scale: [1, 1.1, 1.05],
                    opacity: [0.4, 0.8, 0.6],
                  }
                : { scale: 1, opacity: 0.2 }
            }
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className={`absolute -inset-2 rounded-full bg-gradient-to-br ${member.color} blur-md`}
          />

          {/* Spinning gradient border */}
          <motion.div
            animate={isHovered ? { rotate: 360 } : { rotate: 0 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className={`absolute -inset-1 rounded-full bg-gradient-to-br ${member.color} ${isHovered ? "opacity-80" : "opacity-30"} transition-opacity duration-500`}
          />

          {/* Avatar */}
          <motion.div
            animate={
              isHovered
                ? { scale: 1.08, y: -4 }
                : { scale: 1, y: 0 }
            }
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className={`relative ${tierSizes[member.tier]} rounded-full overflow-hidden bg-card border-3 border-background shadow-lg z-10`}
          >
            {member.image ? (
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-full object-cover object-center"
                loading="lazy"
              />
            ) : (
              <div
                className={`w-full h-full bg-gradient-to-br ${member.color} flex items-center justify-center`}
              >
                <span className="text-3xl sm:text-4xl">{member.emoji}</span>
              </div>
            )}

            {/* Alive overlay on hover - subtle shimmer */}
            <motion.div
              animate={isHovered ? { opacity: [0, 0.15, 0] } : { opacity: 0 }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="absolute inset-0 bg-gradient-to-t from-transparent via-white/20 to-transparent pointer-events-none"
            />
          </motion.div>

          {/* Pulse ring for founders */}
          {member.tier === "founder" && (
            <motion.div
              animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
              className={`absolute -inset-3 rounded-full border-2 border-primary/30`}
            />
          )}
        </div>

        {/* Name */}
        <motion.h4
          animate={isHovered ? { scale: 1.05 } : { scale: 1 }}
          className="font-display font-bold text-sm sm:text-base mb-0.5 transition-colors duration-300 group-hover:text-primary"
        >
          {member.name}
        </motion.h4>

        {/* Role */}
        <span className="text-[10px] sm:text-xs font-semibold tracking-wider uppercase text-muted-foreground mb-1.5 leading-tight max-w-[140px]">
          {member.role}
        </span>

        {/* Hover glass card */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 5, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="absolute top-full mt-2 z-30 w-52 sm:w-56"
            >
              <div className="glass-card rounded-2xl p-4 border border-primary/20 shadow-float">
                <p className="text-xs text-muted-foreground leading-relaxed mb-3 italic">
                  "{member.hoverText}"
                </p>
                <a
                  href={member.ctaLink}
                  className="inline-flex items-center gap-1.5 text-xs font-display font-bold text-primary hover:text-primary/80 transition-colors"
                >
                  {member.ctaText}
                  <ArrowRight className="w-3 h-3" />
                </a>

                {/* Social links */}
                {member.socials && (
                  <div className="flex gap-2 mt-2.5 pt-2.5 border-t border-border/50">
                    {member.socials.linkedin && (
                      <a
                        href={member.socials.linkedin}
                        className="p-1.5 rounded-full bg-primary/10 hover:bg-primary hover:text-primary-foreground transition-all duration-200"
                      >
                        <Linkedin className="w-3 h-3" />
                      </a>
                    )}
                    {member.socials.instagram && (
                      <a
                        href={member.socials.instagram}
                        className="p-1.5 rounded-full bg-primary/10 hover:bg-primary hover:text-primary-foreground transition-all duration-200"
                      >
                        <Instagram className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default TeamCard;
