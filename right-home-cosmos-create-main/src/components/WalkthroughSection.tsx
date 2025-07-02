
import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';

const WalkthroughSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: "Initial Consultation",
      description: "Understanding your vision, requirements, and budget",
      visual: "🤝"
    },
    {
      title: "Design & Planning",
      description: "3D modeling, architectural drawings, and material selection",
      visual: "📐"
    },
    {
      title: "Furniture",
      description: "Planning furniture systems and smart home features",
      visual: "🛋️"
    },
    {
      title: "Construction Phase",
      description: "Professional execution with regular quality checks",
      visual: "🔨"
    },
    {
      title: "Interior Setup",
      description: "Furniture installation and interior finishing touches",
      visual: "🛋️"
    },
    {
      title: "Final Walkthrough",
      description: "Quality inspection and project handover",
      visual: "✅"
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

  useEffect(() => {
    if (isVisible) {
      const interval = setInterval(() => {
        setCurrentStep((prev) => (prev + 1) % steps.length);
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [isVisible, steps.length]);

  return (
    <section id="walkthrough" ref={sectionRef} className="section-padding bg-space-dark">
      <div className="container-max">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            3D Virtual <span className="text-gradient">Walkthrough</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Experience your space before it's built with our step-by-step visualization process
          </p>
        </div>

        {/* Main Visualization Area */}
        <div className={`glass-effect rounded-3xl p-8 mb-12 transition-all duration-1000 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Virtual Space */}
            <div className="relative h-96 bg-gradient-to-br from-gold/10 to-blue-accent/10 rounded-2xl overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-8xl mb-4 animate-scale-pulse">
                    {steps[currentStep].visual}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {steps[currentStep].title}
                  </h3>
                  <p className="text-gray-400 max-w-sm">
                    {steps[currentStep].description}
                  </p>
                </div>
              </div>

              {/* Progress Overlay */}
              <div className="absolute bottom-4 left-4 right-4">
                <div className="flex space-x-2">
                  {steps.map((_, index) => (
                    <div
                      key={index}
                      className={`h-1 flex-1 rounded-full transition-all duration-500 ${
                        index === currentStep ? 'bg-gold' : 'bg-white/20'
                      }`}
                    ></div>
                  ))}
                </div>
              </div>
            </div>

            {/* Steps Timeline */}
            <div className="space-y-4">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className={`flex items-center space-x-4 p-4 rounded-lg transition-all duration-500 cursor-pointer ${
                    index === currentStep 
                      ? 'glass-effect ring-2 ring-gold glow-effect' 
                      : 'hover:bg-white/5'
                  }`}
                  onClick={() => setCurrentStep(index)}
                >
                  <div className={`text-3xl transition-all duration-300 ${
                    index === currentStep ? 'scale-110' : 'opacity-60'
                  }`}>
                    {step.visual}
                  </div>
                  
                  <div className="flex-1">
                    <h4 className={`font-semibold transition-all duration-300 ${
                      index === currentStep ? 'text-gold' : 'text-white'
                    }`}>
                      {step.title}
                    </h4>
                    <p className="text-gray-400 text-sm">
                      {step.description}
                    </p>
                  </div>

                  <div className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentStep ? 'bg-gold' : 'bg-white/20'
                  }`}></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className={`text-center transition-all duration-1000 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <h3 className="text-2xl font-bold mb-4 text-white">
            Ready to See Your Vision Come to Life?
          </h3>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Schedule a consultation and experience our 3D visualization process firsthand. 
            See exactly how your space will look before construction begins.
          </p>
          
          <Button 
            size="lg"
            className="bg-gold-gradient text-space-dark hover:shadow-xl hover:scale-105 transition-all duration-300 text-lg px-8 py-4 glow-effect"
          >
            Start Your Virtual Tour
          </Button>
        </div>
      </div>
    </section>
  );
};

export default WalkthroughSection;
