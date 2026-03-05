import { motion } from "framer-motion";
import { Sun, Moon, Eye } from "lucide-react";
import { useTheme } from "./ThemeProvider";

const themes = [
  { id: "light" as const, icon: Sun, label: "Light", emoji: "☀️" },
  { id: "dark" as const, icon: Moon, label: "Dark", emoji: "🌙" },
  { id: "low-stim" as const, icon: Eye, label: "Low-stim", emoji: "🧘" },
];

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center gap-1 p-1 rounded-full bg-muted/50 border border-border/50">
      {themes.map((t) => (
        <motion.button
          key={t.id}
          onClick={() => setTheme(t.id)}
          className={`relative p-1.5 rounded-full transition-colors ${
            theme === t.id
              ? "text-primary-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
          whileTap={{ scale: 0.9 }}
          title={t.label}
        >
          {theme === t.id && (
            <motion.div
              layoutId="theme-indicator"
              className="absolute inset-0 bg-primary rounded-full"
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            />
          )}
          <t.icon className="w-3.5 h-3.5 relative z-10" />
        </motion.button>
      ))}
    </div>
  );
};

export default ThemeSwitcher;
