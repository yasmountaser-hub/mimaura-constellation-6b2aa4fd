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
  image?: string;
  emoji?: string;
  color: string;
  socials?: {
    linkedin?: string;
    instagram?: string;
  };
}

export interface TeamGroup {
  label: string;
  emoji: string;
  members: TeamMember[];
}

export const teamGroups: TeamGroup[] = [
  {
    label: "Founders",
    emoji: "👑",
    members: [
      {
        name: "Yasmine",
        role: "Co-CEO & Co-Founder",
        bio: "Passionate about building tech that truly understands what women go through. Creating Mimaura because we deserve better. 💪",
        image: yasmineBitmoji,
        color: "from-primary to-lavender-light",
        socials: { linkedin: "#", instagram: "#" },
      },
      {
        name: "Viviana",
        role: "Co-CEO & Co-Founder",
        bio: "Building the app we wished existed — for every woman navigating her cycle, her body, and her life. ✨",
        image: vivianaBitmoji,
        color: "from-rose to-rose-soft",
        socials: { linkedin: "#", instagram: "#" },
      },
    ],
  },
  {
    label: "Founding Team",
    emoji: "💫",
    members: [
      {
        name: "Lexi",
        role: "Chief Nutrition & Science Officer",
        bio: "Dedicated to bringing evidence-based nutrition science to women's health. Your cycle deserves real science. 🧬",
        image: lexiBitmoji,
        color: "from-mint to-sky",
        socials: { linkedin: "#" },
      },
    ],
  },
  {
    label: "Engineering",
    emoji: "👩‍💻",
    members: [
      {
        name: "Alishba",
        role: "Software Engineer",
        bio: "Coding with care because every feature we build touches someone's real life. 👩‍💻",
        emoji: "👩‍💻",
        color: "from-sky to-mint",
        socials: { linkedin: "#" },
      },
      {
        name: "Aya",
        role: "Software Engineer",
        bio: "Building the tech backbone so Mimaura can be there for you 24/7. 💻",
        image: ayaBitmoji,
        color: "from-primary to-sky",
        socials: { linkedin: "#" },
      },
      {
        name: "CJ",
        role: "Software Engineer",
        bio: "Passionate about creating accessible tech for all women, everywhere. ⚡",
        image: cjBitmoji,
        color: "from-accent to-rose",
        socials: { linkedin: "#" },
      },
      {
        name: "Jordan",
        role: "Software Engineer",
        bio: "Making sure every interaction feels smooth and delightful. 🚀",
        image: jordanBitmoji,
        color: "from-mint to-primary",
        socials: { linkedin: "#" },
      },
      {
        name: "Gudhal",
        role: "Software Engineer",
        bio: "Debugging so you never have to deal with glitches during your cycle. 🔧",
        emoji: "🔧",
        color: "from-lavender-light to-sky",
        socials: { linkedin: "#" },
      },
      {
        name: "Nada",
        role: "Software Engineer",
        bio: "Adding the magic touches that make Mimaura feel special. ✨",
        emoji: "✨",
        color: "from-rose-soft to-accent",
        socials: { linkedin: "#" },
      },
    ],
  },
  {
    label: "Design",
    emoji: "🎨",
    members: [
      {
        name: "Almaz",
        role: "Head of UX Design",
        bio: "Designing experiences that feel like a warm hug. Because health apps should never feel clinical. 🎨",
        image: almazBitmoji,
        color: "from-rose to-primary",
        socials: { linkedin: "#" },
      },
    ],
  },
  {
    label: "Marketing",
    emoji: "📣",
    members: [
      {
        name: "Soundouss",
        role: "Head of Marketing",
        bio: "Spreading the word about cycle care that actually cares. Every woman deserves to know Mimaura exists. 📣",
        image: soundoussBitmoji,
        color: "from-accent to-gold-soft",
        socials: { linkedin: "#", instagram: "#" },
      },
    ],
  },
  {
    label: "Advisory Board",
    emoji: "🌟",
    members: [
      {
        name: "Jennifer",
        role: "Business Advisor",
        bio: "Helping Mimaura grow sustainably so we can help more women. 💼",
        emoji: "💼",
        color: "from-accent to-gold-soft",
        socials: { linkedin: "#" },
      },
      {
        name: "Lily",
        role: "Medical Advisor",
        bio: "Ensuring Mimaura's guidance is medically sound and truly helpful. 👩‍⚕️",
        emoji: "👩‍⚕️",
        color: "from-mint to-sky",
        socials: { linkedin: "#" },
      },
      {
        name: "Hamna",
        role: "Advisor",
        bio: "Bringing fresh perspectives to make Mimaura better every day. 🌟",
        emoji: "🌟",
        color: "from-rose to-primary",
        socials: { linkedin: "#" },
      },
    ],
  },
];
