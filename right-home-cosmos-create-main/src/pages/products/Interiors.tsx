import React, { useEffect, useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import Navigation from '@/components/Navigation';
import ImageGallery from '@/components/ui/image-gallery';
import { API_URL } from '@/config/api';
import { BookConsultation } from '@/components/ui/book-consultation';
import { Loading } from '@/components/ui/loading';

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

  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>;
  }

  const interiorsFeatures = [
    'Design style consultation',
    'Space planning',
    'Color scheme selection',
    'Material and finish options',
    'Lighting design',
    'Furniture placement'
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <Loading loading={loading} />
      <Navigation />
      <div className="container mx-auto px-4 py-20">
        <BookConsultation
          service="Interiors"
          description="Transform your space with our expert interior design consultation. We'll help you create the perfect ambiance for your home or office."
          features={interiorsFeatures}
          className="mb-12"
        />

        <h1 className="text-4xl font-bold text-white mb-8 mt-8 flex items-center gap-3">
          <span className="text-3xl">🎨</span>
          Interiors That Captivate the Soul
        </h1>

        <Card className="bg-[#111] border-gray-800 mb-8">
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold text-white mb-4">Transform Your Space</h2>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Interior design is the art of making a space truly yours. At Right Home, our interior solutions 
              are created to transform empty spaces into warm, functional, and beautiful environments.
            </p>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Our designers work closely with you to understand your style and preferences — whether you want 
              a modern look, a traditional feel, or something completely unique.
            </p>
          </CardContent>
        </Card>
        
        <div className="grid gap-8 md:grid-cols-2">
          <Card className="bg-[#111] border-gray-800">
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold text-white mb-4">Our Services</h2>
              <p className="text-gray-400 mb-4">
                Comprehensive end-to-end interior solutions for every space.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start text-gray-400">
                  <span className="mr-3">✨</span>
                  <span>False ceilings and lighting</span>
                </li>
                <li className="flex items-start text-gray-400">
                  <span className="mr-3">🎨</span>
                  <span>Wall treatments and paints</span>
                </li>
                <li className="flex items-start text-gray-400">
                  <span className="mr-3">🏠</span>
                  <span>Custom wardrobes and modular kitchens</span>
                </li>
                <li className="flex items-start text-gray-400">
                  <span className="mr-3">🎭</span>
                  <span>Home décor accessories</span>
                </li>
                <li className="flex items-start text-gray-400">
                  <span className="mr-3">💼</span>
                  <span>Office interiors and branding elements</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-[#111] border-gray-800">
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold text-white mb-4">Design Focus Areas</h2>
              <p className="text-gray-400 mb-4">
                Creating spaces that blend aesthetics with functionality.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start text-gray-400">
                  <span className="mr-3">🎨</span>
                  <span>Color balance</span>
                </li>
                <li className="flex items-start text-gray-400">
                  <span className="mr-3">🪑</span>
                  <span>Furniture placement</span>
                </li>
                <li className="flex items-start text-gray-400">
                  <span className="mr-3">📦</span>
                  <span>Smart storage solutions</span>
                </li>
                <li className="flex items-start text-gray-400">
                  <span className="mr-3">💡</span>
                  <span>Lighting that sets the mood</span>
                </li>
                <li className="flex items-start text-gray-400">
                  <span className="mr-3">🎭</span>
                  <span>Décor that reflects your personality</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-8 bg-[#111] border-gray-800">
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold text-white mb-4">The Right Home Difference</h2>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="text-center p-4">
                <div className="text-3xl mb-2">🎯</div>
                <h3 className="text-white font-semibold mb-2">Personalized</h3>
                <p className="text-gray-400 text-sm">Designs tailored to your unique style</p>
              </div>
              <div className="text-center p-4">
                <div className="text-3xl mb-2">👁️</div>
                <h3 className="text-white font-semibold mb-2">Detail-Oriented</h3>
                <p className="text-gray-400 text-sm">Attention to every design element</p>
              </div>
              <div className="text-center p-4">
                <div className="text-3xl mb-2">⚡</div>
                <h3 className="text-white font-semibold mb-2">Functional</h3>
                <p className="text-gray-400 text-sm">Beauty meets practicality</p>
              </div>
              <div className="text-center p-4">
                <div className="text-3xl mb-2">💎</div>
                <h3 className="text-white font-semibold mb-2">Premium</h3>
                <p className="text-gray-400 text-sm">High-quality materials and finishes</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-8 bg-[#111] border-gray-800">
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold text-white mb-4">Our Design Process</h2>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="text-center p-4">
                <div className="text-3xl mb-2">👋</div>
                <h3 className="text-white font-semibold mb-2">Consultation</h3>
                <p className="text-gray-400 text-sm">Understanding your vision and style</p>
              </div>
              <div className="text-center p-4">
                <div className="text-3xl mb-2">💭</div>
                <h3 className="text-white font-semibold mb-2">Concept</h3>
                <p className="text-gray-400 text-sm">Creating your unique design story</p>
              </div>
              <div className="text-center p-4">
                <div className="text-3xl mb-2">🎥</div>
                <h3 className="text-white font-semibold mb-2">Visualization</h3>
                <p className="text-gray-400 text-sm">3D renders and walkthroughs</p>
              </div>
              <div className="text-center p-4">
                <div className="text-3xl mb-2">✨</div>
                <h3 className="text-white font-semibold mb-2">Execution</h3>
                <p className="text-gray-400 text-sm">Bringing your design to life</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-8 bg-[#111] border-gray-800">
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold text-white mb-4">Our Promise</h2>
            <p className="text-gray-400 text-center text-lg italic">
              "At Right Home, we don't just decorate spaces — we tell your story through design. 
              Whether you are designing a home that feels cozy or an office that feels inspiring, 
              Right Home ensures that your interiors speak for you."
            </p>
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
    </div>
  );
};

export default Interiors; 