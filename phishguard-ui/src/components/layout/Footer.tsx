
import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Github, Twitter, Linkedin, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };
  
  const socialLinks = [
    { icon: <Github size={18} />, url: "#", label: "GitHub" },
    { icon: <Twitter size={18} />, url: "#", label: "Twitter" },
    { icon: <Linkedin size={18} />, url: "#", label: "LinkedIn" },
    { icon: <Mail size={18} />, url: "#", label: "Email" }
  ];
  
  const footerLinks = [
    {
      title: "Product",
      links: [
        { label: "Features", url: "#features" },
        { label: "How It Works", url: "#how-it-works" },
        { label: "Pricing", url: "#" },
        { label: "Demo", url: "#" }
      ]
    },
    {
      title: "Company",
      links: [
        { label: "About", url: "#" },
        { label: "Team", url: "#" },
        { label: "Careers", url: "#" },
        { label: "Contact", url: "#contact" }
      ]
    },
    {
      title: "Resources",
      links: [
        { label: "Blog", url: "#" },
        { label: "Documentation", url: "#" },
        { label: "FAQ", url: "#" },
        { label: "Support", url: "#" }
      ]
    }
  ];
  
  return (
    <footer className="border-t border-border bg-secondary/20">
      <div className="container px-4 mx-auto py-16">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-6 h-6 text-primary" />
              <h2 className="text-xl font-semibold tracking-tight">ShieldGuard</h2>
            </div>
            <p className="text-muted-foreground mb-6 max-w-md">
              ShieldGuard uses advanced AI to detect and prevent phishing attacks in real-time, 
              keeping your digital life secure and protected.
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  aria-label={link.label}
                  className="w-8 h-8 rounded-full glass flex items-center justify-center hover:bg-primary/10 transition-colors"
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </motion.div>
          
          {footerLinks.map((column, columnIndex) => (
            <motion.div key={columnIndex} variants={itemVariants}>
              <h3 className="font-semibold mb-4">{column.title}</h3>
              <ul className="space-y-3">
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a 
                      href={link.url} 
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <p className="text-sm text-muted-foreground">
            © {currentYear} ShieldGuard. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Cookies Policy
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
