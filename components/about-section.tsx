"use client";

import { useRef, useEffect, useState } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

// Counter Animation Component
const AnimatedCounter = ({ end, duration = 2000, suffix = "" }: { end: number; duration?: number; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let startTime: number;
      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);
        
        setCount(Math.floor(progress * end));
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
    }
  }, [isInView, end, duration]);

  return (
    <div ref={ref} className="text-4xl md:text-5xl font-bold text-[#6c5ce7]">
      {count}{suffix}
    </div>
  );
};

// Star Rating Component
const StarRating = ({ rating = 5 }: { rating?: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="flex justify-center gap-1">
      {[...Array(5)].map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0, rotate: -180 }}
          animate={isInView ? { 
            opacity: index < rating ? 1 : 0.3, 
            scale: 1, 
            rotate: 0 
          } : {}}
          transition={{ 
            delay: index * 0.1,
            duration: 0.5,
            type: "spring",
            stiffness: 200
          }}
          className="text-3xl md:text-4xl text-yellow-400"
        >
          ⭐
        </motion.div>
      ))}
    </div>
  );
};

const AboutSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["100px", "-100px"]);

  const textSections = [
    {
      title: "Who We Are",
      content: "We are a boutique web design and development agency focused on creating high-impact digital experiences. At Prestige Websites, every website is thoughtfully built to match your brand, connect with your audience, and drive long-term growth.Our clients range from ambitious startups to established businesses that understand how powerful a strong online presence can be when done right."
    },
    {
      title: "Why Choose Us",
      content: "We combine sharp design, smart strategy, and performance-first development to create websites that don’t just look great — they deliver measurable results. Our process is detail- driven and intentional, with every decision based on your business goals, your users, and how to turn attention into action.From the structure and layout to the tiniest animations, everything is crafted with purpose. We go beyond launch — continuously optimizing your site, improving performance, enhancing user experience, and adapting to your growth so your website keeps delivering long after it’s live. This isn’t just web design.It’s a long - term digital asset built to grow your business."
    },
    {
      title: "Strategic SEO Built for Growth",
      content: "Having a great website means nothing if no one sees it. That’s why SEO isn’t an add-on in our process — it’s built into the foundation of every project we take on. Search Engine Optimization(SEO) is what helps your website rank higher on Google and other search engines when potential customers search for the products or services you offer.Without it, your site is just another invisible page on the internet.With it, your business becomes discoverable, trusted, and chosen. We go far beyond basic keyword stuffing.Our SEO approach is data- driven, strategic, and constantly evolving.We have specialists who track, analyze, and refine your SEO performance every single month — monitoring traffic patterns, studying user behavior, reviewing ranking positions, and adjusting content and structure based on real results. This means your site doesn’t just launch optimized — it stays optimized."
    },
    {
      title: "What We Value",
      content: "We value transparency in every step of the process — from open communication and clear timelines to honest feedback and accountability. We prioritize performance by building fast, responsive, and conversion-focused websites backed by data and real-world results. Collaboration is at the core of how we work; your vision and goals guide every decision we make. And above all, we value quality — no shortcuts, no compromises, just work we’re proud to stand behind."
    }
  ];

  return (
    <section id="about" ref={containerRef} className="relative py-20 lg:py-32 bg-white overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#6c5ce7] rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#fd79a8] rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.h2 
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-[#2d3436] mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
          >
            About <span className="bg-gradient-to-r from-[#6c5ce7] to-[#fd79a8] bg-clip-text text-transparent">Us</span>
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: "100px" } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="h-1 bg-gradient-to-r from-[#6c5ce7] to-[#fd79a8] mx-auto rounded-full"
          />
        </motion.div>

        {/* Main Content Grid */}
        <div className="space-y-16 lg:space-y-24 mb-20">
          {/* Who We Are - Full Width */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-[#2d3436] mb-6 hover:text-[#6c5ce7] transition-colors duration-300">
              {textSections[0].title}
            </h3>
            <p className="text-lg text-[#555] leading-relaxed">
              {textSections[0].content}
            </p>
          </motion.div>

          {/* Why Choose Us - Two Column Layout with Image */}
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <h3 className="text-2xl md:text-3xl font-bold text-[#2d3436] mb-6 hover:text-[#6c5ce7] transition-colors duration-300">
                {textSections[1].title}
              </h3>
              <p className="text-lg text-[#555] leading-relaxed">
                {textSections[1].content}
              </p>
            </motion.div>

            {/* Logo Visual */}
            <motion.div
              style={{ y }}
              className="lg:col-span-1 relative h-96 lg:h-[500px] flex items-center justify-center"
            >
              {/* Animated Liquid Background */}
              <div className="absolute inset-0 overflow-hidden rounded-full">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"
                  animate={{
                    background: [
                      "radial-gradient(circle at 20% 50%, #000000 0%, #1a1a1a 25%, #000000 50%)",
                      "radial-gradient(circle at 80% 20%, #000000 0%, #2a2a2a 25%, #000000 50%)",
                      "radial-gradient(circle at 40% 80%, #000000 0%, #1a1a1a 25%, #000000 50%)",
                      "radial-gradient(circle at 60% 30%, #000000 0%, #2a2a2a 25%, #000000 50%)",
                      "radial-gradient(circle at 20% 50%, #000000 0%, #1a1a1a 25%, #000000 50%)"
                    ]
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  style={{
                    borderRadius: "50%",
                    filter: "blur(1px)"
                  }}
                />
                
                {/* Liquid Blob Effects */}
                <motion.div
                  className="absolute w-32 h-32 bg-gradient-to-r from-gray-800 to-gray-700 rounded-full opacity-60"
                  animate={{
                    x: ["-20px", "20px", "-20px"],
                    y: ["-10px", "10px", "-10px"],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  style={{
                    top: "20%",
                    left: "15%",
                    filter: "blur(2px)"
                  }}
                />
                
                <motion.div
                  className="absolute w-24 h-24 bg-gradient-to-r from-gray-700 to-gray-600 rounded-full opacity-50"
                  animate={{
                    x: ["15px", "-15px", "15px"],
                    y: ["10px", "-10px", "10px"],
                    scale: [1.1, 0.9, 1.1]
                  }}
                  transition={{
                    duration: 7,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                  }}
                  style={{
                    bottom: "25%",
                    right: "20%",
                    filter: "blur(1.5px)"
                  }}
                />
                
                <motion.div
                  className="absolute w-20 h-20 bg-gradient-to-r from-gray-600 to-gray-500 rounded-full opacity-40"
                  animate={{
                    x: ["-10px", "25px", "-10px"],
                    y: ["15px", "-5px", "15px"],
                    scale: [0.8, 1.3, 0.8]
                  }}
                  transition={{
                    duration: 9,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2
                  }}
                  style={{
                    top: "60%",
                    left: "70%",
                    filter: "blur(2.5px)"
                  }}
                />
              </div>

              {/* Background Circle */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={isInView ? { scale: 1, opacity: 1 } : {}}
                transition={{ duration: 1, delay: 0.5 }}
                className="relative w-80 h-80 bg-gradient-to-br from-[#6c5ce7]/10 to-[#fd79a8]/10 rounded-full flex items-center justify-center border border-[#6c5ce7]/20 z-10"
              >
                {/* Company Logo */}
                <motion.img
                  src="https://assets.macaly-user-data.dev/kffp567qe9h57rg2vr1rolyc/rpcf7gb6yvup5eoym6i0lkst/VmeeKkdrXUNxDptLkJ4XO/logo-prestige-websites-removebg-preview.png"
                  alt="Prestige Websites Logo"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={isInView ? { scale: 1, rotate: 0 } : {}}
                  transition={{ duration: 1, delay: 0.8, type: "spring", stiffness: 200 }}
                  className="w-32 h-32 object-contain"
                />
                
                {/* Animated Ring */}
                <motion.div
                  className="absolute inset-0 border-2 border-[#6c5ce7]/30 rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                />
                
                {/* Pulse Effect */}
                <motion.div
                  className="absolute inset-0 border border-[#fd79a8]/40 rounded-full"
                  animate={{ 
                    scale: [1, 1.1, 1],
                    opacity: [0.3, 0.6, 0.3]
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                />
              </motion.div>
              
              {/* Floating Cards */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 1, duration: 0.8 }}
                className="absolute top-10 -left-4 bg-white/90 backdrop-blur-md rounded-2xl p-4 shadow-2xl border border-[#6c5ce7]/20"
              >
                <div className="text-2xl font-bold text-[#6c5ce7]">60+</div>
                <div className="text-sm text-gray-600">Projects</div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 1.3, duration: 0.8 }}
                className="absolute bottom-10 -right-4 bg-white/90 backdrop-blur-md rounded-2xl p-4 shadow-2xl border border-[#fd79a8]/20"
              >
                <div className="text-2xl font-bold text-[#fd79a8]">40+</div>
                <div className="text-sm text-gray-600">Countries</div>
              </motion.div>
            </motion.div>
          </div>

          {/* Strategic SEO Built for Growth - Full Width */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-[#2d3436] mb-6 hover:text-[#6c5ce7] transition-colors duration-300">
              {textSections[2].title}
            </h3>
            <p className="text-lg text-[#555] leading-relaxed">
              {textSections[2].content}
            </p>
          </motion.div>

          {/* What We Value - Full Width */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-[#2d3436] mb-6 hover:text-[#6c5ce7] transition-colors duration-300">
              {textSections[3].title}
            </h3>
            <p className="text-lg text-[#555] leading-relaxed">
              {textSections[3].content}
            </p>
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 max-w-5xl mx-auto"
        >
          {/* Websites Launched */}
          <motion.div
            whileHover={{ scale: 1.05, y: -10 }}
            className="bg-gradient-to-br from-white to-[#f5f6fa] rounded-3xl p-8 text-center shadow-2xl border border-gray-100 hover:shadow-3xl transition-all duration-500"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ delay: 2, type: "spring", stiffness: 200 }}
              className="w-16 h-16 bg-gradient-to-r from-[#6c5ce7] to-[#a29bfe] rounded-2xl flex items-center justify-center mx-auto mb-6"
            >
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
              </svg>
            </motion.div>
            <AnimatedCounter end={60} suffix="+" />
            <div className="text-lg text-[#777] font-medium mt-2">Websites Launched</div>
          </motion.div>

          {/* Client Rating */}
          <motion.div
            whileHover={{ scale: 1.05, y: -10 }}
            className="bg-gradient-to-br from-white to-[#f5f6fa] rounded-3xl p-8 text-center shadow-2xl border border-gray-100 hover:shadow-3xl transition-all duration-500"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ delay: 2.2, type: "spring", stiffness: 200 }}
              className="w-16 h-16 bg-gradient-to-r from-[#fd79a8] to-[#e66797] rounded-2xl flex items-center justify-center mx-auto mb-6"
            >
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </motion.div>
            <StarRating rating={5} />
            <div className="text-lg text-[#777] font-medium mt-2">Client Rating</div>
          </motion.div>

          {/* Countries */}
          <motion.div
            whileHover={{ scale: 1.05, y: -10 }}
            className="bg-gradient-to-br from-white to-[#f5f6fa] rounded-3xl p-8 text-center shadow-2xl border border-gray-100 hover:shadow-3xl transition-all duration-500"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ delay: 2.4, type: "spring", stiffness: 200 }}
              className="w-16 h-16 bg-gradient-to-r from-[#a29bfe] to-[#6c5ce7] rounded-2xl flex items-center justify-center mx-auto mb-6"
            >
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </motion.div>
            <AnimatedCounter end={40} suffix="+" />
            <div className="text-lg text-[#777] font-medium mt-2">Countries</div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;

