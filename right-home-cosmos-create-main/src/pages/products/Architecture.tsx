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
  createdAt: string;
}

const Architecture = () => {
  const [images, setImages] = useState<ProjectImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(`${API_URL}/project-images/service/architecture`);
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
    description: image.description
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
          <span className="text-3xl">🏛️</span>
          Architecture Services
        </h1>
        
        <div className="grid gap-8 md:grid-cols-2">
          <Card className="bg-[#111] border-gray-800">
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold text-white mb-4">Our Architectural Expertise</h2>
              <p className="text-gray-400 mb-4">
                We specialize in creating innovative and sustainable architectural designs that blend 
                functionality with aesthetic excellence. Our team of experienced architects works 
                closely with clients to bring their vision to life.
              </p>
              <ul className="list-disc list-inside text-gray-400 space-y-2">
                <li>Custom Home Design</li>
                <li>Commercial Architecture</li>
                <li>Renovation Planning</li>
                <li>Sustainable Design Solutions</li>
                <li>3D Visualization</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-[#111] border-gray-800">
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold text-white mb-4">Why Choose Our Architecture Services</h2>
              <ul className="space-y-4 text-gray-400">
                <li className="flex items-start">
                  <span className="mr-2">🎯</span>
                  <span>Expert team with years of industry experience</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">🌱</span>
                  <span>Focus on sustainable and eco-friendly designs</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">💡</span>
                  <span>Innovative solutions for complex architectural challenges</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">🤝</span>
                  <span>Collaborative approach with clients</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">📋</span>
                  <span>Comprehensive project management</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-8 bg-[#111] border-gray-800">
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold text-white mb-4">Our Process</h2>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="text-center p-4">
                <div className="text-3xl mb-2">📝</div>
                <h3 className="text-white font-semibold mb-2">Consultation</h3>
                <p className="text-gray-400 text-sm">Initial meeting to understand your vision and requirements</p>
              </div>
              <div className="text-center p-4">
                <div className="text-3xl mb-2">✏️</div>
                <h3 className="text-white font-semibold mb-2">Design</h3>
                <p className="text-gray-400 text-sm">Creating detailed architectural plans and 3D visualizations</p>
              </div>
              <div className="text-center p-4">
                <div className="text-3xl mb-2">📋</div>
                <h3 className="text-white font-semibold mb-2">Development</h3>
                <p className="text-gray-400 text-sm">Refining designs and obtaining necessary approvals</p>
              </div>
              <div className="text-center p-4">
                <div className="text-3xl mb-2">🏗️</div>
                <h3 className="text-white font-semibold mb-2">Execution</h3>
                <p className="text-gray-400 text-sm">Overseeing construction and project completion</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {!loading && galleryImages.length > 0 && (
          <ImageGallery 
            images={galleryImages} 
            title="Our Architecture Projects" 
          />
        )}
      </div>
      
      <ContactSection />
    </div>
  );
};

export default Architecture; 