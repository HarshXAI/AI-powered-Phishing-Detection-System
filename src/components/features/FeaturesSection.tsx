
import React, { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Shield, Lock, AlertTriangle, Search } from 'lucide-react';
import AnimatedButton from '@/components/ui/AnimatedButton';

gsap.registerPlugin(ScrollTrigger);

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, delay }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.3 });
  
  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.7, delay: delay * 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="glass p-8 rounded-xl flex flex-col items-center md:items-start text-center md:text-left"
    >
      <div className="w-16 h-16 rounded-full flex items-center justify-center bg-primary/10 mb-6 text-primary">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </motion.div>
  );
};

const FeaturesSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  
  useEffect(() => {
    if (!sectionRef.current || !titleRef.current) return;
    
    const section = sectionRef.current;
    const title = titleRef.current;
    
    gsap.fromTo(
      title.querySelectorAll('.animate-letter'),
      { opacity: 0.1, y: 20 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.05,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
        }
      }
    );
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
  
  const features = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Real-Time Detection",
      description: "Our AI analyzes URLs and websites in real-time to identify phishing attempts before you interact with them."
    },
    {
      icon: <Lock className="w-8 h-8" />,
      title: "Secure Browsing",
      description: "Browse with confidence knowing our system is constantly monitoring for suspicious activities and potential threats."
    },
    {
      icon: <AlertTriangle className="w-8 h-8" />,
      title: "Instant Alerts",
      description: "Receive immediate notifications when potential phishing threats are detected while browsing the web."
    },
    {
      icon: <Search className="w-8 h-8" />,
      title: "Deep Analysis",
      description: "Our advanced algorithms perform in-depth analysis of website content, URLs, and behavior patterns."
    }
  ];
  
  const titleText = "Powerful Features";
  
  return (
    <section ref={sectionRef} id="features" className="py-24 relative">
      <div className="container px-4 mx-auto">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <div className="inline-block py-1 px-3 mb-6 rounded-full bg-primary/10 border border-primary/20">
            <p className="text-xs font-medium text-primary">AI-Powered Protection</p>
          </div>
          
          <h2 ref={titleRef} className="text-3xl md:text-4xl font-bold mb-6">
            {titleText.split('').map((letter, index) => (
              <span key={index} className="animate-letter inline-block">
                {letter === ' ' ? '\u00A0' : letter}
              </span>
            ))}
          </h2>
          
          <p className="text-muted-foreground text-lg">
            Our cutting-edge technology provides comprehensive protection against phishing attacks
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <FeatureCard 
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={index}
            />
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <AnimatedButton 
            className="px-8 py-3 text-lg"
            hoverScale={1.05}
          >
            Explore All Features
          </AnimatedButton>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
