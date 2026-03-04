import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Linkedin, Instagram, ArrowRight } from "lucide-react";
import type { TeamMember } from "./teamData";

interface TeamCardProps {
  member: TeamMember;
  index: number;
}

const avatarSizes = {
  founder: "w-28 h-28 sm:w-36 sm:h-36",
  core: "w-24 h-24 sm:w-32 sm:h-32",
  team: "w-20 h-20 sm:w-28 sm:h-28",
  advisor: "w-20 h-20 sm:w-28 sm:h-28",
};

const TeamCard = ({ member, index }: TeamCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ delay: 0.06 * index, duration: 0.5 }}
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex flex-col items-center text-center">
        {/* Avatar container */}
        <div className="relative mb-3">
          {/* Soft glow behind avatar */}
          <motion.div
            animate={isHovered ? { opacity: 0.5, scale: 1.15 } : { opacity: 0.15, scale: 1 }}
            transition={{ duration: 0.4 }}
            className={`absolute -inset-3 rounded-full bg-gradient-to-br ${member.color} blur-xl`}
          />

          {/* Gradient ring */}
          <motion.div
            animate={isHovered ? { opacity: 0.7, scale: 1.04 } : { opacity: 0.25, scale: 1 }}
            transition={{ duration: 0.4 }}
            className={`absolute -inset-1.5 rounded-full bg-gradient-to-br ${member.color}`}
          />

          {/* Avatar image */}
          <motion.div
            animate={isHovered ? { scale: 1.06 } : { scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className={`relative ${avatarSizes[member.tier]} rounded-full overflow-hidden bg-card border-[3px] border-background shadow-lg z-10`}
          >
            {member.image ? (
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-full object-cover object-center"
                loading="lazy"
              />
            ) : (
              <div className={`w-full h-full bg-gradient-to-br ${member.color} flex items-center justify-center`}>
                <span className="text-2xl sm:text-3xl">{member.emoji}</span>
              </div>
            )}
          </motion.div>

          {/* Hover emoji burst — contained, doesn't affect layout */}
          <AnimatePresence>
            {isHovered &&
              member.hoverEmojis.map((emoji, i) => {
                const angles = [-45, 0, 45];
                const angle = (angles[i] ?? i * 30) * (Math.PI / 180);
                const dist = 50 + i * 10;
                return (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                      opacity: [0, 1, 0],
                      scale: [0.3, 1.1, 0.6],
                      x: Math.cos(angle) * dist,
                      y: Math.sin(angle) * -dist,
                    }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.2, delay: i * 0.12 }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-lg pointer-events-none z-20"
                  >
                    {emoji}
                  </motion.span>
                );
              })}
          </AnimatePresence>

          {/* Founder pulse ring */}
          {member.tier === "founder" && (
            <motion.div
              animate={{ scale: [1, 1.25, 1], opacity: [0.25, 0, 0.25] }}
              transition={{ duration: 2.5, repeat: Infinity }}
              className="absolute -inset-3 rounded-full border-2 border-primary/20 z-0"
            />
          )}
        </div>

        {/* Name */}
        <h4 className="font-display font-bold text-sm sm:text-base mb-0.5 transition-colors duration-300 group-hover:text-primary leading-tight">
          {member.name}
        </h4>

        {/* Role */}
        <span className="text-[10px] sm:text-xs font-semibold tracking-wider uppercase text-muted-foreground leading-tight max-w-[130px] block">
          {member.role}
        </span>

        {/* Inline hover reveal — NO floating popup, no overlap */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="overflow-hidden mt-2 w-full max-w-[180px]"
            >
              <p className="text-[11px] text-muted-foreground leading-relaxed italic mb-2">
                "{member.hoverText}"
              </p>
              <div className="flex items-center justify-center gap-2">
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
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default TeamCard;
