import React, { useState } from 'react';
import { Button } from './button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './dialog';
import { toast } from 'sonner';
import { API_URL } from '@/config/api';

interface ConsultationPopupProps {
  isOpen: boolean;
  onClose: () => void;
  service: string;
}

export function ConsultationPopup({ isOpen, onClose, service }: ConsultationPopupProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    project: service,
    message: ''
  });

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
        project: service,
        message: ''
      });
      onClose();
    } catch (error) {
      console.error('Submission error:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to submit consultation request');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-space-dark border-white/20 text-white max-w-lg">
        <DialogHeader className="space-y-2 mb-3">
          <DialogTitle className="text-xl font-bold">Book {service} Consultation</DialogTitle>
          <DialogDescription className="text-gray-400 text-sm">
            Fill out the form below and our experts will get back to you within 24 hours.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Full Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg focus:outline-none focus:ring-1 focus:ring-gold text-white placeholder-gray-400 text-sm"
                placeholder="Your name"
                disabled={isSubmitting}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Phone Number *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg focus:outline-none focus:ring-1 focus:ring-gold text-white placeholder-gray-400 text-sm"
                placeholder="+91 XXXXX XXXXX"
                disabled={isSubmitting}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Email Address *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg focus:outline-none focus:ring-1 focus:ring-gold text-white placeholder-gray-400 text-sm"
              placeholder="your.email@example.com"
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Project Type
            </label>
            <select
              name="project"
              value={formData.project}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg focus:outline-none focus:ring-1 focus:ring-gold text-white text-sm"
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
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Project Details
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              rows={3}
              required
              className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg focus:outline-none focus:ring-1 focus:ring-gold text-white placeholder-gray-400 resize-none text-sm"
              placeholder="Tell us about your project requirements..."
              disabled={isSubmitting}
            ></textarea>
          </div>

          <Button 
            type="submit"
            className="w-full bg-gold-gradient text-space-dark hover:shadow-xl hover:scale-105 transition-all duration-300 text-sm py-2"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Schedule Consultation'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
} 