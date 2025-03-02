
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface AnimatedButtonProps extends React.ComponentProps<typeof Button> {
  icon?: React.ReactNode;
  hoverScale?: number;
  className?: string;
  to?: string;
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  children,
  icon,
  hoverScale = 1.05,
  className,
  to,
  ...props
}) => {
  const buttonContent = (
    <Button
      className={cn(
        "relative overflow-hidden group",
        className
      )}
      {...props}
    >
      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-primary/0 via-primary/30 to-primary/0 -translate-x-full group-hover:animate-shimmer" />
      <span className="relative flex items-center gap-2">
        {icon && <span>{icon}</span>}
        {children}
      </span>
    </Button>
  );

  return (
    <motion.div
      whileHover={{ scale: hoverScale }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 10 }}
    >
      {to ? (
        <Link to={to}>
          {buttonContent}
        </Link>
      ) : (
        buttonContent
      )}
    </motion.div>
  );
};

export default AnimatedButton;
