
import React, { useEffect, useRef, useState } from 'react';

const AboutSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

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
    <section id="about" ref={sectionRef} className="section-padding bg-space-light">
      <div className="container-max">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className={`transition-all duration-1000 ${isVisible ? 'animate-fade-in-left' : 'opacity-0'}`}>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Who <span className="text-gradient">We Are</span>
            </h2>
            
            <div className="space-y-6 text-gray-300">
              <p className="text-lg leading-relaxed">
                With over <span className="text-gold font-semibold">two decades of legacy</span>, 
                Right Home is a distinguished vertical of <span className="text-gold font-semibold">ICONIC Infinity Group</span>, 
                revolutionizing the way spaces are created and transformed.
              </p>
              
              <p className="text-lg leading-relaxed">
                Our unique proposition lies in <span className="text-blue-accent font-semibold">simplifying space creation through centralization</span> — 
                bringing together architecture, interior design, furniture, construction, and project management under one roof.
              </p>
              
              <p className="text-lg leading-relaxed">
                We believe that your vision deserves seamless execution, and our comprehensive approach ensures that 
                every detail is meticulously planned and flawlessly delivered.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-6">
              <div className="glass-effect rounded-lg p-6 hover-lift">
                <h3 className="text-2xl font-bold text-gold mb-2">20+</h3>
                <p className="text-gray-400">Years of Excellence</p>
              </div>
              
              <div className="glass-effect rounded-lg p-6 hover-lift">
                <h3 className="text-2xl font-bold text-blue-accent mb-2">1000+</h3>
                <p className="text-gray-400">Projects Completed</p>
              </div>
            </div>
          </div>

          {/* Interactive Visual */}
          <div className={`transition-all duration-1000 ${isVisible ? 'animate-fade-in-right' : 'opacity-0'}`}>
            <div className="relative">
              {/* Main Container */}
              <div className="relative w-full h-96 glass-effect rounded-2xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-gold/10 to-blue-accent/10"></div>
                
                {/* Floating Elements */}
                <div className="absolute top-8 left-8 w-16 h-16 bg-gold/20 rounded-lg animate-float"></div>
                <div className="absolute top-16 right-12 w-12 h-12 bg-blue-accent/20 rounded-lg animate-float" style={{ animationDelay: '1s' }}></div>
                <div className="absolute bottom-16 left-16 w-20 h-20 bg-gold/15 rounded-lg animate-float" style={{ animationDelay: '2s' }}></div>
                <div className="absolute bottom-8 right-8 w-14 h-14 bg-blue-accent/15 rounded-lg animate-float" style={{ animationDelay: '3s' }}></div>
                
                {/* Center Content */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-gold-gradient rounded-2xl mx-auto mb-4 flex items-center justify-center animate-scale-pulse">
                      <span className="text-2xl font-bold text-space-dark">RH</span>
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">ICONIC Infinity Group</h3>
                    <p className="text-gray-400">Excellence in Every Detail</p>
                  </div>
                </div>
              </div>

              {/* Background Particles */}
              <div className="absolute -inset-4 opacity-30">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-2 h-2 bg-gold rounded-full animate-pulse"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      animationDelay: `${i * 0.5}s`,
                    }}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
