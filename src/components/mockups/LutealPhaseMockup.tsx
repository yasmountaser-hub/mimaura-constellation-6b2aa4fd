import { motion } from "framer-motion";
import { ChevronLeft, ChevronDown, Sparkles, Check } from "lucide-react";

/**
 * Hand-crafted Luteal Phase preview mockup.
 * Replaces the broken AI-generated screenshot with a bespoke,
 * on-brand visual that respects Mimaura's design system.
 */
const days = ["S", "M", "T", "W", "T", "F", "S"];
// Sun-start calendar for November 2025 (Nov 1 is Saturday)
const calendar: { d: number | null; muted?: boolean; phase?: "luteal" | "peak" | "ovulation" }[] = [
  { d: 26, muted: true }, { d: 27, muted: true }, { d: 28, muted: true }, { d: 29, muted: true }, { d: 30, muted: true }, { d: 31, muted: true }, { d: 1 },
  { d: 2 }, { d: 3 }, { d: 4 }, { d: 5 }, { d: 6 }, { d: 7 }, { d: 8 },
  { d: 9 }, { d: 10 }, { d: 11 }, { d: 12, phase: "ovulation" }, { d: 13, phase: "ovulation" }, { d: 14 }, { d: 15, phase: "luteal" },
  { d: 16, phase: "luteal" }, { d: 17, phase: "luteal" }, { d: 18, phase: "luteal" }, { d: 19, phase: "luteal" }, { d: 20, phase: "peak" }, { d: 21, phase: "peak" }, { d: 22, phase: "luteal" },
  { d: 23, phase: "luteal" }, { d: 24, phase: "luteal" }, { d: 25, phase: "luteal" }, { d: 26 }, { d: 27 }, { d: 28 }, { d: 29 },
];

const tips = [
  "Lower cognitive energy",
  "Increased overwhelm",
  "Low-stim routines recommended",
];

const LutealPhaseMockup = () => {
  return (
    <div className="relative mx-auto w-full max-w-[340px] select-none">
      {/* Phone frame */}
      <div className="relative rounded-[2.5rem] bg-gradient-to-b from-foreground/90 to-foreground p-2 shadow-float">
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-b from-cream/60 via-background to-lavender/30 p-4 space-y-4">
          {/* Notch */}
          <div className="absolute left-1/2 top-1.5 z-10 h-4 w-20 -translate-x-1/2 rounded-b-2xl bg-foreground/90" />

          {/* Top bar */}
          <div className="flex items-center justify-between pt-4">
            <button className="grid h-8 w-8 place-items-center rounded-full bg-background/70 shadow-soft">
              <ChevronLeft className="h-4 w-4 text-foreground" />
            </button>
            <h3 className="font-display text-sm font-bold text-foreground">Luteal Phase</h3>
            <button className="flex items-center gap-1 rounded-full bg-background/70 px-2.5 py-1 text-[10px] font-semibold text-foreground shadow-soft">
              Cycle Mode <ChevronDown className="h-3 w-3" />
            </button>
          </div>

          {/* Hero affirmation card */}
          <div className="relative overflow-hidden rounded-2xl border border-primary/15 bg-gradient-to-br from-cream/80 to-rose/30 p-3.5 shadow-soft">
            <div className="flex gap-2.5">
              <div className="flex-1 space-y-1.5">
                <p className="font-display text-[15px] font-bold leading-tight text-primary">
                  You luteally got this <Sparkles className="inline h-3 w-3" />
                </p>
                <p className="text-[10px] leading-snug text-foreground/75">
                  A little extra softness today — slower mornings, warm foods, and water support your cortisol rhythm.
                </p>
              </div>
              {/* Mimi blob */}
              <motion.div
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="relative h-12 w-12 shrink-0"
              >
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/80 to-accent/80" />
                <div className="absolute left-[28%] top-[35%] h-1.5 w-1.5 rounded-full bg-foreground" />
                <div className="absolute right-[28%] top-[35%] h-1.5 w-1.5 rounded-full bg-foreground" />
                <div className="absolute left-1/2 top-[58%] h-1 w-3 -translate-x-1/2 rounded-b-full border-b-2 border-foreground" />
              </motion.div>
            </div>
            <button className="mt-3 w-full rounded-full bg-gradient-to-r from-primary to-accent py-2 text-[11px] font-semibold text-primary-foreground shadow-soft">
              Quick Log
            </button>
          </div>

          {/* Calendar card */}
          <div className="rounded-2xl border border-border/40 bg-background/60 p-3 shadow-soft backdrop-blur-sm">
            <div className="mb-2 flex items-end justify-between">
              <div>
                <p className="text-[9px] font-semibold uppercase tracking-wider text-muted-foreground">Calendar</p>
                <p className="font-display text-sm font-bold text-foreground">November 2025</p>
              </div>
              <button className="rounded-full bg-primary/10 px-2 py-0.5 text-[9px] font-semibold text-primary">
                Today
              </button>
            </div>

            <div className="grid grid-cols-7 gap-1 text-center">
              {days.map((d, i) => (
                <div key={i} className="text-[9px] font-semibold text-muted-foreground/70">{d}</div>
              ))}
              {calendar.map((c, i) => {
                const isLuteal = c.phase === "luteal";
                const isPeak = c.phase === "peak";
                const isOv = c.phase === "ovulation";
                return (
                  <div key={i} className="relative aspect-square">
                    <div
                      className={[
                        "grid h-full w-full place-items-center rounded-md text-[10px] font-medium",
                        c.muted ? "text-muted-foreground/40" : "text-foreground/85",
                        isLuteal && "bg-gradient-to-br from-primary/25 to-accent/25 text-foreground",
                        isPeak && "bg-gradient-to-br from-rose to-primary text-primary-foreground font-bold",
                        isOv && "bg-mint/30 text-foreground",
                      ].filter(Boolean).join(" ")}
                    >
                      {c.d}
                    </div>
                    {isPeak && (
                      <span className="absolute -top-0.5 -right-0.5 text-[8px]">🔥</span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Legend */}
            <div className="mt-3 flex flex-wrap gap-1">
              {[
                { l: "Stress", c: "bg-sky/40" },
                { l: "Endo flare", c: "bg-rose/50" },
                { l: "Gut", c: "bg-mint/40" },
              ].map((t) => (
                <span key={t.l} className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[9px] font-medium text-foreground/80 ${t.c}`}>
                  <span className="h-1.5 w-1.5 rounded-full bg-foreground/60" /> {t.l}
                </span>
              ))}
            </div>
          </div>

          {/* Tips */}
          <div className="rounded-2xl border border-border/40 bg-background/60 p-3 shadow-soft">
            <p className="mb-2 font-display text-[11px] font-bold text-foreground">Phase tips for you</p>
            <ul className="space-y-1.5">
              {tips.map((t) => (
                <li key={t} className="flex items-center gap-2 text-[10px] text-foreground/80">
                  <span className="grid h-3.5 w-3.5 place-items-center rounded-full bg-primary/15">
                    <Check className="h-2.5 w-2.5 text-primary" strokeWidth={3} />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
            <p className="mt-2 text-[9px] italic text-muted-foreground">5 sensory days logged this month</p>
          </div>
        </div>
      </div>

      {/* Soft halo */}
      <div className="pointer-events-none absolute -inset-6 -z-10 rounded-[3rem] bg-gradient-to-br from-primary/20 via-accent/15 to-rose/20 blur-3xl" />
    </div>
  );
};

export default LutealPhaseMockup;
