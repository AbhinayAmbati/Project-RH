import React, { useEffect, useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import Navigation from '@/components/Navigation';
import ImageGallery from '@/components/ui/image-gallery';
import { API_URL } from '@/config/api';

interface ProjectImage {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  service: string;
  createdAt: string;
}

const Kitchens = () => {
  const [images, setImages] = useState<ProjectImage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(`${API_URL}/project-images/service/kitchens`);
        const data = await response.json();
        setImages(data);
      } catch (error) {
        console.error('Error fetching images:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  const galleryImages = images.map(image => ({
    url: image.imageUrl,
    title: image.title,
    description: image.description
  }));

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <Navigation />
      <div className="container mx-auto px-4 py-20">
        <h1 className="text-4xl font-bold text-white mb-8 mt-8 flex items-center gap-3">
          <span className="text-3xl">🍽️</span>
          Kitchen Design Services
        </h1>
        
        <div className="grid gap-8 md:grid-cols-2">
          <Card className="bg-[#111] border-gray-800">
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold text-white mb-4">Our Kitchen Design Expertise</h2>
              <p className="text-gray-400 mb-4">
                Create your dream kitchen with our expert design and installation services. We combine 
                functionality with stunning aesthetics to deliver kitchens that inspire culinary creativity.
              </p>
              <ul className="list-disc list-inside text-gray-400 space-y-2">
                <li>Custom Kitchen Design</li>
                <li>Modern & Traditional Styles</li>
                <li>Storage Solutions</li>
                <li>Appliance Integration</li>
                <li>Lighting Design</li>
                <li>Material Selection</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-[#111] border-gray-800">
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold text-white mb-4">Why Choose Our Kitchen Services</h2>
              <ul className="space-y-4 text-gray-400">
                <li className="flex items-start">
                  <span className="mr-2">🎨</span>
                  <span>Innovative design solutions</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">⚡</span>
                  <span>Efficient space utilization</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✨</span>
                  <span>Premium materials and finishes</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">🛠️</span>
                  <span>Expert installation team</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">💫</span>
                  <span>Attention to detail</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-8 bg-[#111] border-gray-800">
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold text-white mb-4">Our Kitchen Design Process</h2>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="text-center p-4">
                <div className="text-3xl mb-2">🎯</div>
                <h3 className="text-white font-semibold mb-2">Consultation</h3>
                <p className="text-gray-400 text-sm">Understanding your kitchen needs and style preferences</p>
              </div>
              <div className="text-center p-4">
                <div className="text-3xl mb-2">✏️</div>
                <h3 className="text-white font-semibold mb-2">Design</h3>
                <p className="text-gray-400 text-sm">Creating detailed kitchen layouts and visuals</p>
              </div>
              <div className="text-center p-4">
                <div className="text-3xl mb-2">📋</div>
                <h3 className="text-white font-semibold mb-2">Selection</h3>
                <p className="text-gray-400 text-sm">Choosing materials, appliances, and finishes</p>
              </div>
              <div className="text-center p-4">
                <div className="text-3xl mb-2">🔨</div>
                <h3 className="text-white font-semibold mb-2">Installation</h3>
                <p className="text-gray-400 text-sm">Professional installation and finishing touches</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {!loading && galleryImages.length > 0 && (
          <ImageGallery 
            images={galleryImages} 
            title="Our Kitchen Design Projects" 
          />
        )}
      </div>
    </div>
  );
};

export default Kitchens; 