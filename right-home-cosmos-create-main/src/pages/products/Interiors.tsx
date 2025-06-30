import React, { useEffect, useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import Navigation from '@/components/Navigation';
import ImageGallery from '@/components/ui/image-gallery';
import { API_URL } from '@/config/api';
import ContactSection from '@/components/ContactSection';

interface ProjectImage {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  service: string;
  subService: string;
  createdAt: string;
}

const Interiors = () => {
  const [images, setImages] = useState<ProjectImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(`${API_URL}/project-images/service/interiors`);
        if (!response.ok) {
          throw new Error('Failed to fetch images');
        }
        const data = await response.json();
        setImages(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch images');
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  const galleryImages = images.map(image => ({
    url: image.imageUrl,
    title: image.title,
    description: image.description,
    subService: image.subService
  }));

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>;
  }

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

        {!loading && galleryImages.length > 0 && (
          <ImageGallery 
            images={galleryImages} 
            title="Our Interior Projects"
            groupBySubService={true}
          />
        )}
      </div>
      
      <ContactSection />
    </div>
  );
};

export default Interiors; 