import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { NavLink } from 'react-router-dom';

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
        const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
        setMousePosition({ x: x * 30, y: y * 30 });
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      return () => container.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      ref={containerRef}
      className="min-h-screen relative flex items-center justify-center bg-space-gradient overflow-hidden"
    >
      {/* Animated Background with floating elements */}
      <div className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute opacity-5 text-gold transition-all duration-1000"
            style={{
              left: `${10 + (i * 12)}%`,
              top: `${20 + (i * 8)}%`,
              transform: `translate(${mousePosition.x * (0.1 + i * 0.03)}px, ${mousePosition.y * (0.1 + i * 0.03)}px) rotate(${mousePosition.x * 0.3}deg)`,
            }}
          >
            <div className="w-20 h-20 border border-gold/10 rounded-xl backdrop-blur-sm flex items-center justify-center">
              <span className="text-2xl">⚡</span>
            </div>
          </div>
        ))}
      </div>

      {/* Content Container */}
      <div className="relative z-10 container-max section-padding w-full h-screen flex items-center">
        {/* Left Side - Text Content */}
        <div className="flex flex-col justify-center w-full lg:w-1/2 pr-0 lg:pr-12">
          <div className="animate-fade-in-up">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 leading-tight">
              From <span className="text-gradient">Vision</span> to{' '}
              <span className="text-gradient">Reality</span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-300 mb-4 max-w-lg">
              Everything Under One Roof
            </p>
            
            <p className="text-base text-gray-400 mb-8 max-w-lg">
              One-stop destination for space creation — from concept to completion. 
              Architecture, interiors, furniture, construction, and end-to-end support.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button 
                size="lg"
                className="bg-gold-gradient text-space-dark hover:shadow-xl hover:scale-105 transition-all duration-300 text-base px-6 py-3 glow-effect"
                onClick={() => scrollToSection('contact')}
              >
                Book a Consultation
              </Button>
              
              <Button 
                variant="outline"
                size="lg"
                className="border-gold text-gold hover:bg-gold hover:text-space-dark transition-all duration-300 text-base px-6 py-3"
                onClick={() => scrollToSection('services')}
              >
                Explore Our Solutions
              </Button>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="animate-bounce">
            <div className="w-6 h-10 border-2 border-gold rounded-full flex justify-center">
              <div className="w-1 h-3 bg-gold rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Right Side - Interactive 3D Service Model */}
        <div className="hidden lg:flex items-center justify-center w-1/2">
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Central rotating hub */}
            <div 
              className="relative w-96 h-96 transition-all duration-500"
              style={{
                transform: `perspective(1200px) rotateX(${mousePosition.y * 0.2}deg) rotateY(${mousePosition.x * 0.2}deg)`,
              }}
            >
              {/* Main central element */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-40 h-40 bg-gold-gradient rounded-full flex items-center justify-center animate-pulse shadow-2xl">
                  <img src="/images/logo2.png" alt="Right Home Logo" className="w-40 h-40 object-contain" />
                </div>
              </div>

              {/* Orbiting service elements */}
              {[
                { service: 'Architecture', icon: '🏛️', angle: 0, radius: 150, path: '/products/architecture' },
                { service: 'Interiors', icon: '🪑', angle: 45, radius: 160, path: '/products/interiors' },
                { service: 'Furniture', icon: '🛋️', angle: 90, radius: 155, path: '/products/furniture' },
                { service: 'Construction', icon: '🏗️', angle: 135, radius: 145, path: '/products/construction' },
                { service: 'Kitchens', icon: '🍽️', angle: 180, radius: 165, path: '/products/kitchens' },
                { service: 'Engineering', icon: '⚙️', angle: 225, radius: 150, path: '/products/engineering' },
                { service: 'Lifts', icon: '🛗', angle: 270, radius: 160, path: '/products/lifts' },
                { service: 'Tiles', icon: '🚿', angle: 315, radius: 155, path: '/products/tiles' },
              ].map((item, index) => (
                <div
                  key={index}
                  className="absolute group cursor-pointer z-10 w-20 h-20"
                  style={{
                    left: '50%',
                    top: '50%',
                    transform: `
                      translate(-50%, -50%) 
                      rotate(${item.angle + mousePosition.x * 0.3}deg) 
                      translateY(-${item.radius}px) 
                      rotate(-${item.angle + mousePosition.x * 0.3}deg)
                      translate(${mousePosition.x * 0.15}px, ${mousePosition.y * 0.15}px)
                    `,
                    animationDelay: `${index * 0.15}s`,
                  }}
                >
                  {/* Service Icon Container */}
                  <NavLink 
                    to={item.path} 
                    className="absolute group cursor-pointer z-10 w-20 h-20"
                    style={{
                      transform: `translate(-50%, -50%)`,
                      left: '50%',
                      top: '50%',
                    }}
                  > 
                  <div className="w-20 h-20 glass-effect rounded-2xl flex items-center justify-center group-hover:scale-125 transition-all duration-500 hover:bg-gold/20 shadow-xl ">
                    <div className="text-3xl group-hover:scale-110 transition-transform duration-300 rotate-slow">
                      {item.icon}
                    </div>
                  </div>
                  </NavLink>                  
                  {/* Service Name with Animation */}
                  <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0 z-20">
                    <div className="bg-space-dark/90 backdrop-blur-sm border border-gold/30 rounded-lg px-3 py-1 whitespace-nowrap">
                      <span className="text-sm text-gold font-medium">{item.service}</span>
                    </div>
                  </div>

                  
                </div>
              ))}

              {/* Floating particles */}
              {[...Array(15)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 bg-gold rounded-full opacity-40 animate-float"
                  style={{
                    left: `${20 + Math.random() * 60}%`,
                    top: `${20 + Math.random() * 60}%`,
                    animationDelay: `${Math.random() * 4}s`,
                    transform: `translate(${mousePosition.x * (0.05 + i * 0.01)}px, ${mousePosition.y * (0.05 + i * 0.01)}px)`,
                  }}
                />
              ))}

             
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
