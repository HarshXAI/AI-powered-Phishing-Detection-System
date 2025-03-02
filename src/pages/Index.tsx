
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';

import AnimatedBackground from '@/components/AnimatedBackground';
import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/Hero';
import FeaturesSection from '@/components/features/FeaturesSection';
import HowItWorksSection from '@/components/how-it-works/HowItWorksSection';
import StatsSection from '@/components/stats/StatsSection';
import TestimonialsSection from '@/components/testimonials/TestimonialsSection';
import CtaSection from '@/components/cta/CtaSection';
import Footer from '@/components/layout/Footer';
import ScrollToTopButton from '@/components/ui/ScrollToTopButton';

const Index: React.FC = () => {
  useEffect(() => {
    // Initialize GSAP animations
    gsap.config({
      autoSleep: 60,
      force3D: true,
    });

    // Handle document loading
    gsap.to('body', { opacity: 1, duration: 0.4, ease: 'power2.out' });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen"
    >
      <AnimatedBackground />
      <Navbar />
      
      <main className="relative">
        <Hero />
        <FeaturesSection />
        <HowItWorksSection />
        <StatsSection />
        <TestimonialsSection />
        <CtaSection />
      </main>
      
      <Footer />
      <ScrollToTopButton />
    </motion.div>
  );
};

export default Index;
