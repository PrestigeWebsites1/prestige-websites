"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingAnimationProps {
  onComplete: () => void;
}

const LoadingAnimation = ({ onComplete }: LoadingAnimationProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    // Set initial window size
    if (typeof window !== 'undefined') {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    }

    // Start the animation sequence
    const timer = setTimeout(() => {
      setIsVisible(false);
      // Call onComplete after the exit animation
      setTimeout(onComplete, 800);
    }, 2500); // Show for 2.5 seconds

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 z-[100] bg-gradient-to-br from-[#6c5ce7] via-[#5649c0] to-[#2d3436] flex items-center justify-center"
        >
          <motion.div
            initial={{ scale: 1, x: 0, y: 0 }}
            animate={{ 
              scale: [1, 1.1, 0.8],
              x: 0,
              y: 0
            }}
            exit={{ 
              scale: 0.6,
              x: windowSize.width > 0 ? -windowSize.width / 2 + 200 : -400, // Move to navbar position
              y: windowSize.height > 0 ? -windowSize.height / 2 + 80 : -300
            }}
            transition={{ 
              duration: 2.5,
              ease: "easeInOut"
            }}
            className="text-center"
          >
            <motion.h1 
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Prestige
              <span className="bg-gradient-to-r from-[#a29bfe] to-[#fd79a8] bg-clip-text text-transparent">
                Websites
              </span>
            </motion.h1>
            
            {/* Loading dots */}
            <motion.div 
              className="flex justify-center space-x-2 mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-3 h-3 bg-[#fd79a8] rounded-full"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.2
                  }}
                />
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingAnimation;

