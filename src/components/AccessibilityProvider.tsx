import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export interface A11ySettings {
  dyslexiaFont: boolean;
  reducedMotion: boolean;
  largeText: boolean;
  highContrast: boolean;
}

interface A11yContextType {
  settings: A11ySettings;
  updateSetting: <K extends keyof A11ySettings>(key: K, value: A11ySettings[K]) => void;
}

const defaults: A11ySettings = {
  dyslexiaFont: false,
  reducedMotion: false,
  largeText: false,
  highContrast: false,
};

const A11yContext = createContext<A11yContextType>({
  settings: defaults,
  updateSetting: () => {},
});

export const useA11y = () => useContext(A11yContext);

export const AccessibilityProvider = ({ children }: { children: ReactNode }) => {
  const [settings, setSettings] = useState<A11ySettings>(() => {
    try {
      const stored = localStorage.getItem("mimaura-a11y");
      return stored ? { ...defaults, ...JSON.parse(stored) } : defaults;
    } catch {
      return defaults;
    }
  });

  useEffect(() => {
    const root = document.documentElement;

    root.classList.toggle("dyslexia-font", settings.dyslexiaFont);
    root.classList.toggle("reduced-motion", settings.reducedMotion);
    root.classList.toggle("large-text", settings.largeText);
    root.classList.toggle("high-contrast", settings.highContrast);

    localStorage.setItem("mimaura-a11y", JSON.stringify(settings));
  }, [settings]);

  const updateSetting = <K extends keyof A11ySettings>(key: K, value: A11ySettings[K]) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <A11yContext.Provider value={{ settings, updateSetting }}>
      {children}
    </A11yContext.Provider>
  );
};
