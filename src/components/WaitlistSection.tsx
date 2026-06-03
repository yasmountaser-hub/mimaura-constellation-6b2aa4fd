import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, CheckCircle, Sparkles, Mail } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import mimiThumbsup from "@/assets/mimi-thumbsup.png";

const STORAGE_KEY = "mimaura_waitlist_joined";

const WaitlistSection = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);

    const cleanEmail = email.trim().toLowerCase();
    const { error } = await supabase
      .from("waitlist")
      .insert({ email: cleanEmail, name: name.trim() || null, source: "website" });

    setIsSubmitting(false);

    if (error) {
      if (error.code === "23505") {
        localStorage.setItem(STORAGE_KEY, cleanEmail);
        setIsSubmitted(true);
        toast.success("You're already on the list! ✨");
        return;
      }
      toast.error("Something went wrong. Please try again.");
      return;
    }

    localStorage.setItem(STORAGE_KEY, cleanEmail);
    setIsSubmitted(true);
    toast.success("You're on the list! Mimi can't wait to meet you ✨");
  };

  return (
    <section className="relative py-24 px-4 sm:px-6 overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="glass-card rounded-[2rem] p-8 md:p-12 text-center relative overflow-hidden"
        >
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-primary/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />

          {/* Mimi floating */}
          <motion.img
            src={mimiThumbsup}
            alt="Mimi giving thumbs up"
            className="absolute -right-4 top-4 w-24 h-24 md:w-32 md:h-32 object-contain z-10"
            animate={{ y: [0, -8, 0], rotate: [-5, 5, -5] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />

          <div className="relative z-10">
            {/* Badge */}
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
            >
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Coming Soon</span>
            </motion.div>

            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Be the First to <span className="text-gradient">Meet Mimi</span>
            </h2>

            <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-8">
              Join our waitlist for early access, exclusive updates, and a chance to help shape 
              Mimaura's features. Your input matters! 💜
            </p>

            {!isSubmitted ? (
              <motion.form
                onSubmit={handleSubmit}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="max-w-md mx-auto space-y-4"
              >
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Your name (optional)"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="h-14 pl-12 rounded-2xl bg-background/50 border-primary/20 focus:border-primary"
                  />
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl">👋</span>
                </div>

                <div className="relative">
                  <Input
                    type="email"
                    placeholder="your.email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-14 pl-12 rounded-2xl bg-background/50 border-primary/20 focus:border-primary"
                  />
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                </div>

                <Button
                  type="submit"
                  variant="hero"
                  size="xl"
                  className="w-full group"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-current border-t-transparent rounded-full"
                      />
                      Joining...
                    </>
                  ) : (
                    <>
                      Join the Waitlist
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </Button>

                <p className="text-xs text-muted-foreground">
                  No spam, ever. Mimi respects your inbox as much as your patterns. 💜
                </p>
              </motion.form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center gap-4 py-8"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className="w-20 h-20 rounded-full bg-mint/20 flex items-center justify-center"
                >
                  <CheckCircle className="w-10 h-10 text-mint" />
                </motion.div>
                <h3 className="font-display text-2xl font-bold">You're In! 🎉</h3>
                <p className="text-muted-foreground max-w-sm">
                  Check your inbox for a welcome note from Mimi. 
                  We'll keep you posted on launch updates!
                </p>
              </motion.div>
            )}

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="flex justify-center gap-8 mt-8 pt-8 border-t border-primary/10"
            >
              {[
                { value: "5,000+", label: "On waitlist" },
                { value: "Q1 2025", label: "Expected launch" },
                { value: "100%", label: "Free tier forever" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="font-display text-2xl font-bold text-gradient">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WaitlistSection;
