
import React, { useEffect, useRef, useState } from 'react';

const ServicesSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeService, setActiveService] = useState(0);

  const services = [
    {
      title: "Architecture & Planning",
      description: "Innovative architectural solutions that blend aesthetics with functionality",
      icon: "🏗️",
      features: ["Structural Design", "3D Modeling", "Building Permits", "Site Planning"]
    },
    {
      title: "Interior Design & Furniture",
      description: "Bespoke interior solutions that reflect your personality and lifestyle",
      icon: "🎨",
      features: ["Space Planning", "Custom Furniture", "Color Consultation", "Lighting Design"]
    },
    {
      title: "Modular Kitchens & Wardrobes",
      description: "Modern, functional spaces optimized for your daily needs",
      icon: "🏠",
      features: ["Custom Cabinetry", "Smart Storage", "Premium Materials", "Ergonomic Design"]
    },
    {
      title: "Smart Home Automation",
      description: "Cutting-edge technology integration for intelligent living",
      icon: "🤖",
      features: ["IoT Integration", "Voice Control", "Security Systems", "Energy Management"]
    },
    {
      title: "Structural Engineering",
      description: "Robust engineering solutions ensuring safety and durability",
      icon: "⚡",
      features: ["Load Analysis", "Foundation Design", "Safety Compliance", "Quality Assurance"]
    },
    {
      title: "Lifts & Escalators (YATRA)",
      description: "Premium vertical transportation solutions",
      icon: "🚡",
      features: ["Custom Installation", "Maintenance", "Safety Features", "Energy Efficient"]
    },
    {
      title: "Tiles & Sanitaryware (AVANI)",
      description: "Luxury tiles and sanitaryware for distinctive spaces",
      icon: "🚿",
      features: ["Premium Quality", "Diverse Designs", "Water Efficiency", "Easy Maintenance"]
    },
    {
      title: "Project Management",
      description: "End-to-end project coordination and execution",
      icon: "📋",
      features: ["Timeline Management", "Quality Control", "Budget Optimization", "Regular Updates"]
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveService((prev) => (prev + 1) % services.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [services.length]);

  return (
    <section id="services" ref={sectionRef} className="section-padding bg-space-dark">
      <div className="container-max">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Our <span className="text-gradient">Services</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Comprehensive solutions for every aspect of your space creation journey
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {services.map((service, index) => (
            <div
              key={index}
              className={`glass-effect rounded-2xl p-6 hover-lift cursor-pointer transition-all duration-500 ${
                isVisible ? 'animate-fade-in-up' : 'opacity-0'
              } ${activeService === index ? 'ring-2 ring-gold glow-effect' : ''}`}
              style={{ animationDelay: `${index * 0.1}s` }}
              onMouseEnter={() => setActiveService(index)}
            >
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold mb-3 text-white">{service.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>

        {/* Active Service Details */}
        <div className={`glass-effect rounded-2xl p-8 transition-all duration-1000 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="text-5xl mb-4">{services[activeService].icon}</div>
              <h3 className="text-3xl font-bold mb-4 text-gradient">
                {services[activeService].title}
              </h3>
              <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                {services[activeService].description}
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                {services[activeService].features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-gold rounded-full"></div>
                    <span className="text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="w-full h-64 glass-effect rounded-xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-gold/20 to-blue-accent/20"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-8xl opacity-30">{services[activeService].icon}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
