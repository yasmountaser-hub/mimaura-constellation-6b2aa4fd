import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const sections = [
  { id: "hero", label: "Home", emoji: "🏠" },
  { id: "features", label: "Features", emoji: "✨" },
  { id: "journey", label: "Journey", emoji: "🗺️" },
  { id: "difference", label: "Difference", emoji: "💡" },
  { id: "how-it-works", label: "How It Works", emoji: "⚙️" },
  { id: "testimonials", label: "Stories", emoji: "💬" },
  { id: "meet-mimi", label: "Mimi", emoji: "🐱" },
  { id: "quiz", label: "Quiz", emoji: "🎯" },
  { id: "team", label: "Team", emoji: "👥" },
  { id: "education", label: "Learn", emoji: "📚" },
  { id: "privacy", label: "Trust", emoji: "🔒" },
  { id: "waitlist", label: "Join", emoji: "🚀" },
];

const SectionNav = () => {
  const [activeSection, setActiveSection] = useState("hero");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);

      const scrollPos = window.scrollY + window.innerHeight / 3;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <motion.nav
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="fixed right-3 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-end gap-1"
    >
      {sections.map((section) => {
        const isActive = activeSection === section.id;
        return (
          <motion.a
            key={section.id}
            href={`#${section.id}`}
            className="group flex items-center gap-2"
            whileHover={{ x: -4 }}
          >
            {/* Label tooltip on hover */}
            <span className="text-[10px] font-medium text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-card/90 px-2 py-1 rounded-md border border-border/50 shadow-sm">
              {section.emoji} {section.label}
            </span>

            {/* Dot */}
            <motion.div
              className={`rounded-full transition-all ${
                isActive
                  ? "w-3 h-3 bg-primary shadow-glow"
                  : "w-2 h-2 bg-muted-foreground/30 group-hover:bg-primary/50"
              }`}
              layout
            />
          </motion.a>
        );
      })}
    </motion.nav>
  );
};

export default SectionNav;
