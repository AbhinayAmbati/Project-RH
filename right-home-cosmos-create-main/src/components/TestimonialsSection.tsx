
import React, { useEffect, useRef, useState } from 'react';

const TestimonialsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      name: "Rajesh Sharma",
      position: "CEO, Tech Innovations",
      project: "Smart Office Complex",
      rating: 5,
      text: "Right Home transformed our vision into reality with exceptional precision. Their one-stop approach saved us months of coordination hassle.",
      image: "👨‍💼"
    },
    {
      name: "Priya Mehta",
      position: "Interior Designer",
      project: "Luxury Residential Villa",
      rating: 5,
      text: "The level of detail and craftsmanship exceeded our expectations. The smart home integration was flawlessly executed.",
      image: "👩‍🎨"
    },
    {
      name: "Amit Kumar",
      position: "Business Owner",
      project: "Modern Restaurant",
      rating: 5,
      text: "From concept to completion, every phase was handled professionally. The transparency in costing and timeline was remarkable.",
      image: "👨‍🍳"
    },
    {
      name: "Sonia Gupta",
      position: "Homeowner",
      project: "Dream Family Home",
      rating: 5,
      text: "The 3D walkthrough helped us visualize everything perfectly. The dedicated project manager made the entire process stress-free.",
      image: "👩‍👧‍👦"
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
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <section id="testimonials" ref={sectionRef} className="section-padding bg-space-light">
      <div className="container-max">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Client <span className="text-gradient">Success Stories</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Hear from our satisfied clients who trusted us with their vision
          </p>
        </div>

        {/* Main Testimonial Display */}
        <div className={`glass-effect rounded-3xl p-8 mb-12 transition-all duration-1000 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Testimonial Content */}
            <div className="text-center lg:text-left">
              <div className="text-6xl mb-6">{testimonials[currentTestimonial].image}</div>
              
              <div className="flex justify-center lg:justify-start mb-4">
                {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                  <span key={i} className="text-gold text-2xl">★</span>
                ))}
              </div>

              <blockquote className="text-xl text-gray-300 mb-6 leading-relaxed italic">
                "{testimonials[currentTestimonial].text}"
              </blockquote>

              <div>
                <h4 className="text-2xl font-bold text-gradient mb-1">
                  {testimonials[currentTestimonial].name}
                </h4>
                <p className="text-blue-accent font-medium mb-1">
                  {testimonials[currentTestimonial].position}
                </p>
                <p className="text-gray-400 text-sm">
                  Project: {testimonials[currentTestimonial].project}
                </p>
              </div>
            </div>

            {/* Visual Element */}
            <div className="relative">
              <div className="w-full h-80 glass-effect rounded-2xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-gold/20 to-blue-accent/20"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-9xl opacity-30 mb-4">
                      {testimonials[currentTestimonial].image}
                    </div>
                    <div className="glass-effect rounded-lg p-4">
                      <p className="text-gold font-semibold">
                        {testimonials[currentTestimonial].project}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center space-x-3 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentTestimonial ? 'bg-gold scale-125' : 'bg-white/30 hover:bg-white/50'
                }`}
              ></button>
            ))}
          </div>
        </div>

        {/* Timeline Style Testimonials */}
        <div className={`grid md:grid-cols-2 lg:grid-cols-4 gap-6 transition-all duration-1000 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`glass-effect rounded-xl p-6 hover-lift cursor-pointer transition-all duration-500 ${
                index === currentTestimonial ? 'ring-2 ring-gold glow-effect' : ''
              }`}
              onClick={() => setCurrentTestimonial(index)}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-4xl mb-3 text-center">{testimonial.image}</div>
              
              <div className="flex justify-center mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-gold text-sm">★</span>
                ))}
              </div>

              <h4 className="font-semibold text-white text-center mb-1">
                {testimonial.name}
              </h4>
              <p className="text-gray-400 text-xs text-center mb-3">
                {testimonial.project}
              </p>
              <p className="text-gray-400 text-xs leading-relaxed">
                {testimonial.text.substring(0, 80)}...
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
