import React, { useEffect, useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import Navigation from '@/components/Navigation';
import ImageGallery from '@/components/ui/image-gallery';
import { API_URL } from '@/config/api';
import { BookConsultation } from '@/components/ui/book-consultation';

interface ProjectImage {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  service: string;
  subService: string;
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
    description: image.description,
    subService: image.subService
  }));

  const architectureFeatures = [
    'Architectural design consultation',
    'Project feasibility analysis',
    'Design concept discussion',
    '3D visualization review',
    'Budget estimation',
    'Timeline planning'
  ];

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
        <BookConsultation
          service="Architecture"
          description="Start your architectural journey with a professional consultation. Our experts will help bring your vision to life."
          features={architectureFeatures}
          className="mb-12"
        />

        <h1 className="text-4xl font-bold text-white mb-8 mt-8 flex items-center gap-3">
          <span className="text-3xl">🏛️</span>
          Architecture Services
        </h1>

        <Card className="bg-[#111] border-gray-800 mb-8">
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold text-white mb-4">Welcome to Right Home Architecture</h2>
            <p className="text-gray-400 mb-6 leading-relaxed">
              At Right Home, we know that a strong design is the backbone of any great home or office. 
              That's why we have brought together an extraordinary team of architects and designers from around the world. 
              Our experts come from diverse backgrounds, each bringing a unique sense of creativity, experience, and technical skill.
            </p>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Whether you want a modern minimalist look, a traditional Indian home, or a luxurious office space, 
              our team knows how to make it happen. We believe in listening first — understanding your needs, 
              your lifestyle, and your dreams.
            </p>
          </CardContent>
        </Card>
        
        <div className="grid gap-8 md:grid-cols-2">
          <Card className="bg-[#111] border-gray-800">
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold text-white mb-4">Architectural Excellence</h2>
              <p className="text-gray-400 mb-4">
                Our architects are dedicated to creating innovative and sustainable solutions that transform your vision into reality.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start text-gray-400">
                  <span className="mr-3">📐</span>
                  <span>Smart space planning</span>
                </li>
                <li className="flex items-start text-gray-400">
                  <span className="mr-3">🌱</span>
                  <span>Eco-friendly designs</span>
                </li>
                <li className="flex items-start text-gray-400">
                  <span className="mr-3">🏗️</span>
                  <span>Unique structural layouts</span>
                </li>
                <li className="flex items-start text-gray-400">
                  <span className="mr-3">💰</span>
                  <span>Cost-effective building methods</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-[#111] border-gray-800">
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold text-white mb-4">Design Mastery</h2>
              <p className="text-gray-400 mb-4">
                Our designers focus on creating spaces that are both beautiful and functional, ensuring every detail serves a purpose.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start text-gray-400">
                  <span className="mr-3">✨</span>
                  <span>Aesthetic beauty</span>
                </li>
                <li className="flex items-start text-gray-400">
                  <span className="mr-3">🎨</span>
                  <span>Color themes and materials</span>
                </li>
                <li className="flex items-start text-gray-400">
                  <span className="mr-3">⚡</span>
                  <span>Functionality in every space</span>
                </li>
                <li className="flex items-start text-gray-400">
                  <span className="mr-3">🔄</span>
                  <span>Harmonious interiors and exteriors</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-8 bg-[#111] border-gray-800">
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold text-white mb-4">Our Design Journey</h2>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="text-center p-4">
                <div className="text-3xl mb-2">👂</div>
                <h3 className="text-white font-semibold mb-2">Listen</h3>
                <p className="text-gray-400 text-sm">Understanding your needs, lifestyle, and dreams</p>
              </div>
              <div className="text-center p-4">
                <div className="text-3xl mb-2">✏️</div>
                <h3 className="text-white font-semibold mb-2">Design</h3>
                <p className="text-gray-400 text-sm">Creating initial sketches and concepts</p>
              </div>
              <div className="text-center p-4">
                <div className="text-3xl mb-2">💻</div>
                <h3 className="text-white font-semibold mb-2">Visualize</h3>
                <p className="text-gray-400 text-sm">3D rendering with latest software</p>
              </div>
              <div className="text-center p-4">
                <div className="text-3xl mb-2">🎯</div>
                <h3 className="text-white font-semibold mb-2">Execute</h3>
                <p className="text-gray-400 text-sm">Bringing your vision to life</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-8 bg-[#111] border-gray-800">
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold text-white mb-4">Our Promise</h2>
            <p className="text-gray-400 text-center text-lg italic">
              "At Right Home, we're not just building walls and roofs. We're shaping lifestyles.
              When great ideas meet great design, magic happens — and that's exactly what we promise you."
            </p>
          </CardContent>
        </Card>

        {!loading && galleryImages.length > 0 && (
          <ImageGallery 
            images={galleryImages} 
            title="Our Architecture Projects"
            groupBySubService={true}
          />
        )}
      </div>
    </div>
  );
};

export default Architecture; 