import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingParticles from "@/components/FloatingParticles";
import CursorGlow from "@/components/CursorGlow";
import SectionDivider from "@/components/SectionDivider";
import SectionNav from "@/components/SectionNav";
import AccessibilityPanel from "@/components/AccessibilityPanel";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import JourneyMapSection from "@/components/JourneyMapSection";
import DifferenceSection from "@/components/DifferenceSection";
import PatternNudgeSneakPeek from "@/components/PatternNudgeSneakPeek";
import TestimonialsSection from "@/components/TestimonialsSection";
import MeetMimiSection from "@/components/MeetMimiSection";
import MimiQuizSection from "@/components/MimiQuizSection";
import TeamSection from "@/components/TeamSection";
import EducationSection from "@/components/EducationSection";
import TrustSection from "@/components/TrustSection";
import WaitlistSection from "@/components/WaitlistSection";

const Index = () => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <FloatingParticles />
      <CursorGlow />
      <Header />
      <SectionNav />
      <AccessibilityPanel />
      
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <section id="hero"><HeroSection /></section>
        <SectionDivider />
        <section id="features"><FeaturesSection /></section>
        <SectionDivider />
        <section id="journey"><JourneyMapSection /></section>
        <SectionDivider />
        <section id="difference"><DifferenceSection /></section>
        <SectionDivider />
        <section id="how-it-works"><PatternNudgeSneakPeek /></section>
        <SectionDivider />
        <section id="testimonials"><TestimonialsSection /></section>
        <SectionDivider />
        <section id="meet-mimi"><MeetMimiSection /></section>
        <SectionDivider />
        <section id="quiz"><MimiQuizSection /></section>
        <SectionDivider />
        <section id="team"><TeamSection /></section>
        <SectionDivider />
        <section id="education"><EducationSection /></section>
        <SectionDivider />
        <section id="privacy"><TrustSection /></section>
        <SectionDivider />
        <section id="waitlist"><WaitlistSection /></section>
      </motion.main>

      <Footer />
    </div>
  );
};

export default Index;
