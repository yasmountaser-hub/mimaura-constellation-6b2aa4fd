import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
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
import DepthLayer from "@/components/DepthLayer";

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
        
        <DepthLayer speed={0.3} rotateOnScroll>
          <section id="features"><FeaturesSection /></section>
        </DepthLayer>
        <SectionDivider />
        
        <DepthLayer speed={-0.2} rotateOnScroll>
          <section id="journey"><JourneyMapSection /></section>
        </DepthLayer>
        <SectionDivider />
        
        <DepthLayer speed={0.2} rotateOnScroll>
          <section id="difference"><DifferenceSection /></section>
        </DepthLayer>
        <SectionDivider />
        
        <DepthLayer speed={-0.15}>
          <section id="how-it-works"><PatternNudgeSneakPeek /></section>
        </DepthLayer>
        <SectionDivider />
        
        <DepthLayer speed={0.25} rotateOnScroll>
          <section id="testimonials"><TestimonialsSection /></section>
        </DepthLayer>
        <SectionDivider />
        
        <DepthLayer speed={-0.2}>
          <section id="meet-mimi"><MeetMimiSection /></section>
        </DepthLayer>
        <SectionDivider />
        
        <DepthLayer speed={0.15} rotateOnScroll>
          <section id="quiz"><MimiQuizSection /></section>
        </DepthLayer>
        <SectionDivider />
        
        <DepthLayer speed={-0.1}>
          <section id="team"><TeamSection /></section>
        </DepthLayer>
        <SectionDivider />
        
        <DepthLayer speed={0.2} rotateOnScroll>
          <section id="education"><EducationSection /></section>
        </DepthLayer>
        <SectionDivider />
        
        <DepthLayer speed={-0.15}>
          <section id="privacy"><TrustSection /></section>
        </DepthLayer>
        <SectionDivider />
        
        <section id="waitlist"><WaitlistSection /></section>
      </motion.main>

      <Footer />
    </div>
  );
};

export default Index;
