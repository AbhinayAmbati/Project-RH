import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { API_URL } from '@/config/api';

const ContactSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    project: '',
    message: ''
  });

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_URL}/consultations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to submit consultation request');
      }

      toast.success('Thank you! We will contact you within 24 hours.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        project: '',
        message: ''
      });
    } catch (error) {
      console.error('Submission error:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to submit consultation request');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" ref={sectionRef} className="section-padding bg-space-dark">
      <div className="container-max">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Let's Build It <span className="text-gradient">Right</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Ready to transform your vision into reality? Get in touch with our experts today.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div className={`transition-all duration-1000 ${isVisible ? 'animate-fade-in-left' : 'opacity-0'}`}>
            <div className="glass-effect rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6 text-white">Book Your Consultation</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold text-white placeholder-gray-400"
                      placeholder="Your name"
                      disabled={isSubmitting}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold text-white placeholder-gray-400"
                      placeholder="+91 XXXXX XXXXX"
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold text-white placeholder-gray-400"
                    placeholder="your.email@example.com"
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Project Type
                  </label>
                  <select
                    name="project"
                    value={formData.project}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold text-white"
                    disabled={isSubmitting}
                  >
                    <option value="" className="bg-space-dark">Select project type</option>
                    <option value="Residential" className="bg-space-dark">Residential</option>
                    <option value="Commercial" className="bg-space-dark">Commercial</option>
                    <option value="Renovation" className="bg-space-dark">Renovation</option>
                    <option value="Interior Design" className="bg-space-dark">Interior Design</option>
                    <option value="Smart Home" className="bg-space-dark">Smart Home</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Project Details
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold text-white placeholder-gray-400 resize-none"
                    placeholder="Tell us about your project, timeline, budget range, and any specific requirements..."
                    disabled={isSubmitting}
                  ></textarea>
                </div>

                <Button 
                  type="submit"
                  className="w-full bg-gold-gradient text-space-dark hover:shadow-xl hover:scale-105 transition-all duration-300 text-lg py-6 glow-effect"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Schedule Consultation'}
                </Button>
              </form>
            </div>
          </div>

          {/* Contact Information */}
          <div className={`transition-all duration-1000 ${isVisible ? 'animate-fade-in-right' : 'opacity-0'}`}>
            <div className="space-y-8">
              {/* Company Info */}
              <div className="glass-effect rounded-2xl p-8">
                <h3 className="text-2xl font-bold mb-6 text-gradient">Get in Touch</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gold/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      📍
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">Head Office</h4>
                      <p className="text-gray-400">
                        ICONIC Infinity Group<br />
                        Business District, Mumbai<br />
                        Maharashtra, India
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-blue-accent/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      📞
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">Phone</h4>
                      <p className="text-gray-400">+91 99999 88888</p>
                      <p className="text-gray-400">+91 77777 66666</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gold/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      ✉️
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">Email</h4>
                      <p className="text-gray-400">hello@righthome.in</p>
                      <p className="text-gray-400">projects@righthome.in</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-blue-accent/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      🕒
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">Business Hours</h4>
                      <p className="text-gray-400">Mon - Sat: 9:00 AM - 8:00 PM</p>
                      <p className="text-gray-400">Sunday: 10:00 AM - 6:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="glass-effect rounded-xl p-6 text-center hover-lift">
                  <div className="text-2xl font-bold text-gradient mb-1">24hrs</div>
                  <p className="text-gray-400 text-sm">Response Time</p>
                </div>
                
                <div className="glass-effect rounded-xl p-6 text-center hover-lift">
                  <div className="text-2xl font-bold text-gradient mb-1">Free</div>
                  <p className="text-gray-400 text-sm">Consultation</p>
                </div>
              </div>

              {/* Social Links */}
              <div className="glass-effect rounded-xl p-6">
                <h4 className="font-semibold text-white mb-4">Follow Us</h4>
                <div className="flex space-x-4">
                  <div className="w-10 h-10 bg-blue-gradient rounded-lg flex items-center justify-center cursor-pointer hover-lift">
                    📘
                  </div>
                  <div className="w-10 h-10 bg-blue-gradient rounded-lg flex items-center justify-center cursor-pointer hover-lift">
                    📷
                  </div>
                  <div className="w-10 h-10 bg-blue-gradient rounded-lg flex items-center justify-center cursor-pointer hover-lift">
                    🐦
                  </div>
                  <div className="w-10 h-10 bg-blue-gradient rounded-lg flex items-center justify-center cursor-pointer hover-lift">
                    💼
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
