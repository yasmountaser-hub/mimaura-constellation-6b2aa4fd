import { motion } from "framer-motion";
import { Users, Heart, Linkedin, Instagram, Sparkles } from "lucide-react";
import yasmineBitmoji from "@/assets/yasmine-bitmoji.jpeg";
import vivianaBitmoji from "@/assets/viviana-bitmoji.jpeg";

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image?: string;
  emoji?: string;
  color: string;
  socials?: {
    linkedin?: string;
    instagram?: string;
  };
}

const founders: TeamMember[] = [
  {
    name: "Yasmine",
    role: "Founder & CEO",
    bio: "Passionate about building tech that truly understands what women go through. Creating Mimaura because we deserve better. 💪",
    image: yasmineBitmoji,
    color: "from-primary to-lavender-light",
    socials: { linkedin: "#", instagram: "#" },
  },
  {
    name: "Viviana",
    role: "Founder & CEO",
    bio: "Building the app we wished existed — for every woman navigating her cycle, her body, and her life. ✨",
    image: vivianaBitmoji,
    color: "from-rose to-rose-soft",
    socials: { linkedin: "#", instagram: "#" },
  },
];

const leadership: TeamMember[] = [
  {
    name: "Alexandra Edlmayer",
    role: "Chief Nutrition & Science Officer",
    bio: "Dedicated to bringing evidence-based nutrition science to women's health. Your cycle deserves real science. 🧬",
    emoji: "🧬",
    color: "from-mint to-sky",
    socials: { linkedin: "#" },
  },
  {
    name: "Soundouss",
    role: "Marketing",
    bio: "Spreading the word about cycle care that actually cares. Every woman deserves to know Mimaura exists. 📣",
    emoji: "📣",
    color: "from-accent to-gold-soft",
    socials: { linkedin: "#", instagram: "#" },
  },
  {
    name: "Almaz",
    role: "UX Designer",
    bio: "Designing experiences that feel like a warm hug. Because health apps should never feel clinical. 🎨",
    emoji: "🎨",
    color: "from-rose to-primary",
    socials: { linkedin: "#" },
  },
];

const engineers: TeamMember[] = [
  {
    name: "Alishba",
    role: "Software Engineer",
    bio: "Coding with care because every feature we build touches someone's real life. 👩‍💻",
    emoji: "👩‍💻",
    color: "from-sky to-mint",
    socials: { linkedin: "#" },
  },
  {
    name: "Aya",
    role: "Software Engineer",
    bio: "Building the tech backbone so Mimaura can be there for you 24/7. 💻",
    emoji: "💻",
    color: "from-primary to-sky",
    socials: { linkedin: "#" },
  },
  {
    name: "CJ",
    role: "Software Engineer",
    bio: "Passionate about creating accessible tech for all women, everywhere. ⚡",
    emoji: "⚡",
    color: "from-accent to-rose",
    socials: { linkedin: "#" },
  },
  {
    name: "Jordan",
    role: "Software Engineer",
    bio: "Making sure every interaction feels smooth and delightful. 🚀",
    emoji: "🚀",
    color: "from-mint to-primary",
    socials: { linkedin: "#" },
  },
  {
    name: "Gudhal",
    role: "Software Engineer",
    bio: "Debugging so you never have to deal with glitches during your cycle. 🔧",
    emoji: "🔧",
    color: "from-lavender-light to-sky",
    socials: { linkedin: "#" },
  },
  {
    name: "Nada",
    role: "Software Engineer",
    bio: "Adding the magic touches that make Mimaura feel special. ✨",
    emoji: "✨",
    color: "from-rose-soft to-accent",
    socials: { linkedin: "#" },
  },
];

const advisors: TeamMember[] = [
  {
    name: "Dr. Lily",
    role: "Medical Advisor",
    bio: "Ensuring Mimaura's guidance is medically sound and truly helpful. 👩‍⚕️",
    emoji: "👩‍⚕️",
    color: "from-mint to-sky",
    socials: { linkedin: "#" },
  },
  {
    name: "Jennifer",
    role: "Business Advisor",
    bio: "Helping Mimaura grow sustainably so we can help more women. 💼",
    emoji: "💼",
    color: "from-accent to-gold-soft",
    socials: { linkedin: "#" },
  },
  {
    name: "Hamna",
    role: "Advisor",
    bio: "Bringing fresh perspectives to make Mimaura better every day. 🌟",
    emoji: "🌟",
    color: "from-rose to-primary",
    socials: { linkedin: "#" },
  },
];

const TeamCard = ({ member, index }: { member: TeamMember; index: number }) => (
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
          <h4 className="font-display font-bold text-base mb-1">{member.name}</h4>
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

const SectionHeader = ({ children, emoji }: { children: React.ReactNode; emoji: string }) => (
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

        {/* Founders */}
        <div className="mb-12">
          <SectionHeader emoji="👑">Founders</SectionHeader>
          <div className="grid grid-cols-2 md:grid-cols-2 gap-4 max-w-xl mx-auto">
            {founders.map((member, index) => (
              <TeamCard key={member.name} member={member} index={index} />
            ))}
          </div>
        </div>

        {/* Leadership & Core Team */}
        <div className="mb-12">
          <SectionHeader emoji="💫">Core Team</SectionHeader>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {leadership.map((member, index) => (
              <TeamCard key={member.name} member={member} index={index} />
            ))}
          </div>
        </div>

        {/* Engineering Team */}
        <div className="mb-12">
          <SectionHeader emoji="👩‍💻">Engineering</SectionHeader>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {engineers.map((member, index) => (
              <TeamCard key={member.name} member={member} index={index} />
            ))}
          </div>
        </div>

        {/* Advisory Board */}
        <div className="mb-16">
          <SectionHeader emoji="🌟">Advisory Board</SectionHeader>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
            {advisors.map((member, index) => (
              <TeamCard key={member.name} member={member} index={index} />
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
