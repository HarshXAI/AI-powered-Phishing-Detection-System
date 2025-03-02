
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const AnimatedBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const particles = particlesRef.current;
    const container = containerRef.current;
    
    if (!container) return;
    
    // Create particles
    const particleCount = 100; // Increased particle count
    const newParticles: HTMLDivElement[] = [];
    
    // Clear existing particles
    container.innerHTML = '';
    
    // Create multiple types of particles for more dynamic background
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      
      // Randomly determine particle type
      const particleType = Math.random();
      
      if (particleType < 0.7) {
        // Regular circular particles (70%)
        particle.className = 'absolute rounded-full bg-primary/10 backdrop-blur-sm';
        
        // Set random size
        const size = Math.random() * 15 + 5;
        gsap.set(particle, {
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          width: size,
          height: size,
          opacity: Math.random() * 0.4 + 0.1,
        });
        
        // Animate with different speeds
        gsap.to(particle, {
          x: `+=${Math.random() * 300 - 150}`,
          y: `+=${Math.random() * 300 - 150}`,
          duration: Math.random() * 30 + 20,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      } else if (particleType < 0.9) {
        // Star-like particles (20%)
        particle.className = 'absolute bg-white';
        particle.style.clipPath = 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)';
        
        const size = Math.random() * 8 + 3;
        gsap.set(particle, {
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          width: size,
          height: size,
          opacity: Math.random() * 0.3 + 0.1,
          rotation: Math.random() * 360,
        });
        
        // Twinkle animation
        gsap.to(particle, {
          opacity: 0.1,
          duration: Math.random() * 3 + 1,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      } else {
        // Digital-looking dots (10%)
        particle.className = 'absolute w-1 h-1 bg-primary/60';
        
        gsap.set(particle, {
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          opacity: Math.random() * 0.5 + 0.3,
        });
        
        // Pulse animation
        gsap.to(particle, {
          opacity: 0.1,
          duration: 0.5,
          repeat: -1,
          yoyo: true,
          repeatDelay: Math.random() * 5,
          ease: "power1.inOut",
        });
      }
      
      container.appendChild(particle);
      newParticles.push(particle);
    }
    
    particlesRef.current = newParticles;
    
    // Add grid
    const grid = document.createElement('div');
    grid.className = 'absolute inset-0 bg-grid-pattern bg-[length:40px_40px] opacity-[0.1]';
    container.appendChild(grid);
    
    // Add multiple gradient overlays for more depth
    const gradientOverlay1 = document.createElement('div');
    gradientOverlay1.className = 'absolute inset-0 bg-gradient-radial from-primary/5 to-transparent opacity-40';
    container.appendChild(gradientOverlay1);
    
    const gradientOverlay2 = document.createElement('div');
    gradientOverlay2.className = 'absolute inset-0 bg-gradient-to-b from-background via-transparent to-background opacity-80';
    container.appendChild(gradientOverlay2);
    
    // Add animated glow effect
    const glowEffect = document.createElement('div');
    glowEffect.className = 'absolute rounded-full blur-3xl bg-primary/5 opacity-30';
    gsap.set(glowEffect, {
      x: '50%',
      y: '30%',
      width: '40vw',
      height: '40vw',
    });
    
    gsap.to(glowEffect, {
      x: '60%',
      y: '40%',
      duration: 15,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
    
    container.appendChild(glowEffect);
    
    // Clean up
    return () => {
      particlesRef.current.forEach(particle => {
        gsap.killTweensOf(particle);
      });
      gsap.killTweensOf(glowEffect);
    };
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 overflow-hidden -z-10">
      {/* Particles will be added here dynamically */}
    </div>
  );
};

export default AnimatedBackground;
