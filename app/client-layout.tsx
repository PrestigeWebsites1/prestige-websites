"use client";

import { useState } from 'react';
import LoadingAnimation from '../components/loading-animation';
import Navigation from '../components/navigation';
import HeroSection from '../components/hero-section';
import AboutSection from '../components/about-section';
import PortfolioSection from '../components/portfolio-section';
import TestimonialsSection from '../components/testimonials-section';
import ContactSection from '../components/contact-section';
import Footer from '../components/footer';
import ScrollIndicator from '../components/scroll-indicator';

interface ClientLayoutProps {
  children: React.ReactNode;
}

const ClientLayout = ({ children }: ClientLayoutProps) => {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <>
      <LoadingAnimation onComplete={handleLoadingComplete} />
      
      {!isLoading && (
        <div className="min-h-screen">
          <Navigation />
          <HeroSection />
          <AboutSection />
          <PortfolioSection />
          <TestimonialsSection />
          <ContactSection />
          <Footer />
          <ScrollIndicator />
        </div>
      )}
    </>
  );
};

export default ClientLayout;
