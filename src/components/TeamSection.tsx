import { motion } from "framer-motion";
import { Users, Linkedin, Twitter, Heart } from "lucide-react";

const team = [
  {
    name: "Dr. Sarah Chen",
    role: "Founder & CEO",
    bio: "Neuroscientist turned wellness advocate. Lives with ADHD and designs for brains like hers.",
    avatar: "🧠",
    color: "from-primary to-lavender-light",
    socials: { linkedin: "#", twitter: "#" },
  },
  {
    name: "Maya Okonkwo",
    role: "Head of Design",
    bio: "Chronic illness warrior. Believes beautiful design can be gentle too.",
    avatar: "🎨",
    color: "from-rose to-rose-soft",
    socials: { linkedin: "#", twitter: "#" },
  },
  {
    name: "Alex Rivera",
    role: "Lead Engineer",
    bio: "Accessibility champion. Building tech that works for everyone, not just the \"default user.\"",
    avatar: "⚡",
    color: "from-sky to-mint",
    socials: { linkedin: "#", twitter: "#" },
  },
  {
    name: "Dr. Priya Sharma",
    role: "Medical Advisor",
    bio: "OB-GYN specializing in PCOS. Passionate about culturally-sensitive care.",
    avatar: "💜",
    color: "from-accent to-gold-soft",
    socials: { linkedin: "#", twitter: "#" },
  },
];

const TeamSection = () => {
  return (
    <section className="relative py-24 px-6 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          className="absolute top-1/4 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl"
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 left-0 w-80 h-80 bg-primary/10 rounded-full blur-3xl"
          animate={{ x: [0, -20, 0], y: [0, 20, 0] }}
          transition={{ duration: 12, repeat: Infinity }}
        />
      </div>

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
            <span className="text-sm font-medium">Our Team</span>
          </motion.div>

          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Built <span className="text-gradient">With</span> You,{" "}
            <span className="text-gradient">For</span> You
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We're not just building an app — we're building something we wish existed 
            when we needed it most. Because we get it.
          </p>
        </motion.div>

        {/* Team Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * index }}
              whileHover={{ y: -8 }}
              className="group"
            >
              <div className="glass-card rounded-3xl p-6 h-full hover:shadow-float transition-all duration-300 relative overflow-hidden">
                {/* Gradient background on hover */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${member.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                />

                <div className="relative z-10">
                  {/* Avatar */}
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${member.color} flex items-center justify-center text-4xl mb-5 shadow-soft`}
                  >
                    {member.avatar}
                  </motion.div>

                  {/* Info */}
                  <h3 className="font-display font-bold text-lg mb-1">{member.name}</h3>
                  <p className="text-sm text-primary font-medium mb-3">{member.role}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    {member.bio}
                  </p>

                  {/* Social links */}
                  <div className="flex gap-2">
                    <motion.a
                      href={member.socials.linkedin}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-2 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors"
                    >
                      <Linkedin className="w-4 h-4 text-primary" />
                    </motion.a>
                    <motion.a
                      href={member.socials.twitter}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-2 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors"
                    >
                      <Twitter className="w-4 h-4 text-primary" />
                    </motion.a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Team values */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center"
        >
          <div className="glass-card rounded-3xl p-8 max-w-3xl mx-auto">
            <Heart className="w-8 h-8 text-rose mx-auto mb-4" />
            <p className="text-lg text-muted-foreground italic">
              "We're a team of people who've struggled with health trackers, 
              been dismissed by doctors, and wished for something gentler. 
              Mimaura is the app we're building for ourselves — and for you."
            </p>
            <p className="mt-4 text-sm font-medium text-primary">
              — The Mimaura Team 💜
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TeamSection;
