
import React, { useEffect, useRef, useState } from 'react';

const WhyChooseSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const benefits = [
    {
      title: "One-Stop Shop Convenience",
      description: "Everything you need under one roof, eliminating the hassle of coordinating multiple vendors",
      icon: "🏢"
    },
    {
      title: "Expert Team Across India",
      description: "Skilled professionals and craftsmen from diverse backgrounds bringing regional expertise",
      icon: "👥"
    },
    {
      title: "Tailor-Made Design + Execution",
      description: "Customized solutions that perfectly align with your vision, lifestyle, and budget",
      icon: "✨"
    },
    {
      title: "Real-Time Visualization",
      description: "Advanced 3D modeling and virtual walkthroughs so you see your space before it's built",
      icon: "🎬"
    },
    {
      title: "Dedicated Project Managers",
      description: "Personal project coordinators ensuring seamless communication and timely delivery",
      icon: "📋"
    },
    {
      title: "Transparent Costing & Timeline",
      description: "No hidden costs, clear timelines, and regular progress updates throughout your project",
      icon: "💎"
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="section-padding bg-space-light overflow-hidden">
      <div className="container-max">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Why Choose <span className="text-gradient">Right Home</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Experience the difference of working with a truly integrated space creation partner
          </p>
        </div>

        {/* Horizontal Scroll Container */}
        <div className="relative">
          <div className={`flex space-x-8 pb-8 transition-all duration-1000 ${isVisible ? 'animate-fade-in-left' : 'opacity-0'}`}>
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="min-w-80 glass-effect rounded-2xl p-8 hover-lift group"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  {benefit.icon}
                </div>
                
                <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-gradient transition-all duration-300">
                  {benefit.title}
                </h3>
                
                <p className="text-gray-400 leading-relaxed">
                  {benefit.description}
                </p>

                <div className="mt-6 h-1 bg-gradient-to-r from-gold to-blue-accent rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className={`mt-20 grid md:grid-cols-4 gap-8 transition-all duration-1000 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <div className="text-center glass-effect rounded-xl p-6 hover-lift">
            <div className="text-3xl font-bold text-gradient mb-2">24/7</div>
            <p className="text-gray-400">Support Available</p>
          </div>
          
          <div className="text-center glass-effect rounded-xl p-6 hover-lift">
            <div className="text-3xl font-bold text-gradient mb-2">99%</div>
            <p className="text-gray-400">Client Satisfaction</p>
          </div>
          
          <div className="text-center glass-effect rounded-xl p-6 hover-lift">
            <div className="text-3xl font-bold text-gradient mb-2">50+</div>
            <p className="text-gray-400">Expert Team Members</p>
          </div>
          
          <div className="text-center glass-effect rounded-xl p-6 hover-lift">
            <div className="text-3xl font-bold text-gradient mb-2">15</div>
            <p className="text-gray-400">Cities Served</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSection;
