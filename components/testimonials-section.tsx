"use client";

import { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/language-context';

// Animated Star Rating
const AnimatedStarRating = ({ rating, delay = 0 }: { rating: number; delay?: number }) => {
  const [animatedRating, setAnimatedRating] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedRating(rating);
    }, delay);
    return () => clearTimeout(timer);
  }, [rating, delay]);

  return (
    <div className="flex gap-1 justify-center mb-4">
      {[...Array(5)].map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0, rotate: -180 }}
          animate={{ 
            opacity: index < animatedRating ? 1 : 0.3,
            scale: index < animatedRating ? 1 : 0.8,
            rotate: 0
          }}
          transition={{ 
            delay: index * 0.1,
            duration: 0.5,
            type: "spring",
            stiffness: 200
          }}
          whileHover={{ scale: 1.2, rotate: 360 }}
          className="text-2xl cursor-pointer"
        >
          ⭐
        </motion.div>
      ))}
    </div>
  );
};

// Testimonial Card Component
const TestimonialCard = ({ 
  testimonial, 
  index, 
  isActive, 
  isInView 
}: { 
  testimonial: any; 
  index: number; 
  isActive: boolean;
  isInView: boolean;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotateY: -30 }}
      animate={isInView ? { 
        opacity: isActive ? 1 : 0.7, 
        y: 0, 
        rotateY: 0,
        scale: isActive ? 1 : 0.9
      } : {}}
      transition={{ 
        delay: index * 0.1,
        duration: 0.8,
        type: "spring",
        stiffness: 100
      }}
      whileHover={{ 
        scale: 1.05,
        y: -10,
        rotateY: 5
      }}
      className={`relative bg-white/90 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-white/20 transition-all duration-500 ${
        isActive ? 'ring-2 ring-[#6c5ce7]/30' : ''
      }`}
      style={{ 
        minHeight: '300px',
        perspective: "1000px"
      }}
    >
      {/* Quote Icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ delay: index * 0.1 + 0.3, type: "spring" }}
        className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-r from-[#6c5ce7] to-[#fd79a8] rounded-full flex items-center justify-center shadow-lg"
      >
        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
        </svg>
      </motion.div>

      {/* Star Rating */}
      <AnimatedStarRating rating={testimonial.rating} delay={index * 100 + 500} />

      {/* Comment */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: index * 0.1 + 0.6 }}
        className="text-[#555] text-lg leading-relaxed mb-6 italic font-medium"
      >
        "{testimonial.comment}"
      </motion.p>

      {/* Author */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: index * 0.1 + 0.8 }}
        className="flex items-center gap-4"
      >
        <motion.div
          whileHover={{ scale: 1.1 }}
          className="w-12 h-12 bg-gradient-to-r from-[#6c5ce7] to-[#fd79a8] rounded-full flex items-center justify-center text-white font-bold text-lg"
        >
          {testimonial.name.charAt(0)}
        </motion.div>
        <div>
          <div className="font-bold text-[#2d3436] text-lg">{testimonial.name}</div>
          <div className="text-[#777] text-sm">{testimonial.position || 'Valued Client'}</div>
        </div>
      </motion.div>

      {/* Decorative Elements */}
      <motion.div
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{ 
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute -bottom-2 -right-2 w-20 h-20 bg-gradient-to-br from-[#fd79a8]/20 to-[#6c5ce7]/20 rounded-full blur-xl"
      />
    </motion.div>
  );
};

const TestimonialsSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [currentIndex, setCurrentIndex] = useState(0);
  const { t } = useLanguage();

  const testimonials = [
    {
      name: t('testimonials.client1.name'),
      position: t('testimonials.client1.role'),
      rating: 5,
      comment: t('testimonials.client1.content')
    },
    {
      name: t('testimonials.client2.name'),
      position: t('testimonials.client2.role'),
      rating: 5,
      comment: t('testimonials.client2.content')
    },
    {
      name: t('testimonials.client3.name'),
      position: t('testimonials.client3.role'),
      rating: 5,
      comment: t('testimonials.client3.content')
    }
  ];

  // Navigation functions
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % Math.ceil(testimonials.length / 3));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + Math.ceil(testimonials.length / 3)) % Math.ceil(testimonials.length / 3));
  };

  const visibleTestimonials = testimonials.slice(currentIndex * 3, (currentIndex * 3) + 3);

  return (
    <section id="testimonials" ref={containerRef} className="relative py-20 lg:py-32 bg-gradient-to-br from-[#2d3436] to-[#1e272e] overflow-hidden">
      {/* Animated CSS Background */}
      <div className="absolute inset-0 opacity-20">
        {/* Floating stars effect with CSS */}
        <div className="absolute inset-0">
          {[...Array(100)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-yellow-300/30 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            />
          ))}
        </div>
        
        {/* Floating golden orbs */}
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute w-6 h-6 bg-yellow-400/20 rounded-full blur-sm animate-bounce"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + Math.sin(i) * 20}%`,
              animationDelay: `${i * 0.3}s`,
              animationDuration: `${3 + i * 0.3}s`
            }}
          />
        ))}
      </div>

      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-[#6c5ce7]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-[#fd79a8]/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-[#6c5ce7]/5 to-[#fd79a8]/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.h2 
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
          >
            {t('testimonials.title')}
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl text-white/80 max-w-3xl mx-auto mb-8"
          >
            {t('testimonials.subtitle')}
          </motion.p>

          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: "120px" } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="h-1 bg-gradient-to-r from-[#6c5ce7] to-[#fd79a8] mx-auto rounded-full"
          />
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 mb-12">
          <AnimatePresence mode="wait">
            {visibleTestimonials.map((testimonial, index) => (
              <TestimonialCard
                key={`${currentIndex}-${index}`}
                testimonial={testimonial}
                index={index}
                isActive={true}
                isInView={isInView}
              />
            ))}
          </AnimatePresence>
        </div>

        {/* Navigation Arrows */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1.5 }}
          className="flex justify-center items-center gap-8 mb-16"
        >
          {/* Previous Arrow */}
          <motion.button
            onClick={prevSlide}
            whileHover={{ scale: 1.1, x: -5 }}
            whileTap={{ scale: 0.9 }}
            className="group p-4 bg-white/10 backdrop-blur-md rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300"
          >
            <svg 
              className="w-6 h-6 text-white group-hover:text-[#6c5ce7] transition-colors duration-300" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </motion.button>

          {/* Navigation Dots */}
          <div className="flex gap-3">
            {[...Array(Math.ceil(testimonials.length / 3))].map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setCurrentIndex(index)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentIndex === index 
                    ? 'bg-gradient-to-r from-[#6c5ce7] to-[#fd79a8] w-8' 
                    : 'bg-white/30 hover:bg-white/50'
                }`}
              />
            ))}
          </div>

          {/* Next Arrow */}
          <motion.button
            onClick={nextSlide}
            whileHover={{ scale: 1.1, x: 5 }}
            whileTap={{ scale: 0.9 }}
            className="group p-4 bg-white/10 backdrop-blur-md rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300"
          >
            <svg 
              className="w-6 h-6 text-white group-hover:text-[#6c5ce7] transition-colors duration-300" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.button>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 2, duration: 0.8 }}
          className="text-center"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block"
          >
            <button
              onClick={() => window.open('https://maps.app.goo.gl/3qtnYprM5AaWbqRw8?g_st=ipc', '_blank')}
              className="group px-12 py-4 bg-gradient-to-r from-[#fd79a8] to-[#e66797] text-white rounded-full font-bold text-lg hover:shadow-2xl transition-all duration-500 relative overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-[#6c5ce7] to-[#5649c0] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>
              <span className="relative z-10 flex items-center gap-3">
                Leave a Review
                <motion.svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </motion.svg>
              </span>
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;

