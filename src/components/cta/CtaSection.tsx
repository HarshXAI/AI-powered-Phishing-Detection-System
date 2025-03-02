
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import AnimatedButton from '@/components/ui/AnimatedButton';
import { ArrowRight } from 'lucide-react';

const CtaSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    }
  };
  
  return (
    <section ref={sectionRef} id="contact" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background -z-10"></div>
      
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="container px-4 mx-auto"
      >
        <div className="glass max-w-5xl mx-auto p-12 rounded-2xl text-center border border-primary/20">
          <motion.div variants={itemVariants} className="inline-block py-1 px-3 mb-6 rounded-full bg-primary/10 border border-primary/20">
            <p className="text-xs font-medium text-primary">Get Started Today</p>
          </motion.div>
          
          <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Ready to Secure Your Digital World?
          </motion.h2>
          
          <motion.p variants={itemVariants} className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
            Join thousands of individuals and organizations who trust ShieldGuard to protect against sophisticated phishing attacks.
          </motion.p>
          
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center">
            <AnimatedButton 
              className="px-8 py-3 text-lg"
              hoverScale={1.05}
              icon={<ArrowRight />}
            >
              Start Free Trial
            </AnimatedButton>
            
            <AnimatedButton 
              className="px-8 py-3 text-lg"
              variant="secondary"
              hoverScale={1.05}
            >
              Watch Demo
            </AnimatedButton>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default CtaSection;
