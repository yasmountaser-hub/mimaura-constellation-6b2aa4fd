import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Accessibility, X, Type, Eye, Zap, BookOpen } from "lucide-react";
import { useA11y } from "./AccessibilityProvider";

const toggles = [
  {
    key: "dyslexiaFont" as const,
    label: "Dyslexia-friendly font",
    description: "Wider letter spacing, OpenDyslexic-style",
    icon: Type,
    emoji: "🔤",
  },
  {
    key: "reducedMotion" as const,
    label: "Reduce motion",
    description: "Disable animations & transitions",
    icon: Zap,
    emoji: "🧘",
  },
  {
    key: "largeText" as const,
    label: "Larger text",
    description: "Increase base font size & spacing",
    icon: BookOpen,
    emoji: "📖",
  },
  {
    key: "highContrast" as const,
    label: "High contrast",
    description: "Stronger text & border contrast",
    icon: Eye,
    emoji: "👁️",
  },
];

const AccessibilityPanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { settings, updateSetting } = useA11y();

  return (
    <>
      {/* Floating trigger button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 left-6 z-50 w-12 h-12 rounded-full bg-card border border-border shadow-float flex items-center justify-center hover:bg-primary/10 transition-colors"
        aria-label="Accessibility settings"
      >
        <Accessibility className="w-5 h-5 text-primary" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />

            {/* Panel */}
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed bottom-20 left-6 z-50 w-[calc(100vw-3rem)] max-w-sm rounded-2xl bg-card border border-border shadow-float p-5 backdrop-blur-xl"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-lg">♿</span>
                  <h3 className="font-display text-base font-bold text-foreground">
                    Accessibility
                  </h3>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-muted transition-colors"
                >
                  <X className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>

              <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
                Customize your experience. These settings are saved automatically.
              </p>

              <div className="space-y-2">
                {toggles.map((toggle) => {
                  const isActive = settings[toggle.key];
                  return (
                    <button
                      key={toggle.key}
                      onClick={() => updateSetting(toggle.key, !isActive)}
                      className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-left transition-all ${
                        isActive
                          ? "bg-primary/15 border border-primary/30"
                          : "bg-muted/30 border border-transparent hover:bg-muted/50"
                      }`}
                    >
                      <span className="text-lg">{toggle.emoji}</span>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-foreground">
                          {toggle.label}
                        </div>
                        <div className="text-[10px] text-muted-foreground leading-tight">
                          {toggle.description}
                        </div>
                      </div>
                      <div
                        className={`w-10 h-6 rounded-full transition-colors flex items-center px-0.5 ${
                          isActive ? "bg-primary" : "bg-muted"
                        }`}
                      >
                        <motion.div
                          animate={{ x: isActive ? 16 : 0 }}
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                          className="w-5 h-5 rounded-full bg-white shadow-sm"
                        />
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="mt-4 pt-3 border-t border-border">
                <p className="text-[10px] text-muted-foreground text-center leading-relaxed">
                  Built with 💜 for neurodivergent minds
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default AccessibilityPanel;
