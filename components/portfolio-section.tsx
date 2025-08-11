"use client";

import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/language-context';
import { TranslationKey } from '@/translations';

// Portfolio Item Component
const PortfolioItem = ({ 
  project, 
  index, 
  isInView,
  t
}: { 
  project: any; 
  index: number; 
  isInView: boolean;
  t: (key: TranslationKey) => string;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotateY: -15 }}
      animate={isInView ? { 
        opacity: 1, 
        y: 0, 
        rotateY: 0 
      } : {}}
      transition={{ 
        delay: index * 0.2,
        duration: 0.8,
        type: "spring",
        stiffness: 100
      }}
      whileHover={{ 
        y: -20, 
        rotateY: 5,
        scale: 1.02
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative bg-white rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 transform-gpu"
      style={{ perspective: "1000px" }}
    >
      {/* Image Container */}
      <div className="relative h-64 overflow-hidden">
        {project.image ? (
          <motion.img
            src={project.image}
            alt={project.title}
            animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
            transition={{ duration: 0.6 }}
            className="w-full h-full object-cover"
          />
        ) : (
          <motion.div
            animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
            transition={{ duration: 0.6 }}
            className="w-full h-full bg-gradient-to-br from-[#6c5ce7] to-[#fd79a8] flex items-center justify-center"
          >
            <motion.div
              animate={isHovered ? { rotate: 360 } : { rotate: 0 }}
              transition={{ duration: 2, ease: "easeInOut" }}
              className="text-6xl text-white/80"
            >
              🌐
            </motion.div>
          </motion.div>
        )}
        
        {/* Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
          className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end justify-center pb-6"
        >
          <motion.button
            initial={{ y: 20, opacity: 0 }}
            animate={isHovered ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
            transition={{ delay: 0.1 }}
            onClick={() => window.open(project.link, '_blank')}
            className="px-6 py-2 bg-white/20 backdrop-blur-md rounded-full text-white font-semibold hover:bg-white/30 transition-all duration-300"
          >
            {t('portfolio.viewProject')} →
          </motion.button>
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-8">
        <motion.h3 
          className="text-2xl font-bold text-[#2d3436] mb-4 group-hover:text-[#6c5ce7] transition-colors duration-300"
          animate={isHovered ? { x: 5 } : { x: 0 }}
        >
          {project.title}
        </motion.h3>
        
        <motion.p 
          className="text-[#777] mb-6 leading-relaxed"
          animate={isHovered ? { x: 5 } : { x: 0 }}
          transition={{ delay: 0.05 }}
        >
          {project.description}
        </motion.p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.map((tag: string, tagIndex: number) => (
            <motion.span
              key={tagIndex}
              initial={{ opacity: 0, scale: 0 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: index * 0.2 + tagIndex * 0.1 + 0.5 }}
              whileHover={{ scale: 1.1 }}
              className="px-3 py-1 bg-gradient-to-r from-[#6c5ce7]/10 to-[#fd79a8]/10 text-[#6c5ce7] rounded-full text-sm font-medium border border-[#6c5ce7]/20 hover:border-[#6c5ce7]/40 transition-all duration-300"
            >
              {tag}
            </motion.span>
          ))}
        </div>

        {/* Action Button */}
        <motion.button
          onClick={() => window.open(project.link, '_blank')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full py-3 bg-gradient-to-r from-[#6c5ce7] to-[#fd79a8] text-white rounded-2xl font-semibold hover:shadow-lg transition-all duration-300 group-hover:shadow-2xl"
        >
          <span className="flex items-center justify-center gap-2">
            {t('portfolio.exploreProject')}
            <motion.svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              animate={isHovered ? { x: 5 } : { x: 0 }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </motion.svg>
          </span>
        </motion.button>
      </div>

      {/* Decorative Elements */}
      <motion.div
        animate={isHovered ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
        className="absolute -top-2 -right-2 w-20 h-20 bg-gradient-to-br from-[#fd79a8] to-[#6c5ce7] rounded-full blur-xl"
      />
      <motion.div
        animate={isHovered ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
        className="absolute -bottom-2 -left-2 w-16 h-16 bg-gradient-to-br from-[#a29bfe] to-[#6c5ce7] rounded-full blur-xl"
      />
    </motion.div>
  );
};

const PortfolioSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const { t } = useLanguage();

  const portfolioData = [
    {
      title: 'NeuralFlow AI',
      description: 'A cutting-edge AI platform featuring advanced neural networks and machine learning capabilities. Built with modern technologies for optimal performance and user experience.',
      tags: ['Next.js', 'TailwindCSS', 'TypeScript', 'AI/ML'],
      link: 'https://neuralflowai.vercel.app/',
      image: 'https://assets.macaly-user-data.dev/kffp567qe9h57rg2vr1rolyc/rpcf7gb6yvup5eoym6i0lkst/8PiAj4CTk4Na-Gt40epYF/neuralflowai.png'
    }
  ];

  return (
    <section id="portfolio" ref={containerRef} className="relative py-20 lg:py-32 bg-gradient-to-br from-[#f5f7fa] to-[#e4e8f0] overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-[#6c5ce7]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-[#fd79a8]/5 rounded-full blur-3xl"></div>
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
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-[#2d3436] mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
          >
            {t('portfolio.title')}
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl text-[#777] max-w-3xl mx-auto mb-8"
          >
            {t('portfolio.subtitle')}
          </motion.p>

          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: "120px" } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="h-1 bg-gradient-to-r from-[#6c5ce7] to-[#fd79a8] mx-auto rounded-full"
          />
        </motion.div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {portfolioData.map((project, index) => (
            <PortfolioItem
              key={index}
              project={project}
              index={index}
              isInView={isInView}
              t={t}
            />
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="text-center mt-20"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block"
          >
            <button
              onClick={() => {
                const element = document.getElementById('contact');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group px-12 py-4 bg-gradient-to-r from-[#6c5ce7] to-[#fd79a8] text-white rounded-full font-bold text-lg hover:shadow-2xl transition-all duration-500 relative overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-[#fd79a8] to-[#6c5ce7] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>
              <span className="relative z-10 flex items-center gap-3">
                {t('portfolio.startProject')}
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
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default PortfolioSection;
