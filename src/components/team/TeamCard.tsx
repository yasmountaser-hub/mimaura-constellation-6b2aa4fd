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
    viewport={{ once: true }}
    transition={{ delay: 0.05 * index }}
    whileHover={{ y: -6 }}
    className="group"
  >
    <div className="glass-card rounded-2xl p-5 h-full hover:shadow-float transition-all duration-300 relative overflow-hidden">
      <motion.div
        className={`absolute inset-0 bg-gradient-to-br ${member.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
      />

      <div className="relative z-10">
        {/* Avatar */}
        <motion.div
          whileHover={{ scale: 1.05, rotate: 3 }}
          className={`w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br ${member.color} flex items-center justify-center mb-4 shadow-soft overflow-hidden`}
        >
          {member.image ? (
            <img
              src={member.image}
              alt={member.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-3xl">{member.emoji}</span>
          )}
        </motion.div>

        {/* Info */}
        <div className="text-center">
          <h4 className="font-display font-bold text-base mb-1">
            {member.name}
          </h4>
          <p className="text-xs text-primary font-medium mb-2">{member.role}</p>
          <p className="text-xs text-muted-foreground leading-relaxed mb-3">
            {member.bio}
          </p>

          {/* Social links */}
          {member.socials && (
            <div className="flex justify-center gap-2">
              {member.socials.linkedin && (
                <motion.a
                  href={member.socials.linkedin}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors"
                >
                  <Linkedin className="w-3.5 h-3.5 text-primary" />
                </motion.a>
              )}
              {member.socials.instagram && (
                <motion.a
                  href={member.socials.instagram}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 rounded-lg bg-rose/10 hover:bg-rose/20 transition-colors"
                >
                  <Instagram className="w-3.5 h-3.5 text-rose" />
                </motion.a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  </motion.div>
);

export default TeamCard;
