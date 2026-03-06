import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Download } from "lucide-react";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import logo from "@/assets/mimaura-logo.png";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: "Features", href: "#features" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Meet Mimi", href: "#meet-mimi" },
    { label: "Privacy", href: "#privacy" },
  ];

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-6 py-2 sm:py-4"
    >
      <nav className="max-w-7xl mx-auto glass-card rounded-2xl px-3 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between gap-2">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <motion.img
            src={logo}
            alt="Mimaura"
            whileHover={{ scale: 1.05 }}
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl object-contain"
          />
          <span className="font-display text-lg sm:text-xl font-bold">Mimaura</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
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
        <div className="hidden md:flex items-center gap-3">
          <ThemeSwitcher />
          <Button variant="ghost" size="sm" className="gap-2">
            <Download className="w-4 h-4" />
            Get App
          </Button>
          <Button variant="hero" size="sm">
            Join Waitlist
          </Button>
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden items-center gap-1.5">
          <ThemeSwitcher />
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-xl hover:bg-primary/10 transition-colors"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </motion.button>
        </div>
      </nav>

      {/* Mobile Nav */}
      <motion.div
        initial={false}
        animate={isOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
        className="md:hidden overflow-hidden"
      >
        <div className="glass-card rounded-2xl mt-2 p-5 space-y-3">
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
  );
};

export default Header;
