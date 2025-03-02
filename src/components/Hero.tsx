
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { useAnimatedText } from '@/hooks/useAnimatedText';
import AnimatedButton from '@/components/ui/AnimatedButton';
import AuthCard from '@/components/auth/AuthCard';
import { ArrowDown } from 'lucide-react';

const Hero: React.FC = () => {
  const { displayText } = useAnimatedText({
    text: 'Secure Your Digital World – Detect & Prevent Phishing Attacks',
    typingSpeed: 50,
  });
  
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollButtonRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    const textElements = container.querySelectorAll('.animate-text');
    
    gsap.fromTo(
      textElements,
      { opacity: 0, y: 20 },
      { 
        opacity: 1, 
        y: 0, 
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.5
      }
    );
    
    if (scrollButtonRef.current) {
      // Add bouncing animation to the scroll button
      gsap.to(scrollButtonRef.current, {
        y: 10,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }
    
    return () => {
      gsap.killTweensOf(textElements);
      if (scrollButtonRef.current) {
        gsap.killTweensOf(scrollButtonRef.current);
      }
    };
  }, []);

  const scrollToFeatures = () => {
    const featuresSection = document.getElementById('features');
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center relative pb-20 pt-32">
      <div 
        ref={containerRef} 
        className="container px-4 mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8"
      >
        <motion.div 
          className="flex-1 max-w-2xl text-center lg:text-left"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-block py-1 px-3 mb-6 rounded-full bg-primary/10 border border-primary/20">
            <p className="text-xs font-medium text-primary">AI-Powered Security</p>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 animate-text">
            <div className="inline-block h-[1.25em] overflow-hidden">
              <motion.span
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                className="inline-block"
              >
                Protect Against
              </motion.span>
            </div>
            <br />
            <div className="inline-block h-[1.25em] overflow-hidden">
              <motion.span
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                className="inline-block text-glow text-primary"
              >
                Phishing Attacks
              </motion.span>
            </div>
            <br />
            <div className="inline-block h-[1.25em] overflow-hidden">
              <motion.span
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                className="inline-block"
              >
                in Real-Time
              </motion.span>
            </div>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl animate-text">
            {displayText}
            <span className="animate-pulse">|</span>
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-text">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="neo-brutalism"
            >
              <AnimatedButton to="/dashboard" className="bg-primary text-white py-3 px-8 rounded-lg font-medium text-lg">
                Get Started
              </AnimatedButton>
            </motion.div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="py-3 px-8 rounded-lg font-medium text-lg border border-border bg-secondary hover:bg-secondary/80 transition-colors"
            >
              Live Demo
            </motion.button>
          </div>
        </motion.div>
        
        <div className="flex-1 max-w-md w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <AuthCard />
          </motion.div>
        </div>
      </div>
      
      <motion.div 
        ref={scrollButtonRef}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        onClick={scrollToFeatures}
      >
        <div className="flex flex-col items-center">
          <p className="text-sm text-muted-foreground mb-2">Scroll Down</p>
          <ArrowDown className="w-6 h-6 text-primary animate-bounce" />
        </div>
      </motion.div>
    </div>
  );
};

export default Hero;
