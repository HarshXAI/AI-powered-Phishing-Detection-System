
import React, { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ShieldAnimation from '@/components/animations/ShieldAnimation';

gsap.registerPlugin(ScrollTrigger);

const HowItWorksSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!sectionRef.current || !stepsRef.current) return;
    
    const section = sectionRef.current;
    const steps = stepsRef.current.querySelectorAll('.step-item');
    
    gsap.fromTo(
      steps,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
        }
      }
    );
    
    // Create connecting line animation
    gsap.fromTo(
      ".connector",
      { height: 0 },
      {
        height: "100%",
        duration: 1.5,
        ease: "power3.inOut",
        scrollTrigger: {
          trigger: section,
          start: "top 60%",
        }
      }
    );
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
  
  const steps = [
    {
      number: "01",
      title: "Install Extension",
      description: "Add our browser extension with a single click for instant protection."
    },
    {
      number: "02",
      title: "Real-time Scanning",
      description: "Every website you visit is automatically scanned for phishing indicators."
    },
    {
      number: "03",
      title: "Threat Detection",
      description: "Our AI identifies suspicious patterns and malicious content in real-time."
    },
    {
      number: "04",
      title: "Instant Protection",
      description: "Receive alerts and automatic blocking of dangerous websites."
    }
  ];
  
  return (
    <section ref={sectionRef} id="how-it-works" className="py-24 relative overflow-hidden">
      <div className="absolute top-0 right-0 -z-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 -z-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      
      <div className="container px-4 mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1">
            <div className="max-w-xl">
              <div className="inline-block py-1 px-3 mb-6 rounded-full bg-primary/10 border border-primary/20">
                <p className="text-xs font-medium text-primary">Simple Process</p>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                How ShieldGuard Works
              </h2>
              
              <p className="text-muted-foreground text-lg mb-10">
                Our advanced AI-powered system provides seamless protection in just a few simple steps
              </p>
              
              <div ref={stepsRef} className="relative">
                {steps.map((step, index) => (
                  <div key={index} className="step-item relative pl-16 pb-12 last:pb-0">
                    {index < steps.length - 1 && (
                      <div className="connector absolute left-7 top-10 w-0.5 bg-primary/20" style={{ bottom: '0' }}></div>
                    )}
                    <div className="absolute left-0 top-0 w-14 h-14 rounded-full bg-secondary border border-primary/30 flex items-center justify-center text-lg font-bold text-primary">
                      {step.number}
                    </div>
                    <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="flex-1 flex justify-center items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true, amount: 0.3 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-primary/5 rounded-full blur-3xl"></div>
              <div className="p-8 rounded-2xl glass-hover border border-primary/20 relative z-10">
                <ShieldAnimation />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
