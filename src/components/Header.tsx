import { motion, useScroll, useTransform } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Download, LogIn, LogOut } from "lucide-react";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { useAuth } from "@/components/AuthProvider";
import logo from "@/assets/mimaura-logo.png";

const Header = () => {
  const { user, signOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const headerBg = useTransform(scrollYProgress, [0, 0.05], [0, 1]);

  const navItems = [
    { label: "App Preview", href: "/preview" },
    { label: "Resources", href: "/resources" },
    { label: "Glossary", href: "/glossary" },
    { label: "Community", href: "/community" },
    { label: "Roadmap", href: "/roadmap" },
    { label: "FAQ", href: "/faq" },
  ];

  return (
    <>
      {/* Scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] z-[60] origin-left"
        style={{
          scaleX: scrollYProgress,
          background: "linear-gradient(90deg, hsl(var(--primary)), hsl(var(--accent)), hsl(var(--primary)))",
        }}
      />

      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-[3px] left-0 right-0 z-50 px-2 sm:px-4 md:px-6 py-1.5 sm:py-3"
      >
        <nav className="max-w-7xl mx-auto glass-card rounded-2xl px-2.5 sm:px-4 md:px-6 py-2 sm:py-3 flex items-center justify-between gap-1.5 sm:gap-2">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <motion.img
              src={logo}
              alt="Mimaura"
              whileHover={{ scale: 1.05 }}
              className="w-7 h-7 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-xl object-contain"
            />
            <span className="font-display text-base sm:text-lg md:text-xl font-bold">Mimaura</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navItems.map((item) => (
              <motion.a
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative group"
                whileHover={{ y: -2 }}
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
              </motion.a>
            ))}
          </div>

          {/* CTA Buttons + Theme */}
          <div className="hidden lg:flex items-center gap-2 xl:gap-3">
            <ThemeSwitcher />
            {user ? (
              <Button variant="ghost" size="sm" className="gap-2" onClick={signOut}>
                <LogOut className="w-4 h-4" />
                Sign Out
              </Button>
            ) : (
              <Link to="/auth">
                <Button variant="ghost" size="sm" className="gap-2">
                  <LogIn className="w-4 h-4" />
                  Sign In
                </Button>
              </Link>
            )}
            <Link to="/#waitlist">
              <Button variant="hero" size="sm">
                Join Waitlist
              </Button>
            </Link>
          </div>

          {/* Mobile: theme + hamburger */}
          <div className="flex lg:hidden items-center gap-1">
            <ThemeSwitcher />
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(!isOpen)}
              className="p-1.5 sm:p-2 rounded-xl hover:bg-primary/10 transition-colors"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </motion.button>
          </div>
        </nav>

        {/* Mobile Nav */}
        <motion.div
          initial={false}
          animate={isOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
          className="lg:hidden overflow-hidden"
        >
          <div className="glass-card rounded-2xl mt-2 p-4 sm:p-5 space-y-3">
            {navItems.map((item, i) => (
              <motion.a
                key={item.label}
                href={item.href}
                initial={{ opacity: 0, x: -20 }}
                animate={isOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => setIsOpen(false)}
                className="block text-base font-medium hover:text-primary transition-colors"
              >
                {item.label}
              </motion.a>
            ))}
            <div className="pt-3 flex flex-col gap-2.5">
              <Button variant="glass" size="sm" className="w-full gap-2">
                <Download className="w-4 h-4" />
                Get the App
              </Button>
              <Button variant="hero" size="sm" className="w-full">
                Join Waitlist
              </Button>
            </div>
          </div>
        </motion.div>
      </motion.header>
    </>
  );
};

export default Header;
