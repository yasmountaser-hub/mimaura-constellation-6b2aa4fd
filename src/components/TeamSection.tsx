import { motion, useScroll, useTransform } from "framer-motion";
import { Users, Heart, Sparkles } from "lucide-react";
import { useRef } from "react";
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
    initial={{ opacity: 0, scale: 0.8 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ type: "spring", stiffness: 200, damping: 15 }}
    className="text-center mb-8"
  >
    <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-card/80 border border-primary/15 shadow-soft backdrop-blur-sm">
      <motion.span
        animate={{ rotate: [0, 10, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
        className="text-lg"
      >
        {emoji}
      </motion.span>
      <span className="text-sm font-display font-semibold tracking-wide">
        {children}
      </span>
    </div>
  </motion.div>
);

const getGridClass = (count: number) => {
  if (count === 1) return "grid grid-cols-1 gap-5 max-w-xs mx-auto";
  if (count === 2) return "grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-2xl mx-auto";
  if (count === 3) return "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 max-w-4xl mx-auto";
  if (count <= 4) return "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 max-w-5xl mx-auto";
  return "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 max-w-5xl mx-auto";
};

const TeamSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const bgScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

  return (
    <section ref={sectionRef} className="relative py-28 px-6 overflow-hidden">
      {/* Decorative background blobs */}
      <motion.div
        style={{ y: bgY, scale: bgScale }}
        className="absolute top-20 -left-40 w-96 h-96 bg-primary/8 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        style={{ y: bgY, scale: bgScale }}
        className="absolute bottom-20 -right-40 w-96 h-96 bg-rose/8 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        style={{ y: bgY }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl pointer-events-none"
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, type: "spring", stiffness: 80 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0, rotate: -20 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
            className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-rose/10 border border-rose/20 mb-8 shadow-soft"
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-4 h-4 text-rose" />
            </motion.div>
            <span className="text-sm font-display font-semibold">
              Meet the Team 💜
            </span>
          </motion.div>

          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-5 leading-tight">
            Built{" "}
            <motion.span
              className="text-gradient inline-block"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              By Women
            </motion.span>
            ,{" "}
            <motion.span
              className="text-gradient inline-block"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              For Women
            </motion.span>
          </h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            We're not just building an app — we're building something we wish
            existed when we needed it most. Because we get it. 💗
          </motion.p>
        </motion.div>

        {/* Team Groups */}
        {teamGroups.map((group, groupIndex) => (
          <motion.div
            key={group.label}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: 0.1 * groupIndex }}
            className="mb-16"
          >
            <SectionHeader emoji={group.emoji}>{group.label}</SectionHeader>
            <div className={getGridClass(group.members.length)}>
              {group.members.map((member, index) => (
                <TeamCard key={member.name} member={member} index={index} />
              ))}
            </div>
          </motion.div>
        ))}

        {/* Team values quote */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, type: "spring", stiffness: 80 }}
          className="text-center mt-8"
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="relative rounded-[2rem] p-[1px] max-w-3xl mx-auto overflow-hidden"
          >
            {/* Animated border gradient */}
            <motion.div
              animate={{
                background: [
                  "linear-gradient(0deg, hsl(270 60% 65%), hsl(350 60% 75%))",
                  "linear-gradient(90deg, hsl(350 60% 75%), hsl(35 85% 65%))",
                  "linear-gradient(180deg, hsl(35 85% 65%), hsl(270 60% 65%))",
                  "linear-gradient(270deg, hsl(270 60% 65%), hsl(350 60% 75%))",
                  "linear-gradient(360deg, hsl(350 60% 75%), hsl(270 60% 65%))",
                ],
              }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 opacity-30"
            />

            <div className="relative glass-card rounded-[2rem] p-10">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <Heart className="w-8 h-8 text-rose mx-auto mb-5" />
              </motion.div>
              <p className="text-lg text-muted-foreground italic leading-relaxed">
                "We're a team who've struggled with health trackers, been
                dismissed by doctors, and wished for something gentler. Mimaura
                is the app we're building for ourselves — and for you." 💜
              </p>
              <p className="mt-5 text-sm font-display font-semibold text-primary tracking-wide">
                — The Mimaura Team ✨
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default TeamSection;
