import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import Navigation from '@/components/Navigation';

const Interiors = () => {
  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <Navigation />
      <div className="container mx-auto px-4 py-20">
        <h1 className="text-4xl font-bold text-white mb-8 mt-8 flex items-center gap-3">
          <span className="text-3xl">🪑</span>
          Interior Design Services
        </h1>
        
        <div className="grid gap-8 md:grid-cols-2">
          <Card className="bg-[#111] border-gray-800">
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold text-white mb-4">Our Interior Design Expertise</h2>
              <p className="text-gray-400 mb-4">
                Transform your space with our expert interior design services. We create beautiful, 
                functional, and personalized interiors that reflect your style and meet your needs.
              </p>
              <ul className="list-disc list-inside text-gray-400 space-y-2">
                <li>Residential Interior Design</li>
                <li>Commercial Space Planning</li>
                <li>Custom Furniture Solutions</li>
                <li>Color Consultation</li>
                <li>Lighting Design</li>
                <li>Material Selection</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-[#111] border-gray-800">
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold text-white mb-4">Why Choose Our Interior Services</h2>
              <ul className="space-y-4 text-gray-400">
                <li className="flex items-start">
                  <span className="mr-2">🎨</span>
                  <span>Personalized design solutions tailored to your style</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">💡</span>
                  <span>Expert space optimization and planning</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✨</span>
                  <span>High-quality materials and finishes</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">🤝</span>
                  <span>Dedicated project management</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">💰</span>
                  <span>Cost-effective design solutions</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-8 bg-[#111] border-gray-800">
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold text-white mb-4">Our Design Process</h2>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="text-center p-4">
                <div className="text-3xl mb-2">👋</div>
                <h3 className="text-white font-semibold mb-2">Initial Consultation</h3>
                <p className="text-gray-400 text-sm">Understanding your vision and requirements</p>
              </div>
              <div className="text-center p-4">
                <div className="text-3xl mb-2">📐</div>
                <h3 className="text-white font-semibold mb-2">Space Planning</h3>
                <p className="text-gray-400 text-sm">Creating optimal layout solutions</p>
              </div>
              <div className="text-center p-4">
                <div className="text-3xl mb-2">🎨</div>
                <h3 className="text-white font-semibold mb-2">Design Development</h3>
                <p className="text-gray-400 text-sm">Selecting materials, colors, and furnishings</p>
              </div>
              <div className="text-center p-4">
                <div className="text-3xl mb-2">✨</div>
                <h3 className="text-white font-semibold mb-2">Implementation</h3>
                <p className="text-gray-400 text-sm">Bringing your design to life</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Interiors; 