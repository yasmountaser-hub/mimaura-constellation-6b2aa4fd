import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingParticles from "@/components/FloatingParticles";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import JourneyMapSection from "@/components/JourneyMapSection";
import DifferenceSection from "@/components/DifferenceSection";
import PatternNudgeSneakPeek from "@/components/PatternNudgeSneakPeek";
import TestimonialsSection from "@/components/TestimonialsSection";
import MeetMimiSection from "@/components/MeetMimiSection";
import TeamSection from "@/components/TeamSection";
import EducationSection from "@/components/EducationSection";
import TrustSection from "@/components/TrustSection";
import WaitlistSection from "@/components/WaitlistSection";

const Index = () => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Floating particles background */}
      <FloatingParticles />
      
      {/* Header */}
      <Header />
      
      {/* Main content */}
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Hero */}
        <section id="hero">
          <HeroSection />
        </section>

        {/* Features */}
        <section id="features">
          <FeaturesSection />
        </section>

        {/* Journey Map */}
        <section id="journey">
          <JourneyMapSection />
        </section>

        {/* What Makes Us Different */}
        <section id="difference">
          <DifferenceSection />
        </section>

        {/* Pattern Nudge Sneak Peek */}
        <section id="how-it-works">
          <PatternNudgeSneakPeek />
        </section>

        {/* Testimonials */}
        <section id="testimonials">
          <TestimonialsSection />
        </section>

        {/* Meet Mimi */}
        <section id="meet-mimi">
          <MeetMimiSection />
        </section>

        {/* Meet the Team */}
        <section id="team">
          <TeamSection />
        </section>

        {/* Education Hub */}
        <section id="education">
          <EducationSection />
        </section>

        {/* Trust & Privacy */}
        <section id="privacy">
          <TrustSection />
        </section>

        {/* Waitlist CTA */}
        <section id="waitlist">
          <WaitlistSection />
        </section>
      </motion.main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
