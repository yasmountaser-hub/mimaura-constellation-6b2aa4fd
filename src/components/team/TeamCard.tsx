import { motion } from "framer-motion";
import { Linkedin, Instagram, Sparkles } from "lucide-react";
import type { TeamMember } from "./teamData";

interface TeamCardProps {
  member: TeamMember;
  index: number;
}

const TeamCard = ({ member, index }: TeamCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 40, scale: 0.9 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{
      delay: 0.08 * index,
      duration: 0.5,
      type: "spring",
      stiffness: 120,
      damping: 14,
    }}
    className="group"
  >
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="relative rounded-3xl p-[1px] h-full overflow-hidden"
    >
      {/* Animated gradient border on hover */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${member.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl`}
      />

      <div className="relative glass-card rounded-3xl p-6 h-full overflow-hidden">
        {/* Background glow */}
        <motion.div
          className={`absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br ${member.color} rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-all duration-700`}
        />
        <motion.div
          className={`absolute -bottom-8 -left-8 w-24 h-24 bg-gradient-to-br ${member.color} rounded-full blur-2xl opacity-0 group-hover:opacity-15 transition-all duration-700`}
        />

        <div className="relative z-10">
          {/* Avatar */}
          <div className="relative mx-auto w-24 h-24 mb-5">
            {/* Floating sparkle */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            >
              <Sparkles className="absolute -top-1 -right-1 w-3.5 h-3.5 text-accent" />
              <Sparkles className="absolute -bottom-0.5 -left-1 w-3 h-3 text-primary" />
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.08, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
              className={`w-24 h-24 rounded-2xl bg-gradient-to-br ${member.color} p-[2px] shadow-glow overflow-hidden`}
            >
              <div className="w-full h-full rounded-[14px] overflow-hidden bg-card flex items-center justify-center">
                {member.image ? (
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <span className="text-4xl">{member.emoji}</span>
                )}
              </div>
            </motion.div>
          </div>

          {/* Info */}
          <div className="text-center">
            <h4 className="font-display font-bold text-base mb-1 group-hover:text-primary transition-colors duration-300">
              {member.name}
            </h4>
            <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/8 border border-primary/10 mb-3">
              <p className="text-[11px] text-primary font-semibold tracking-wide uppercase">
                {member.role}
              </p>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed mb-4">
              {member.bio}
            </p>

            {/* Social links */}
            {member.socials && (
              <div className="flex justify-center gap-2">
                {member.socials.linkedin && (
                  <motion.a
                    href={member.socials.linkedin}
                    whileHover={{ scale: 1.15, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 rounded-xl bg-primary/10 hover:bg-primary hover:text-primary-foreground transition-all duration-300 group/link"
                  >
                    <Linkedin className="w-3.5 h-3.5 text-primary group-hover/link:text-primary-foreground transition-colors" />
                  </motion.a>
                )}
                {member.socials.instagram && (
                  <motion.a
                    href={member.socials.instagram}
                    whileHover={{ scale: 1.15, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 rounded-xl bg-rose/10 hover:bg-rose hover:text-primary-foreground transition-all duration-300 group/link"
                  >
                    <Instagram className="w-3.5 h-3.5 text-rose group-hover/link:text-primary-foreground transition-colors" />
                  </motion.a>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  </motion.div>
);

export default TeamCard;
