
import React, { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
  company: string;
  delay: number;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ quote, author, role, company, delay }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.3 });
  
  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.7, delay: delay * 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="glass p-8 rounded-xl relative"
    >
      <Quote className="absolute top-6 right-6 text-primary/30 w-10 h-10" />
      <p className="text-lg mb-8 relative z-10">{quote}</p>
      <div>
        <p className="font-semibold">{author}</p>
        <p className="text-sm text-muted-foreground">{role}, {company}</p>
      </div>
    </motion.div>
  );
};

const TestimonialsSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!sectionRef.current) return;
    
    const section = sectionRef.current;
    
    gsap.fromTo(
      section.querySelector('.section-title'),
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
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
  
  const testimonials = [
    {
      quote: "ShieldGuard has revolutionized our security approach. Their AI-powered solution has caught numerous phishing attempts that would have otherwise slipped through.",
      author: "Jessica Winters",
      role: "CTO",
      company: "TechCorp Solutions"
    },
    {
      quote: "Since implementing ShieldGuard, our security incidents have dropped by over 90%. The real-time protection gives our team peace of mind.",
      author: "Michael Chen",
      role: "Security Director",
      company: "Global Finance"
    },
    {
      quote: "The accuracy of ShieldGuard's detection system is unmatched. We've tried other solutions, but none come close to the protection and ease of use we get here.",
      author: "Sarah Johnson",
      role: "IT Manager",
      company: "Healthcare Systems"
    }
  ];
  
  return (
    <section ref={sectionRef} id="testimonials" className="py-24 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/4 -z-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      
      <div className="container px-4 mx-auto">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <div className="inline-block py-1 px-3 mb-6 rounded-full bg-primary/10 border border-primary/20">
            <p className="text-xs font-medium text-primary">Customer Stories</p>
          </div>
          
          <h2 className="section-title text-3xl md:text-4xl font-bold mb-6">
            What Our Users Say
          </h2>
          
          <p className="text-muted-foreground text-lg">
            Discover how ShieldGuard helps organizations protect against phishing attacks
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard 
              key={index}
              quote={testimonial.quote}
              author={testimonial.author}
              role={testimonial.role}
              company={testimonial.company}
              delay={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
