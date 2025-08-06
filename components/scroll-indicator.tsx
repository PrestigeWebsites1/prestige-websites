"use client";

import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const ScrollIndicator = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollYProgress } = useScroll();
  
  // Only need the progress height transform now
  const progressHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.div
      className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50"
      initial={{ opacity: 0, x: 50 }}
      animate={{ 
        opacity: isVisible ? 1 : 0, 
        x: isVisible ? 0 : 50,
        pointerEvents: isVisible ? 'auto' : 'none'
      }}
      transition={{ duration: 0.3 }}
    >
      {/* Main scroll line */}
      <div className="relative w-1 h-32 bg-white/20 rounded-full overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 w-full bg-gradient-to-b from-[#6c5ce7] to-[#fd79a8] rounded-full"
          style={{
            height: progressHeight
          }}
        />
      </div>
    </motion.div>
  );
};

export default ScrollIndicator;

