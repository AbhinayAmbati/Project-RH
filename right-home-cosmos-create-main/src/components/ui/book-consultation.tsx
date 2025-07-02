import React, { useState } from 'react';
import { Button } from './button';
import { Card, CardContent } from './card';
import { ConsultationPopup } from './consultation-popup';

interface BookConsultationProps {
  service: string;
  description: string;
  ctaText?: string;
  className?: string;
  features?: string[];
}

const defaultFeatures = [
  'Expert consultation',
  'Detailed planning',
  'Custom solutions',
  'Professional guidance'
];

export function BookConsultation({
  service,
  description,
  ctaText = "Book Free Consultation",
  className = "",
  features = defaultFeatures
}: BookConsultationProps) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <>
      <Card className={`bg-[#111] border-gray-800 ${className}`}>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-4 flex-1">
              <h2 className="text-2xl font-semibold text-white">
                Book a {service} Consultation
              </h2>
              <p className="text-gray-400">
                {description}
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-center text-gray-400">
                    <span className="mr-2">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            <div className="w-full md:w-auto">
              <Button 
                onClick={() => setIsPopupOpen(true)}
                className="w-full md:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
              >
                {ctaText}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <ConsultationPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        service={service}
      />
    </>
  );
} 