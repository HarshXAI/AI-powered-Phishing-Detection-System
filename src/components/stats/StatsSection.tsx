
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface StatCardProps {
  value: string;
  label: string;
  delay: number;
}

const StatCard: React.FC<StatCardProps> = ({ value, label, delay }) => {
  const counterRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!counterRef.current) return;
    
    const counter = counterRef.current;
    const card = cardRef.current;
    
    // Counter animation
    gsap.from(counter, {
      textContent: "0",
      duration: 2,
      ease: "power2.out",
      snap: { textContent: 1 },
      stagger: 1,
      scrollTrigger: {
        trigger: card,
        start: "top 80%",
      },
      onUpdate: function() {
        if (counter) {
          counter.textContent = Math.ceil(Number(counter.textContent)).toString() + 
            (value.includes('%') ? '%' : '');
        }
      },
    });
  }, [value]);
  
  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: delay * 0.2, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, amount: 0.3 }}
      className="glass p-6 rounded-xl flex flex-col items-center hover:border-primary/30 transition-colors duration-300"
    >
      <div ref={counterRef} className="text-4xl md:text-5xl font-bold text-primary mb-2">
        {value}
      </div>
      <p className="text-muted-foreground text-center">{label}</p>
    </motion.div>
  );
};

const StatsSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const stats = [
    { value: "99.8%", label: "Detection Accuracy" },
    { value: "5M+", label: "Protected Users" },
    { value: "10K+", label: "Threats Blocked Daily" },
    { value: "100%", label: "Customer Satisfaction" }
  ];
  
  return (
    <section ref={sectionRef} id="stats" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-br from-secondary/50 to-transparent -z-10"></div>
      
      <div className="container px-4 mx-auto">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
            className="inline-block py-1 px-3 mb-6 rounded-full bg-primary/10 border border-primary/20"
          >
            <p className="text-xs font-medium text-primary">By The Numbers</p>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
            className="text-3xl md:text-4xl font-bold mb-6"
          >
            Trust Our Results
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
            className="text-muted-foreground text-lg"
          >
            Our AI-powered phishing detection delivers industry-leading performance
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              value={stat.value}
              label={stat.label}
              delay={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
