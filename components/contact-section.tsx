
"use client";

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

// 3D Contact Orbs
function ContactOrbs() {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
        <Sphere args={[1, 64, 64]} position={[-3, 2, 0]}>
          <MeshDistortMaterial
            color="#6c5ce7"
            attach="material"
            distort={0.4}
            speed={2}
            roughness={0.1}
            metalness={0.8}
            transparent
            opacity={0.8}
          />
        </Sphere>
      </Float>
      
      <Float speed={2} rotationIntensity={1.5} floatIntensity={1.5}>
        <Sphere args={[0.8, 64, 64]} position={[3, -1, -2]}>
          <MeshDistortMaterial
            color="#fd79a8"
            attach="material"
            distort={0.3}
            speed={1.5}
            roughness={0.1}
            metalness={0.9}
            transparent
            opacity={0.7}
          />
        </Sphere>
      </Float>
      
      <Float speed={1.8} rotationIntensity={0.8} floatIntensity={2.5}>
        <Sphere args={[0.6, 64, 64]} position={[0, -2, 1]}>
          <MeshDistortMaterial
            color="#a29bfe"
            attach="material"
            distort={0.5}
            speed={2.5}
            roughness={0.2}
            metalness={0.7}
            transparent
            opacity={0.6}
          />
        </Sphere>
      </Float>
    </group>
  );
}

// Contact Item Component
const ContactItem = ({ 
  icon, 
  title, 
  content, 
  link, 
  index, 
  isInView 
}: { 
  icon: React.ReactNode; 
  title: string; 
  content: string; 
  link: string; 
  index: number; 
  isInView: boolean;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    if (link.startsWith('mailto:') || link.startsWith('tel:')) {
      window.location.href = link;
    } else {
      window.open(link, '_blank');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotateX: -30 }}
      animate={isInView ? { 
        opacity: 1, 
        y: 0, 
        rotateX: 0 
      } : {}}
      transition={{ 
        delay: index * 0.2,
        duration: 0.8,
        type: "spring",
        stiffness: 100
      }}
      whileHover={{ 
        y: -15, 
        scale: 1.05,
        rotateY: 5
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={handleClick}
      className="group relative bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 cursor-pointer transition-all duration-500 hover:bg-white/20 hover:border-white/40"
      style={{ perspective: "1000px" }}
    >
      {/* Icon Container */}
      <motion.div
        animate={isHovered ? { 
          scale: 1.2, 
          rotate: 360 
        } : { 
          scale: 1, 
          rotate: 0 
        }}
        transition={{ duration: 0.6 }}
        className="w-16 h-16 bg-gradient-to-r from-[#6c5ce7] to-[#fd79a8] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl"
      >
        <div className="text-white text-2xl">
          {icon}
        </div>
      </motion.div>

      {/* Title */}
      <motion.h3
        animate={isHovered ? { y: -2 } : { y: 0 }}
        className="text-xl font-bold text-white mb-3 text-center group-hover:text-[#fd79a8] transition-colors duration-300"
      >
        {title}
      </motion.h3>

      {/* Content */}
      <motion.p
        animate={isHovered ? { y: -2 } : { y: 0 }}
        transition={{ delay: 0.05 }}
        className="text-white/80 text-center font-medium break-words group-hover:text-white transition-colors duration-300"
      >
        {content}
      </motion.p>

      {/* Hover Effect Overlay */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isHovered ? { 
          opacity: 1, 
          scale: 1 
        } : { 
          opacity: 0, 
          scale: 0.8 
        }}
        className="absolute inset-0 bg-gradient-to-br from-[#6c5ce7]/20 to-[#fd79a8]/20 rounded-3xl blur-xl"
      />

      {/* Decorative Elements */}
      <motion.div
        animate={isHovered ? { 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3]
        } : {}}
        transition={{ 
          duration: 2,
          repeat: isHovered ? Infinity : 0,
          ease: "easeInOut"
        }}
        className="absolute -top-2 -right-2 w-16 h-16 bg-gradient-to-br from-[#fd79a8]/30 to-[#6c5ce7]/30 rounded-full blur-xl"
      />
      
      <motion.div
        animate={isHovered ? { 
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.4, 0.2]
        } : {}}
        transition={{ 
          duration: 2.5,
          repeat: isHovered ? Infinity : 0,
          ease: "easeInOut",
          delay: 0.5
        }}
        className="absolute -bottom-2 -left-2 w-12 h-12 bg-gradient-to-br from-[#a29bfe]/30 to-[#6c5ce7]/30 rounded-full blur-xl"
      />
    </motion.div>
  );
};

const ContactSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const contactItems = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: "Email Us",
      content: "officialprestigewebsites@gmail.com",
      link: "mailto:officialprestigewebsites@gmail.com"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      ),
      title: "Instagram",
      content: "@prestige_websites",
      link: "https://www.instagram.com/prestige_websites?igsh=MWtwdGR3aGg4ZmtkbQ%3D%3D&utm_source=qr"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
        </svg>
      ),
      title: "TikTok",
      content: "@prestigewebsites",
      link: "https://www.tiktok.com/@prestigewebsites?_t=ZM-8yUm7EJ3g5G&_r=1"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
        </svg>
      ),
      title: "WhatsApp",
      content: "+355 69 295 3131",
      link: "https://wa.me/355692953131"
    }
  ];

  return (
    <section id="contact" ref={containerRef} className="relative py-20 lg:py-32 bg-gradient-to-br from-[#2d3436] to-[#1e272e] overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 opacity-30">
        <Canvas camera={{ position: [0, 0, 8], fov: 75 }}>
          <ambientLight intensity={0.4} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#6c5ce7" />
          <pointLight position={[-10, -10, -10]} intensity={0.8} color="#fd79a8" />
          <pointLight position={[0, 10, -10]} intensity={0.6} color="#a29bfe" />
          <ContactOrbs />
        </Canvas>
      </div>

      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#6c5ce7]/5 via-transparent to-[#fd79a8]/5"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#6c5ce7]/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#fd79a8]/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
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
            Get In <span className="bg-gradient-to-r from-[#6c5ce7] to-[#fd79a8] bg-clip-text text-transparent">Touch</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl text-white/80 max-w-3xl mx-auto mb-8"
          >
            Ready to elevate your digital presence? Contact us today for a free consultation and let's create something extraordinary together.
          </motion.p>

          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: "120px" } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="h-1 bg-gradient-to-r from-[#6c5ce7] to-[#fd79a8] mx-auto rounded-full"
          />
        </motion.div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-20">
          {contactItems.map((item, index) => (
            <ContactItem
              key={index}
              icon={item.icon}
              title={item.title}
              content={item.content}
              link={item.link}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="text-center"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block"
          >
            <button
              onClick={() => window.location.href = 'mailto:officialprestigewebsites@gmail.com'}
              className="group px-12 py-4 bg-gradient-to-r from-[#6c5ce7] to-[#fd79a8] text-white rounded-full font-bold text-lg hover:shadow-2xl transition-all duration-500 relative overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-[#fd79a8] to-[#6c5ce7] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>
              <span className="relative z-10 flex items-center gap-3">
                Start Your Project Today
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

export default ContactSection;
