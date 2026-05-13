import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Sparkles, Heart, Instagram, Linkedin } from "lucide-react";

// TikTok icon (lucide has no built-in)
const TikTokIcon = ({ className = "" }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.69a8.16 8.16 0 0 0 4.77 1.52V6.69h-1.84z" />
  </svg>
);

const Footer = () => {
  const links = {
    explore: [
      { label: "App Preview", to: "/preview" },
      { label: "Resources", to: "/resources" },
      { label: "Glossary", to: "/glossary" },
      { label: "Roadmap", to: "/roadmap" },
    ],
    community: [
      { label: "The Circle", to: "/community" },
      { label: "FAQ", to: "/faq" },
      { label: "Sign In", to: "/auth" },
    ],
    learn: [
      { label: "How It Works", to: "/#how-it-works" },
      { label: "Meet Mimi", to: "/#meet-mimi" },
      { label: "Our Team", to: "/#team" },
      { label: "Join Waitlist", to: "/#waitlist" },
    ],
  };

  const socials = [
    {
      icon: Instagram,
      href: "https://www.instagram.com/mimaura_app/",
      label: "Instagram",
    },
    {
      icon: TikTokIcon,
      href: "https://www.tiktok.com/@mimaura_app",
      label: "TikTok",
    },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/company/mimaura",
      label: "LinkedIn",
    },
  ];

  return (
    <footer className="relative py-12 sm:py-16 px-4 sm:px-6 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <motion.div
                whileHover={{ rotate: 10, scale: 1.1 }}
                className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center"
              >
                <Sparkles className="w-5 h-5 text-primary" />
              </motion.div>
              <span className="font-display text-xl font-bold">Mimaura</span>
            </Link>
            <p className="text-muted-foreground text-sm max-w-xs">
              Your gentle pattern pal. Helping you understand your body's rhythms —
              one soft insight at a time.
            </p>

            <div className="flex gap-3">
              {socials.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4 text-primary" />
                </motion.a>
              ))}
            </div>
          </div>

          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <h4 className="font-display font-bold mb-4 capitalize">{category}</h4>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item.label}>
                    <Link
                      to={item.to}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-primary/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            Made with <Heart className="w-4 h-4 text-rose fill-rose" /> by the Mimaura team
          </p>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Mimaura. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
