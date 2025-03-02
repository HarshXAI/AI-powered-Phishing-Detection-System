
import { useState, useEffect, useRef } from 'react';

interface AnimatedTextOptions {
  text: string;
  typingSpeed?: number;
  deleteSpeed?: number;
  delayBeforeDelete?: number;
  repeat?: boolean;
  initialDelay?: number;
}

export const useAnimatedText = ({
  text,
  typingSpeed = 75,
  deleteSpeed = 50,
  delayBeforeDelete = 2000,
  repeat = false,
  initialDelay = 500,
}: AnimatedTextOptions) => {
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const startTyping = () => {
      const currentLength = displayText.length;
      
      if (isTyping && !isDeleting) {
        if (currentLength < text.length) {
          timeoutRef.current = setTimeout(() => {
            setDisplayText(text.substring(0, currentLength + 1));
          }, typingSpeed);
        } else {
          setIsTyping(false);
          if (repeat) {
            timeoutRef.current = setTimeout(() => {
              setIsDeleting(true);
            }, delayBeforeDelete);
          } else {
            setIsComplete(true);
          }
        }
      } else if (isDeleting && !isTyping) {
        if (currentLength > 0) {
          timeoutRef.current = setTimeout(() => {
            setDisplayText(text.substring(0, currentLength - 1));
          }, deleteSpeed);
        } else {
          setIsDeleting(false);
          setIsTyping(true);
        }
      }
    };

    // Initial delay
    if (displayText === '' && !timeoutRef.current) {
      timeoutRef.current = setTimeout(() => {
        startTyping();
      }, initialDelay);
    } else {
      startTyping();
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [displayText, isTyping, isDeleting, text, typingSpeed, deleteSpeed, delayBeforeDelete, repeat, initialDelay]);

  return { displayText, isComplete };
};
