import { motion } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";
import { teamGroups } from "./team/teamData";
import TeamCard from "./team/TeamCard";

const TeamSection = () => {
  return (
    <section className="relative py-28 px-6 overflow-hidden">
      {/* Soft background accents */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
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

          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Built{" "}
            <span className="text-gradient">By Women</span>
            ,{" "}
            <span className="text-gradient">For Women</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            We're building something we wished existed — because we get it. 💗
          </p>
        </motion.div>

        {/* All groups */}
        {teamGroups.map((group, groupIndex) => (
          <motion.div
            key={group.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: 0.05 * groupIndex }}
            className="mb-16"
          >
            {/* Group label */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="text-center mb-8"
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-card/80 border border-border shadow-sm text-sm font-display font-semibold">
                <span>{group.emoji}</span>
                {group.label}
              </span>
            </motion.div>

            {/* Members grid - fluid wrap */}
            <div className="flex flex-wrap justify-center gap-8 md:gap-10">
              {group.members.map((member, index) => (
                <div key={member.name} className="w-36 sm:w-40">
                  <TeamCard member={member} index={index} />
                </div>
              ))}
            </div>
          </motion.div>
        ))}

        {/* Quote */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mt-8"
        >
          <div className="glass-card rounded-3xl p-10 max-w-2xl mx-auto border border-primary/10">
            <motion.div
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <Heart className="w-7 h-7 text-rose mx-auto mb-4" />
            </motion.div>
            <p className="text-muted-foreground italic leading-relaxed">
              "We're a team who've struggled with health trackers, been
              dismissed by doctors, and wished for something gentler. Mimaura
              is the app we're building for ourselves — and for you." 💜
            </p>
            <p className="mt-4 text-sm font-display font-semibold text-primary">
              — The Mimaura Team ✨
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TeamSection;
