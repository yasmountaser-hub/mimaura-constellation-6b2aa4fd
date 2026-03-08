import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useTheme, type Theme } from "./ThemeProvider";

const themes: { id: Theme; label: string; emoji: string; vibe: string }[] = [
  { id: "day", label: "Day", emoji: "☀️", vibe: "Light & airy" },
  { id: "night", label: "Night", emoji: "🌙", vibe: "Deep & dreamy" },
  { id: "bloom", label: "Bloom", emoji: "🌸", vibe: "Soft & rosy" },
  { id: "golden-hour", label: "Golden Hour", emoji: "🌅", vibe: "Warm & cozy" },
  { id: "ocean", label: "Ocean", emoji: "🌊", vibe: "Cool & calming" },
  { id: "midnight-berry", label: "Midnight Berry", emoji: "🍇", vibe: "Rich & sultry" },
  { id: "forest", label: "Forest", emoji: "🌿", vibe: "Earthy & grounding" },
  { id: "unicorn", label: "Unicorn", emoji: "🦄", vibe: "Magical & dreamy" },
  { id: "low-stim", label: "Low-stim", emoji: "🧘", vibe: "Calm & quiet" },
];

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const current = themes.find((t) => t.id === theme) || themes[0];

  return (
    <div className="relative">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted/60 border border-border/50 hover:border-primary/30 transition-colors text-sm"
      >
        <span className="text-base">{current.emoji}</span>
        <span className="hidden sm:inline font-medium text-xs text-foreground">{current.label}</span>
        <ChevronDown className={`w-3 h-3 text-muted-foreground transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Dropdown */}
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 top-full mt-2 z-50 w-48 rounded-2xl bg-card border border-border shadow-float p-1.5 backdrop-blur-xl"
            >
              {themes.map((t) => (
                <motion.button
                  key={t.id}
                  onClick={() => {
                    setTheme(t.id);
                    setIsOpen(false);
                  }}
                  whileHover={{ x: 2 }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-colors ${
                    theme === t.id
                      ? "bg-primary/10 text-foreground"
                      : "hover:bg-muted/50 text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <span className="text-lg">{t.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium font-display">{t.label}</div>
                    <div className="text-[10px] text-muted-foreground">{t.vibe}</div>
                  </div>
                  {theme === t.id && (
                    <motion.div
                      layoutId="theme-check"
                      className="w-1.5 h-1.5 rounded-full bg-primary"
                    />
                  )}
                </motion.button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ThemeSwitcher;
