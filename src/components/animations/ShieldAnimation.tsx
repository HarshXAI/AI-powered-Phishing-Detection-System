
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { Shield, CheckCircle } from 'lucide-react';

const ShieldAnimation: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pulseRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const pulse = pulseRef.current;
    
    if (!container || !pulse) return;
    
    // Create scanning animation
    const timeline = gsap.timeline({
      repeat: -1,
      repeatDelay: 1,
    });
    
    timeline.to(pulse, {
      height: '100%',
      duration: 2,
      ease: 'power1.inOut',
      opacity: 0.6,
    });
    
    timeline.to(pulse, {
      opacity: 0,
      duration: 0.5,
      ease: 'power1.inOut',
    });
    
    timeline.set(pulse, {
      height: '0%',
      opacity: 0.4,
    });
    
    return () => {
      timeline.kill();
    };
  }, []);

  // Shield container variants
  const containerVariants = {
    initial: { scale: 0.9, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      } 
    }
  };
  
  // Check mark variants
  const checkVariants = {
    initial: { scale: 0, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        delay: 2.5,
        duration: 0.5,
        type: 'spring',
        stiffness: 200
      } 
    }
  };

  return (
    <motion.div 
      className="relative w-32 h-32 md:w-40 md:h-40"
      variants={containerVariants}
      initial="initial"
      animate="animate"
      ref={containerRef}
    >
      <Shield 
        className="w-full h-full text-primary/80" 
        strokeWidth={1.5}
      />
      
      <div 
        ref={pulseRef}
        className="absolute bottom-0 left-0 w-full h-0 bg-primary/30 z-10"
        style={{ borderRadius: 'inherit' }}
      />
      
      <motion.div 
        className="absolute inset-0 flex items-center justify-center"
        variants={checkVariants}
        initial="initial"
        animate="animate"
      >
        <CheckCircle 
          className="w-12 h-12 md:w-16 md:h-16 text-primary" 
          strokeWidth={2}
        />
      </motion.div>
      
      <div className="absolute -inset-4 blur-lg bg-primary/20 -z-10 rounded-full animate-pulse-slow" />
    </motion.div>
  );
};

export default ShieldAnimation;
