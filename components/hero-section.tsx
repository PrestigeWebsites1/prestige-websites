

"use client";

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useLanguage } from '@/contexts/language-context';

// Typewriter Effect Component
const TypewriterText = ({ text, delay = 0 }: { text: string; delay?: number }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentIndex < text.length) {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }
    }, currentIndex === 0 ? delay : 80); // Slightly slower for better readability

    return () => clearTimeout(timer);
  }, [currentIndex, text, delay]);

  return (
    <span className="inline-block">
      {displayText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
        className="inline-block w-0.5 h-8 bg-white ml-1"
      />
    </span>
  );
};

// Code snippets that will be typed
const codeSnippets = [
  "const createMagic = () => {",
  "  const vision = 'extraordinary';",
  "  const passion = 'unlimited';",
  "  const result = vision + passion;",
  "  return result;",
  "};",
  "",
  "// Building digital dreams...",
  "function buildWebsite() {",
  "  const creativity = new Design();",
  "  const technology = new Code();",
  "  return creativity.merge(technology);",
  "}"
];

// Animated Code Background Component
const AnimatedCodeBackground = () => {
  const [visibleLines, setVisibleLines] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [codeOpacity, setCodeOpacity] = useState(1);
  const [showSpheres, setShowSpheres] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 1200, height: 800 });

  // Handle window dimensions safely
  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    if (currentLineIndex >= codeSnippets.length) {
      // Code typing finished, start fade out after a brief pause
      const timer = setTimeout(() => {
        setCodeOpacity(0);
        // Show spheres after code starts fading
        setTimeout(() => {
          setShowSpheres(true);
        }, 500);
      }, 1200);
      return () => clearTimeout(timer);
    }

    const currentLine = codeSnippets[currentLineIndex];
    
    if (currentCharIndex <= currentLine.length) {
      const timer = setTimeout(() => {
        setVisibleLines(prev => {
          const newLines = [...prev];
          newLines[currentLineIndex] = currentLine.slice(0, currentCharIndex);
          return newLines;
        });
        setCurrentCharIndex(prev => prev + 1);
      }, currentCharIndex === 0 ? 200 : 5);

      return () => clearTimeout(timer);
    } else {
      // Line complete, move to next
      const timer = setTimeout(() => {
        setCurrentLineIndex(prev => prev + 1);
        setCurrentCharIndex(0);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [currentLineIndex, currentCharIndex]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Code Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0f0f23] via-[#1a1a2e] to-[#16213e] opacity-90">
        <motion.div 
          className="absolute top-24 left-8 font-mono text-xs md:text-sm text-green-400/80 leading-relaxed"
          animate={{ opacity: codeOpacity }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        >
          {visibleLines.map((line, index) => (
            <div key={index} className="flex items-center">
              <span className="text-gray-500 mr-4 select-none">{String(index + 1).padStart(2, '0')}</span>
              <span>{line}</span>
              {index === currentLineIndex && currentCharIndex <= codeSnippets[currentLineIndex]?.length && (
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  className="inline-block w-2 h-4 bg-green-400 ml-1"
                />
              )}
            </div>
          ))}
        </motion.div>
      </div>

      {/* Floating Spheres - appear after code finishes */}
      {showSpheres && (
        <div className="absolute inset-0">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ 
                opacity: 0,
                scale: 0,
                x: Math.random() * dimensions.width,
                y: Math.random() * dimensions.height
              }}
              animate={{ 
                opacity: 0.9,
                scale: 1,
                x: Math.random() * dimensions.width,
                y: Math.random() * dimensions.height
              }}
              transition={{
                opacity: { duration: 1.5, ease: "easeOut" },
                scale: { duration: 1.5, ease: "easeOut" },
                x: {
                  duration: 20 + Math.random() * 10,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: i * 0.2,
                  ease: "easeInOut"
                },
                y: {
                  duration: 15 + Math.random() * 10,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: i * 0.2,
                  ease: "easeInOut"
                }
              }}
              className="absolute w-3 h-3 md:w-4 md:h-4 bg-white rounded-full will-change-transform"
              style={{
                boxShadow: '0 0 25px rgba(255, 255, 255, 0.8), 0 0 40px rgba(255, 255, 255, 0.4)',
                transform: 'translate3d(0, 0, 0)'
              }}
            />
          ))}
          
          {/* Larger accent spheres */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={`large-${i}`}
              initial={{ 
                opacity: 0,
                scale: 0,
                x: Math.random() * dimensions.width,
                y: Math.random() * dimensions.height
              }}
              animate={{ 
                opacity: 0.7,
                scale: 1.2,
                x: Math.random() * dimensions.width,
                y: Math.random() * dimensions.height
              }}
              transition={{
                opacity: { duration: 2, ease: "easeOut" },
                scale: { duration: 2, ease: "easeOut" },
                x: {
                  duration: 25 + Math.random() * 15,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: i * 0.3,
                  ease: "easeInOut"
                },
                y: {
                  duration: 20 + Math.random() * 15,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: i * 0.3,
                  ease: "easeInOut"
                }
              }}
              className="absolute w-5 h-5 md:w-6 md:h-6 bg-gradient-to-r from-white to-blue-200 rounded-full will-change-transform"
              style={{
                boxShadow: '0 0 30px rgba(255, 255, 255, 0.9), 0 0 50px rgba(255, 255, 255, 0.5), 0 0 70px rgba(173, 216, 230, 0.3)',
                transform: 'translate3d(0, 0, 0)'
              }}
            />
          ))}
        </div>
      )}

      {/* Matrix-style falling characters */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`matrix-${i}`}
            initial={{ y: -100, opacity: 0 }}
            animate={{ 
              y: dimensions.height + 100,
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "linear"
            }}
            className="absolute text-green-400/30 font-mono text-xs"
            style={{ left: `${Math.random() * 100}%` }}
          >
            {String.fromCharCode(33 + Math.random() * 94)}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  const { t } = useLanguage();

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Epic Animated Code Background */}
      <AnimatedCodeBackground />

      {/* Gradient Overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40 z-10" />
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 via-transparent to-blue-900/20 z-10" />

      {/* Content */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-20 text-center text-white px-6 max-w-6xl mx-auto pt-20 md:pt-0"
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2 }} // Delay to let code animation start first
          className="space-y-8"
        >
          {/* Main Heading */}
          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 3 }}
          >
            {(() => {
              const { language } = useLanguage();
              const words = t('hero.title').split(' ');
              
              if (language === 'al') {
                // For Albanian, apply gradient to both "kryeveprave" and the last word
                return words.map((word, index) => {
                  const isKryeveprave = word.toLowerCase() === 'kryeveprave';
                  const isLastWord = index === words.length - 1;
                  
                  if (isKryeveprave || isLastWord) {
                    return (
                      <motion.span
                        key={index}
                        className="bg-gradient-to-r from-[#ff6b9d] via-[#ffd93d] to-[#a8e6cf] bg-clip-text text-transparent bg-size-200 animate-gradient-x"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 2, delay: 4 }}
                      >
                        {word}{index < words.length - 1 ? ' ' : ''}
                      </motion.span>
                    );
                  }
                  
                  return (
                    <span key={index}>
                      {word}{index < words.length - 1 ? ' ' : ''}
                    </span>
                  );
                });
              } else {
                // For other languages, apply gradient only to the last word
                return (
                  <>
                    <span>{words.slice(0, -1).join(' ')} </span>
                    <motion.span
                      className="bg-gradient-to-r from-[#ff6b9d] via-[#ffd93d] to-[#a8e6cf] bg-clip-text text-transparent bg-size-200 animate-gradient-x"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 2, delay: 4 }}
                    >
                      {words.slice(-1)[0]}
                    </motion.span>
                  </>
                );
              }
            })()}
          </motion.h1>

          {/* Subtitle with typewriter effect */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 4 }}
            className="text-xl md:text-2xl lg:text-3xl font-light mb-8"
          >
            <TypewriterText 
              text={t('hero.subtitle')} 
              delay={5500}
            />
          </motion.div>

          {/* Enhanced CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 5.5 }}
          >
            <motion.button
              onClick={() => scrollToSection('contact')}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(253, 121, 168, 0.4)"
              }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-12 py-4 bg-white/10 backdrop-blur-md text-white rounded-full font-bold text-lg md:text-xl overflow-hidden transition-all duration-300 border border-white/20 hover:border-white/40"
            >
              <motion.span 
                className="absolute inset-0 bg-gradient-to-r from-[#fd79a8] to-[#6c5ce7] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                whileHover={{ scale: 1 }}
              />
              <span className="relative z-10 flex items-center gap-3">
                {t('hero.cta')}
                <motion.svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </motion.svg>
              </span>
            </motion.button>
          </motion.div>

          {/* Enhanced Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 6 }}
            className="flex flex-wrap justify-center gap-8 mt-16"
          >
            {[
              { number: "60+", label: (() => {
                const { language } = useLanguage();
                return language === 'al' ? 'Website të Krijuara' : 'Websites Launched';
              })() },
              { number: "5★", label: (() => {
                const { language } = useLanguage();
                return language === 'al' ? 'Vlerësimi i Klientit' : 'Client Rating';
              })() },
              { number: "40+", label: (() => {
                const { language } = useLanguage();
                return language === 'al' ? 'Shtete' : 'Countries';
              })() }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 6.5 + index * 0.2 }}
                whileHover={{ scale: 1.1, y: -5 }}
                className="bg-white/5 backdrop-blur-md rounded-2xl px-6 py-4 border border-white/10 hover:border-white/20 transition-all duration-300"
              >
                <div className="text-2xl md:text-3xl font-bold text-[#fd79a8]">{stat.number}</div>
                <div className="text-sm md:text-base text-white/80">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Enhanced Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 7 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
      >
        <motion.button
          onClick={() => scrollToSection('about')}
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          whileHover={{ scale: 1.2 }}
          className="text-white/70 hover:text-white transition-colors duration-300 p-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.button>
      </motion.div>
    </section>
  );
};

export default HeroSection;

