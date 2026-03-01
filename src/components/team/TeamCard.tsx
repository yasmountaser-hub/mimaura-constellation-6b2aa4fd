import { motion } from "framer-motion";
import { Linkedin, Instagram } from "lucide-react";
import type { TeamMember } from "./teamData";

interface TeamCardProps {
  member: TeamMember;
  index: number;
}

const TeamCard = ({ member, index }: TeamCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-40px" }}
    transition={{
      delay: 0.06 * index,
      duration: 0.5,
      type: "spring",
      stiffness: 120,
      damping: 14,
    }}
    className="group"
  >
    <motion.div
      whileHover={{ y: -10 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="relative flex flex-col items-center text-center"
    >
      {/* Avatar with gradient ring */}
      <div className="relative mb-4">
        {/* Gradient ring behind avatar */}
        <motion.div
          className={`absolute -inset-1.5 rounded-full bg-gradient-to-br ${member.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm`}
        />
        <motion.div
          className={`absolute -inset-1 rounded-full bg-gradient-to-br ${member.color} opacity-40 group-hover:opacity-80 transition-opacity duration-500`}
        />
        <motion.div
          whileHover={{ scale: 1.05, rotate: 3 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden bg-card border-2 border-background shadow-lg"
        >
          {member.image ? (
            <img
              src={member.image}
              alt={member.name}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className={`w-full h-full bg-gradient-to-br ${member.color} flex items-center justify-center`}>
              <span className="text-4xl">{member.emoji}</span>
            </div>
          )}
        </motion.div>

        {/* Hover sparkle dots */}
        <motion.div
          className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-accent opacity-0 group-hover:opacity-100 transition-all duration-300"
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.div
          className="absolute -bottom-0.5 -left-1 w-2 h-2 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-all duration-500"
          animate={{ scale: [1, 1.4, 1] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        />
      </div>

      {/* Name */}
      <h4 className="font-display font-bold text-base mb-0.5 group-hover:text-primary transition-colors duration-300">
        {member.name}
      </h4>

      {/* Role pill */}
      <span className="text-[10px] font-semibold tracking-widest uppercase text-muted-foreground mb-2">
        {member.role}
      </span>

      {/* Bio - only visible on hover via max-height */}
      <p className="text-xs text-muted-foreground leading-relaxed max-w-[180px] opacity-70 group-hover:opacity-100 transition-opacity duration-300">
        {member.bio}
      </p>

      {/* Social links */}
      {member.socials && (
        <div className="flex gap-2 mt-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
          {member.socials.linkedin && (
            <motion.a
              href={member.socials.linkedin}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              className="p-1.5 rounded-full bg-primary/10 hover:bg-primary hover:text-primary-foreground transition-all duration-200"
            >
              <Linkedin className="w-3 h-3" />
            </motion.a>
          )}
          {member.socials.instagram && (
            <motion.a
              href={member.socials.instagram}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              className="p-1.5 rounded-full bg-primary/10 hover:bg-primary hover:text-primary-foreground transition-all duration-200"
            >
              <Instagram className="w-3 h-3" />
            </motion.a>
          )}
        </div>
      )}
    </motion.div>
  </motion.div>
);

export default TeamCard;
