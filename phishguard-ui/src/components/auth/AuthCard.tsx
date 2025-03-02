
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AnimatedButton from '@/components/ui/AnimatedButton';
import ShieldAnimation from '@/components/animations/ShieldAnimation';
import { LogIn, UserPlus, Mail, Lock, ArrowRight, Github } from 'lucide-react';

const AuthCard: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.4,
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      className="glass w-full max-w-md p-6 rounded-xl shadow-xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex justify-center mb-6">
        <ShieldAnimation />
      </div>
      
      <Tabs defaultValue="login" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="login" className="text-base">
            <LogIn className="w-4 h-4 mr-2" />
            Sign In
          </TabsTrigger>
          <TabsTrigger value="register" className="text-base">
            <UserPlus className="w-4 h-4 mr-2" />
            Sign Up
          </TabsTrigger>
        </TabsList>
        
        <AnimatePresence mode="wait">
          <TabsContent value="login" className="space-y-6">
            <motion.form
              variants={formVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="space-y-6"
            >
              <motion.div variants={itemVariants} className="space-y-2">
                <Label htmlFor="email" className="text-sm text-foreground/80">
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 bg-secondary border-secondary h-12"
                    placeholder="your@email.com"
                  />
                </div>
              </motion.div>
              
              <motion.div variants={itemVariants} className="space-y-2">
                <Label htmlFor="password" className="text-sm text-foreground/80">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 bg-secondary border-secondary h-12"
                    placeholder="••••••••"
                  />
                </div>
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <AnimatedButton 
                  className="w-full h-12 text-base font-medium"
                  icon={<ArrowRight className="w-5 h-5" />}
                >
                  Sign In
                </AnimatedButton>
              </motion.div>
              
              <motion.div variants={itemVariants} className="relative flex items-center">
                <div className="flex-grow border-t border-border"></div>
                <span className="flex-shrink mx-4 text-muted-foreground text-sm">or continue with</span>
                <div className="flex-grow border-t border-border"></div>
              </motion.div>
              
              <motion.div variants={itemVariants} className="grid grid-cols-1 gap-3">
                <AnimatedButton 
                  variant="outline"
                  className="h-12 text-base font-medium bg-secondary border-secondary"
                  icon={<Github className="w-5 h-5" />}
                >
                  GitHub
                </AnimatedButton>
              </motion.div>
            </motion.form>
          </TabsContent>
          
          <TabsContent value="register" className="space-y-6">
            <motion.form
              variants={formVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="space-y-6"
            >
              <motion.div variants={itemVariants} className="space-y-2">
                <Label htmlFor="register-email" className="text-sm text-foreground/80">
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="register-email"
                    type="email"
                    className="pl-10 bg-secondary border-secondary h-12"
                    placeholder="your@email.com"
                  />
                </div>
              </motion.div>
              
              <motion.div variants={itemVariants} className="space-y-2">
                <Label htmlFor="register-password" className="text-sm text-foreground/80">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="register-password"
                    type="password"
                    className="pl-10 bg-secondary border-secondary h-12"
                    placeholder="••••••••"
                  />
                </div>
              </motion.div>
              
              <motion.div variants={itemVariants} className="space-y-2">
                <Label htmlFor="confirm-password" className="text-sm text-foreground/80">
                  Confirm Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="confirm-password"
                    type="password"
                    className="pl-10 bg-secondary border-secondary h-12"
                    placeholder="••••••••"
                  />
                </div>
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <AnimatedButton 
                  className="w-full h-12 text-base font-medium"
                  icon={<UserPlus className="w-5 h-5" />}
                >
                  Create Account
                </AnimatedButton>
              </motion.div>
              
              <motion.div variants={itemVariants} className="relative flex items-center">
                <div className="flex-grow border-t border-border"></div>
                <span className="flex-shrink mx-4 text-muted-foreground text-sm">or continue with</span>
                <div className="flex-grow border-t border-border"></div>
              </motion.div>
              
              <motion.div variants={itemVariants} className="grid grid-cols-1 gap-3">
                <AnimatedButton 
                  variant="outline"
                  className="h-12 text-base font-medium bg-secondary border-secondary"
                  icon={<Github className="w-5 h-5" />}
                >
                  GitHub
                </AnimatedButton>
              </motion.div>
            </motion.form>
          </TabsContent>
        </AnimatePresence>
      </Tabs>
    </motion.div>
  );
};

export default AuthCard;
