
import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Shield } from 'lucide-react';
import AnimatedButton from '@/components/ui/AnimatedButton';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();
  
  const navBackground = useTransform(
    scrollY,
    [0, 50],
    ['rgba(18, 18, 24, 0)', 'rgba(18, 18, 24, 0.8)']
  );
  
  const navBorder = useTransform(
    scrollY,
    [0, 50],
    ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0.1)']
  );
  
  const navPadding = useTransform(
    scrollY,
    [0, 50],
    ['1.5rem', '1rem']
  );
  
  useEffect(() => {
    const updateScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', updateScroll);
    return () => window.removeEventListener('scroll', updateScroll);
  }, []);

  return (
    <motion.header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 backdrop-blur-md transition-all duration-300",
        isScrolled ? "shadow-lg" : "shadow-none"
      )}
      style={{
        backgroundColor: navBackground,
        borderBottom: `1px solid`,
        borderColor: navBorder,
        paddingTop: navPadding,
        paddingBottom: navPadding,
      }}
    >
      <div className="container px-4 mx-auto flex items-center justify-between">
        <motion.div 
          className="flex items-center gap-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <Shield className="w-8 h-8 text-primary" />
          <h1 className="text-xl font-semibold tracking-tight">ShieldGuard</h1>
        </motion.div>
        
        <motion.div
          className="flex items-center gap-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        >
          <nav className="hidden md:flex items-center space-x-6">
            <NavLink href="#features">Features</NavLink>
            <NavLink href="#how-it-works">How It Works</NavLink>
            <NavLink href="#testimonials">Testimonials</NavLink>
            <NavLink href="#contact">Contact</NavLink>
          </nav>
          
          <AnimatedButton 
            className="hidden sm:flex"
            variant="secondary"
            size="sm"
          >
            Sign In
          </AnimatedButton>
        </motion.div>
      </div>
    </motion.header>
  );
};

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ href, children }) => {
  return (
    <a
      href={href}
      className="relative text-sm font-medium tracking-wide text-foreground/80 hover:text-foreground transition-colors"
    >
      <span className="relative group">
        {children}
        <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out" />
      </span>
    </a>
  );
};

export default Navbar;
