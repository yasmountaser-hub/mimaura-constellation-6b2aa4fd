import yasmineBitmoji from "@/assets/yasmine-bitmoji.jpeg";
import vivianaBitmoji from "@/assets/viviana-bitmoji.jpeg";
import lexiBitmoji from "@/assets/lexi-bitmoji.jpeg";
import ayaBitmoji from "@/assets/aya-bitmoji.jpeg";
import cjBitmoji from "@/assets/cj-bitmoji.jpeg";
import jordanBitmoji from "@/assets/jordan-bitmoji.jpeg";
import almazBitmoji from "@/assets/almaz-bitmoji.jpeg";
import soundoussBitmoji from "@/assets/soundouss-bitmoji.jpeg";

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  hoverText: string;
  image?: string;
  emoji?: string;
  color: string;
  hoverEmojis: string[];
  ctaText: string;
  ctaLink: string;
  tier: "founder" | "core" | "team" | "advisor";
  socials?: {
    linkedin?: string;
    instagram?: string;
  };
}

export interface TeamGroup {
  label: string;
  emoji: string;
  subtitle: string;
  members: TeamMember[];
}

export const teamGroups: TeamGroup[] = [
  {
    label: "Founders",
    emoji: "👑",
    subtitle: "The rhythm setters",
    members: [
      {
        name: "Yasmine",
        role: "Co-CEO · Product & Vision",
        bio: "Turning hormone science into a calm, daily experience. 💪",
        hoverText: "Turning hormone science into a calm, daily experience.",
        image: yasmineBitmoji,
        color: "from-primary to-lavender-light",
        hoverEmojis: ["✨", "🔮", "💜"],
        ctaText: "See the vision →",
        ctaLink: "#how-it-works",
        tier: "founder",
        socials: { linkedin: "#", instagram: "#" },
      },
      {
        name: "Viviana",
        role: "Co-CEO · Strategy & Growth",
        bio: "Building the future of rhythm-based health. ✨",
        hoverText: "Building the future of rhythm-based health.",
        image: vivianaBitmoji,
        color: "from-rose to-rose-soft",
        hoverEmojis: ["🚀", "💗", "🌸"],
        ctaText: "See the strategy →",
        ctaLink: "#difference",
        tier: "founder",
        socials: { linkedin: "#", instagram: "#" },
      },
    ],
  },
  {
    label: "Founders",
    emoji: "🧬",
    subtitle: "Evidence meets empathy",
    members: [
      {
        name: "Lexi",
        role: "Co-Founder · Chief Nutrition & Science Officer",
        bio: "Translating research into real-life nourishment. 🧬",
        hoverText: "Translating research into real-life nourishment.",
        image: lexiBitmoji,
        color: "from-mint to-sky",
        hoverEmojis: ["🧪", "🌿", "📊"],
        ctaText: "Explore the science →",
        ctaLink: "#education",
        tier: "founder",
        socials: { linkedin: "#" },
      },
    ],
  },
  {
    label: "Engineering",
    emoji: "⚡",
    subtitle: "The care infrastructure",
    members: [
      {
        name: "Alishba",
        role: "Software Engineer",
        bio: "Code that turns into real-life impact. 💖",
        emoji: "👩‍💻",
        color: "from-sky to-mint",
        hoverEmojis: ["💖", "🌍", "✨"],
        hoverText: "Building systems that support you quietly.",
        ctaText: "See how we protect you →",
        ctaLink: "#privacy",
        tier: "team",
        socials: { linkedin: "#" },
      },
      {
        name: "Aya",
        role: "Software Engineer",
        bio: "Building the tech backbone 24/7. 💻",
        image: ayaBitmoji,
        color: "from-primary to-sky",
        hoverEmojis: ["💻", "✨", "🚀"],
        hoverText: "Compiling… ✨ Mimaura deployed.",
        ctaText: "See how it works →",
        ctaLink: "#how-it-works",
        tier: "team",
        socials: { linkedin: "#" },
      },
      {
        name: "CJ",
        role: "Software Engineer",
        bio: "Accessible tech for all women. ⚡",
        image: cjBitmoji,
        color: "from-accent to-rose",
        hoverEmojis: ["⚡", "♿", "✨"],
        hoverText: "Making sure every interaction is accessible to everyone.",
        ctaText: "See our values →",
        ctaLink: "#difference",
        tier: "team",
        socials: { linkedin: "#" },
      },
      {
        name: "Jordan",
        role: "Software Engineer",
        bio: "Smooth & delightful interactions. 🚀",
        image: jordanBitmoji,
        color: "from-mint to-primary",
        hoverEmojis: ["🎨", "🚀", "💫"],
        hoverText: "Making sure every interaction feels smooth and delightful.",
        ctaText: "Try the experience →",
        ctaLink: "#features",
        tier: "team",
        socials: { linkedin: "#" },
      },
      {
        name: "Gudhal",
        role: "Software Engineer",
        bio: "Debugging so you don't have to. 🔧",
        emoji: "🔧",
        color: "from-lavender-light to-sky",
        hoverEmojis: ["🐛", "✅", "🔧"],
        hoverText: "Squashing bugs one by one so your experience stays smooth.",
        ctaText: "See our privacy →",
        ctaLink: "#privacy",
        tier: "team",
        socials: { linkedin: "#" },
      },
      {
        name: "Nada",
        role: "Software Engineer",
        bio: "Adding the magic touches. ✨",
        emoji: "✨",
        color: "from-rose-soft to-accent",
        hoverEmojis: ["✨", "🪄", "💜"],
        hoverText: "Turning logic into something that feels human.",
        ctaText: "See the magic →",
        ctaLink: "#meet-mimi",
        tier: "team",
        socials: { linkedin: "#" },
      },
    ],
  },
  {
    label: "Design",
    emoji: "🎨",
    subtitle: "Experiences that listen",
    members: [
      {
        name: "Almaz",
        role: "Head of UX Design",
        bio: "Designing experiences like warm hugs. 🎨",
        image: almazBitmoji,
        color: "from-rose to-primary",
        hoverEmojis: ["🎨", "🧠", "✨"],
        hoverText: "Designing experiences that listen before they speak.",
        ctaText: "See the experience →",
        ctaLink: "#features",
        tier: "core",
        socials: { linkedin: "#" },
      },
    ],
  },
  {
    label: "Community",
    emoji: "💌",
    subtitle: "Connecting Mimaura to the world",
    members: [
      {
        name: "Soundouss",
        role: "Head of Marketing",
        bio: "Making every person feel seen. 📣",
        image: soundoussBitmoji,
        color: "from-accent to-gold-soft",
        hoverEmojis: ["💌", "💗", "🌍"],
        hoverText: "Making every person feel seen before they even download the app.",
        ctaText: "Join the community →",
        ctaLink: "#waitlist",
        tier: "core",
        socials: { linkedin: "#", instagram: "#" },
      },
    ],
  },
  {
    label: "Advisory Board",
    emoji: "🌟",
    subtitle: "Guiding the mission",
    members: [
      {
        name: "Jennifer",
        role: "Business Advisor",
        bio: "Helping Mimaura grow sustainably. 💼",
        emoji: "💼",
        color: "from-accent to-gold-soft",
        hoverEmojis: ["📈", "💼", "🌱"],
        hoverText: "Guiding sustainable growth so we can help more women.",
        ctaText: "See our growth →",
        ctaLink: "#difference",
        tier: "advisor",
        socials: { linkedin: "#" },
      },
      {
        name: "Lily",
        role: "Medical Advisor",
        bio: "Medically sound & truly helpful. 👩‍⚕️",
        emoji: "👩‍⚕️",
        color: "from-mint to-sky",
        hoverEmojis: ["🩺", "🧬", "✅"],
        hoverText: "Ensuring every recommendation is medically reviewed.",
        ctaText: "Explore the science →",
        ctaLink: "#education",
        tier: "advisor",
        socials: { linkedin: "#" },
      },
      {
        name: "Hamna",
        role: "Advisor",
        bio: "Fresh perspectives daily. 🌟",
        emoji: "🌟",
        color: "from-rose to-primary",
        hoverEmojis: ["💡", "🌟", "🔮"],
        hoverText: "Bringing fresh perspectives to make Mimaura better every day.",
        ctaText: "See the vision →",
        ctaLink: "#how-it-works",
        tier: "advisor",
        socials: { linkedin: "#" },
      },
    ],
  },
];
