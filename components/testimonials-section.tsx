


"use client";

import { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Float, Text3D, Center } from '@react-three/drei';
import * as THREE from 'three';

// 3D Floating Stars
function FloatingStars() {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      <Stars radius={50} depth={50} count={1000} factor={4} saturation={0} fade speed={1} />
      {[...Array(5)].map((_, i) => (
        <Float key={i} speed={2 + i * 0.3} rotationIntensity={1} floatIntensity={2}>
          <mesh position={[(i - 2) * 8, Math.sin(i) * 3, -10 + i * 2]}>
            <sphereGeometry args={[0.3]} />
            <meshStandardMaterial color="#FFD700" emissive="#FFD700" emissiveIntensity={0.5} />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

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

  const testimonials = [
    {
      name: "Eleanor Vance",
      position: "CEO, TechStart Inc.",
      rating: 5,
      comment: "Absolutely impressed with the design and functionality! My website exceeded my expectations and has significantly boosted my business growth. The attention to detail is remarkable."
    },
    {
      name: "Arthur Finch",
      position: "Marketing Director",
      rating: 5,
      comment: "Excellent SEO work that delivered real results. We've seen a 300% increase in organic traffic since Prestige Websites optimized our site. Their expertise is unmatched."
    },
    {
      name: "Victoria Sinclair",
      position: "Creative Director",
      rating: 5,
      comment: "The team is incredibly professional and attentive to every detail. They perfectly captured the essence of my brand and created something truly spectacular. Highly recommended!"
    },
    {
      name: "Edward Blackwood",
      position: "Business Owner",
      rating: 5,
      comment: "Impeccable service from start to finish. The design is modern, the navigation is intuitive, and the performance is outstanding. Our clients love the new website!"
    },
    {
      name: "Thomas Beckett",
      position: "E-commerce Manager",
      rating: 5,
      comment: "I am extremely happy with the final result. The site is lightning-fast, looks amazing on all devices, and our conversion rates have improved dramatically."
    },
    {
      name: "Henry Sterling",
      position: "Startup Founder",
      rating: 5,
      comment: "Prestige Websites completely transformed our online presence. Their SEO strategy is top-notch and their ongoing support has been invaluable to our success."
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
      {/* 3D Background */}
      <div className="absolute inset-0 opacity-20">
        <Canvas camera={{ position: [0, 0, 20], fov: 75 }}>
          <ambientLight intensity={0.3} />
          <pointLight position={[10, 10, 10]} intensity={0.8} color="#6c5ce7" />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#fd79a8" />
          <FloatingStars />
        </Canvas>
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
            Client <span className="bg-gradient-to-r from-[#6c5ce7] to-[#fd79a8] bg-clip-text text-transparent">Testimonials</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl text-white/80 max-w-3xl mx-auto mb-8"
          >
            Don't just take our word for it. Here's what our amazing clients have to say about their experience working with Prestige Websites.
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