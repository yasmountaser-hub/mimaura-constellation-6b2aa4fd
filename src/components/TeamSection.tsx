import { motion } from "framer-motion";
import { Users, Heart, Sparkles, Code, Palette, Megaphone, FlaskConical, Stethoscope } from "lucide-react";
import yasmineBitmoji from "@/assets/yasmine-bitmoji.jpeg";
import vivianaBitmoji from "@/assets/viviana-bitmoji.jpeg";

const founders = [
  {
    name: "Yasmine",
    role: "Founder & CEO",
    bio: "Passionate about building tech that truly understands what women go through. Creating Mimaura because we deserve better. 💪",
    image: yasmineBitmoji,
    color: "from-primary to-lavender-light",
  },
  {
    name: "Viviana",
    role: "Founder & CEO",
    bio: "Building the app we wished existed — for every woman navigating her cycle, her body, and her life. ✨",
    image: vivianaBitmoji,
    color: "from-rose to-rose-soft",
  },
];

const coreTeam = [
  {
    name: "Alexandra Edlmayer",
    role: "CNSO",
    fullRole: "Chief Nutrition & Science Officer",
    emoji: "🧬",
    color: "from-mint to-sky",
  },
  {
    name: "Soundouss",
    role: "Marketing",
    emoji: "📣",
    color: "from-accent to-gold-soft",
  },
  {
    name: "Almaz",
    role: "UX Designer",
    emoji: "🎨",
    color: "from-rose to-primary",
  },
];

const engineers = [
  { name: "Alishba", emoji: "👩‍💻" },
  { name: "Aya", emoji: "💻" },
  { name: "CJ", emoji: "⚡" },
  { name: "Jordan", emoji: "🚀" },
  { name: "Gudhal", emoji: "🔧" },
  { name: "Nada", emoji: "✨" },
];

const advisoryBoard = [
  { name: "Dr. Lily", emoji: "👩‍⚕️" },
  { name: "Jennifer", emoji: "💼" },
  { name: "Hamna", emoji: "🌟" },
];

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
            We're not just building an app — we're building something we wish existed 
            when we needed it most. Because we get it. 💗
          </p>
        </motion.div>

        {/* Founders Section */}
        <div className="mb-16">
          <motion.h3
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-xl font-display font-semibold mb-8 flex items-center justify-center gap-2"
          >
            <Sparkles className="w-5 h-5 text-accent" />
            Our Founders
            <Sparkles className="w-5 h-5 text-accent" />
          </motion.h3>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {founders.map((founder, index) => (
              <motion.div
                key={founder.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ y: -8 }}
                className="group"
              >
                <div className="glass-card rounded-3xl p-6 h-full hover:shadow-float transition-all duration-300 relative overflow-hidden">
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${founder.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                  />

                  <div className="relative z-10 text-center">
                    {/* Bitmoji Avatar */}
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className={`w-32 h-32 mx-auto rounded-full bg-gradient-to-br ${founder.color} p-1 mb-5 shadow-soft overflow-hidden`}
                    >
                      <img 
                        src={founder.image} 
                        alt={founder.name}
                        className="w-full h-full object-cover rounded-full"
                      />
                    </motion.div>

                    <h3 className="font-display font-bold text-xl mb-1">{founder.name}</h3>
                    <p className="text-sm text-primary font-medium mb-3">{founder.role}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {founder.bio}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Core Team */}
        <div className="mb-12">
          <motion.h3
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-lg font-display font-semibold mb-6"
          >
            Core Team ✨
          </motion.h3>
          
          <div className="grid md:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {coreTeam.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ y: -4 }}
                className="glass-card rounded-2xl p-4 text-center hover:shadow-soft transition-all"
              >
                <div className={`w-14 h-14 mx-auto rounded-xl bg-gradient-to-br ${member.color} flex items-center justify-center text-2xl mb-3`}>
                  {member.emoji}
                </div>
                <h4 className="font-semibold text-sm">{member.name}</h4>
                <p className="text-xs text-primary">{member.role}</p>
                {member.fullRole && (
                  <p className="text-xs text-muted-foreground mt-1">{member.fullRole}</p>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Engineering Team */}
        <div className="mb-12">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-6"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky/10 border border-sky/20">
              <Code className="w-4 h-4 text-sky" />
              <span className="text-sm font-medium">Software Engineers 👩‍💻</span>
            </div>
          </motion.div>
          
          <div className="flex flex-wrap justify-center gap-3 max-w-2xl mx-auto">
            {engineers.map((engineer, index) => (
              <motion.div
                key={engineer.name}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.05 * index, type: "spring" }}
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="glass-card rounded-full px-4 py-2 flex items-center gap-2 hover:shadow-soft transition-all cursor-default"
              >
                <span>{engineer.emoji}</span>
                <span className="font-medium text-sm">{engineer.name}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Advisory Board */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-6"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20">
              <Stethoscope className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium">Advisory Board 🌟</span>
            </div>
          </motion.div>
          
          <div className="flex flex-wrap justify-center gap-3 max-w-xl mx-auto">
            {advisoryBoard.map((advisor, index) => (
              <motion.div
                key={advisor.name}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.05 * index, type: "spring" }}
                whileHover={{ scale: 1.1 }}
                className="glass-card rounded-full px-4 py-2 flex items-center gap-2 hover:shadow-soft transition-all cursor-default"
              >
                <span>{advisor.emoji}</span>
                <span className="font-medium text-sm">{advisor.name}</span>
              </motion.div>
            ))}
          </div>
        </div>

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
              "We're a team of women who've struggled with health trackers, 
              been dismissed by doctors, and wished for something gentler. 
              Mimaura is the app we're building for ourselves — and for you." 💜
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
