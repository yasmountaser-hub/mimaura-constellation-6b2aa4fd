import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type Theme = "day" | "night" | "bloom" | "golden-hour" | "low-stim" | "ocean" | "midnight-berry" | "forest" | "unicorn";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "day",
  setTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

const themeClasses: Record<Theme, string> = {
  "day": "",
  "night": "dark",
  "bloom": "bloom",
  "golden-hour": "golden-hour",
  "low-stim": "low-stim",
  "ocean": "ocean",
  "midnight-berry": "midnight-berry",
  "forest": "forest",
  "unicorn": "unicorn",
};

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const stored = localStorage.getItem("mimaura-theme");
    // Migrate legacy values
    if (stored === "light") return "day";
    if (stored === "dark") return "night";
    const valid: Theme[] = ["day", "night", "bloom", "golden-hour", "low-stim", "ocean", "midnight-berry", "forest", "unicorn"];
    return valid.includes(stored as Theme) ? (stored as Theme) : "day";
  });

  useEffect(() => {
    const root = document.documentElement;
    
    // Remove all theme classes
    root.classList.remove("dark", "bloom", "golden-hour", "low-stim");
    
    const cls = themeClasses[theme];
    if (cls) {
      root.classList.add(cls);
    }
    
    localStorage.setItem("mimaura-theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
