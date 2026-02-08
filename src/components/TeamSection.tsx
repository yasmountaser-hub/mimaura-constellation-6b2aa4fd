import { motion } from "framer-motion";
import { Users, Heart } from "lucide-react";
import { teamGroups } from "./team/teamData";
import TeamCard from "./team/TeamCard";

const SectionHeader = ({
  children,
  emoji,
}: {
  children: React.ReactNode;
  emoji: string;
}) => (
  <motion.div
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    className="text-center mb-6"
  >
    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/80 border border-primary/10">
      <span>{emoji}</span>
      <span className="text-sm font-medium">{children}</span>
    </div>
  </motion.div>
);

const getGridClass = (count: number) => {
  if (count === 1) return "grid grid-cols-1 gap-4 max-w-xs mx-auto";
  if (count === 2) return "grid grid-cols-2 gap-4 max-w-xl mx-auto";
  if (count === 3) return "grid grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl mx-auto";
  if (count <= 4) return "grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto";
  return "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4";
};

const TeamSection = () => {
  return (
    <section className="relative py-24 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose/10 border border-rose/20 mb-6"
          >
            <Users className="w-4 h-4 text-rose" />
            <span className="text-sm font-medium">Meet the Team 💜</span>
          </motion.div>

          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Built <span className="text-gradient">By Women</span>,{" "}
            <span className="text-gradient">For Women</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We're not just building an app — we're building something we wish
            existed when we needed it most. Because we get it. 💗
          </p>
        </motion.div>

        {/* Team Groups */}
        {teamGroups.map((group) => (
          <div key={group.label} className="mb-12">
            <SectionHeader emoji={group.emoji}>{group.label}</SectionHeader>
            <div className={getGridClass(group.members.length)}>
              {group.members.map((member, index) => (
                <TeamCard key={member.name} member={member} index={index} />
              ))}
            </div>
          </div>
        ))}

        {/* Team values */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center"
        >
          <div className="glass-card rounded-3xl p-8 max-w-3xl mx-auto">
            <Heart className="w-8 h-8 text-rose mx-auto mb-4" />
            <p className="text-lg text-muted-foreground italic">
              "We're a team of women who've struggled with health trackers, been
              dismissed by doctors, and wished for something gentler. Mimaura is
              the app we're building for ourselves — and for you." 💜
            </p>
            <p className="mt-4 text-sm font-medium text-primary">
              — The Mimaura Team ✨
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TeamSection;
