import { Link, useLocation } from "react-router-dom";
import { useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Home, Sparkles, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  // Blooming interconnection: petals around a center, with connecting lines
  const petals = useMemo(
    () =>
      Array.from({ length: 8 }).map((_, i) => ({
        angle: (i * 360) / 8,
        delay: i * 0.08,
        emoji: ["🌸", "💜", "✨", "🌷", "🦋", "🌟", "💫", "🌼"][i],
      })),
    []
  );

  return (
    <div className="relative min-h-screen overflow-hidden flex items-center justify-center px-4 py-20">
      {/* Soft background glows */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-[40rem] h-[40rem] rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-[36rem] h-[36rem] rounded-full bg-accent/10 blur-3xl" />
      </div>

      <div className="relative max-w-2xl w-full text-center">
        {/* Blooming constellation */}
        <div className="relative mx-auto mb-10 w-72 h-72 sm:w-96 sm:h-96">
          {/* Connecting lines (SVG) */}
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 400 400"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.6" />
                <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0.6" />
              </linearGradient>
            </defs>
            {petals.map((p, i) => {
              const rad = (p.angle * Math.PI) / 180;
              const x = 200 + Math.cos(rad) * 140;
              const y = 200 + Math.sin(rad) * 140;
              return (
                <motion.line
                  key={i}
                  x1="200"
                  y1="200"
                  x2={x}
                  y2={y}
                  stroke="url(#lineGrad)"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeDasharray="4 6"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1, delay: 0.3 + p.delay, ease: "easeOut" }}
                />
              );
            })}
          </svg>

          {/* Center bloom */}
          <motion.div
            initial={{ scale: 0, rotate: -30 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 180, damping: 14 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-primary/30 via-accent/30 to-primary/30 ring-1 ring-primary/30 backdrop-blur-md flex items-center justify-center shadow-xl"
            >
              <motion.div
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="font-display text-4xl sm:text-5xl font-bold bg-gradient-to-br from-primary to-accent bg-clip-text text-transparent"
                style={{ WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
              >
                404
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Petals */}
          {petals.map((p, i) => {
            const rad = (p.angle * Math.PI) / 180;
            const r = 140;
            const x = Math.cos(rad) * r;
            const y = Math.sin(rad) * r;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                animate={{ opacity: 1, scale: 1, x, y }}
                transition={{
                  duration: 0.9,
                  delay: 0.5 + p.delay,
                  type: "spring",
                  stiffness: 120,
                  damping: 14,
                }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              >
                <motion.div
                  animate={{ y: [0, -6, 0], rotate: [0, 6, -6, 0] }}
                  transition={{
                    duration: 4 + i * 0.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.15,
                  }}
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-card/70 backdrop-blur ring-1 ring-primary/20 shadow-md flex items-center justify-center text-2xl"
                >
                  {p.emoji}
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Copy */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            This page is still blooming
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold mb-3">
            Looks like you wandered off the path
          </h1>
          <p className="text-muted-foreground max-w-md mx-auto mb-8">
            The page you're looking for isn't here yet — but every wrong turn is part of the pattern.
            Let's get you back to somewhere gentle.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link to="/">
              <Button variant="hero" size="lg" className="gap-2">
                <Home className="w-4 h-4" />
                Back to home
              </Button>
            </Link>
            <Button
              variant="glass"
              size="lg"
              className="gap-2"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="w-4 h-4" />
              Go back
            </Button>
          </div>

          <p className="mt-8 text-xs text-muted-foreground/70 font-mono">
            {location.pathname}
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
