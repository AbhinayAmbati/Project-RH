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

const Lifts = () => {
  const [images, setImages] = useState<ProjectImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(`${API_URL}/project-images/service/lifts`);
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

  const liftFeatures = [
    'Technical assessment',
    'Capacity planning',
    'Safety features review',
    'Design customization',
    'Maintenance planning',
    'Installation timeline'
  ];

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <Loading loading={loading} />
      <Navigation />
      <div className="container mx-auto px-4 py-20">
        <BookConsultation
          service="Lift Installation"
          description="Get expert guidance on lift and escalator solutions for your building. Our team will help you choose the right system for your needs."
          features={liftFeatures}
          className="mb-12"
        />

        <h1 className="text-4xl font-bold text-white mb-8 mt-8 flex items-center gap-3">
          <span className="text-3xl">🛗</span>
          Lifts & Escalators
        </h1>

        <Card className="bg-[#111] border-gray-800 mb-8">
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold text-white mb-4">Smooth, Safe, and Stylish</h2>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Modern homes and offices demand modern mobility solutions. That's why Right Home brings you 
              a premium collection of lifts and escalators that combine safety, technology, and style.
            </p>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Our lifts are designed to suit both small and large spaces. Whether you're installing a lift 
              in a duplex home or in a high-rise commercial building, we have options that fit.
            </p>
          </CardContent>
        </Card>
        
        <div className="grid gap-8 md:grid-cols-2">
          <Card className="bg-[#111] border-gray-800">
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold text-white mb-4">Our Solutions</h2>
              <p className="text-gray-400 mb-4">
                Comprehensive lift and escalator solutions for every need.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start text-gray-400">
                  <span className="mr-3">🏠</span>
                  <span>Home elevators</span>
                </li>
                <li className="flex items-start text-gray-400">
                  <span className="mr-3">👥</span>
                  <span>Passenger lifts</span>
                </li>
                <li className="flex items-start text-gray-400">
                  <span className="mr-3">🔮</span>
                  <span>Capsule lifts</span>
                </li>
                <li className="flex items-start text-gray-400">
                  <span className="mr-3">📦</span>
                  <span>Freight lifts</span>
                </li>
                <li className="flex items-start text-gray-400">
                  <span className="mr-3">⚡</span>
                  <span>Escalators for malls and buildings</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-[#111] border-gray-800">
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold text-white mb-4">Premium Features</h2>
              <p className="text-gray-400 mb-4">
                Our lifts come with advanced features for optimal performance.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start text-gray-400">
                  <span className="mr-3">🔇</span>
                  <span>Smooth and quiet operation</span>
                </li>
                <li className="flex items-start text-gray-400">
                  <span className="mr-3">🌱</span>
                  <span>Energy-efficient systems</span>
                </li>
                <li className="flex items-start text-gray-400">
                  <span className="mr-3">✨</span>
                  <span>Stylish cabin interiors</span>
                </li>
                <li className="flex items-start text-gray-400">
                  <span className="mr-3">🎮</span>
                  <span>Advanced control systems</span>
                </li>
                <li className="flex items-start text-gray-400">
                  <span className="mr-3">🛡️</span>
                  <span>Safety-first engineering</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-8 md:grid-cols-2 mt-8">
          <Card className="bg-[#111] border-gray-800">
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold text-white mb-4">Escalator Solutions</h2>
              <p className="text-gray-400 mb-4">
                Our escalators are perfect for various commercial settings.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start text-gray-400">
                  <span className="mr-3">🛍️</span>
                  <span>Shopping complexes</span>
                </li>
                <li className="flex items-start text-gray-400">
                  <span className="mr-3">🏢</span>
                  <span>Offices</span>
                </li>
                <li className="flex items-start text-gray-400">
                  <span className="mr-3">👥</span>
                  <span>Public spaces</span>
                </li>
                <li className="flex items-start text-gray-400">
                  <span className="mr-3">🌆</span>
                  <span>Commercial towers</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-[#111] border-gray-800">
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold text-white mb-4">Comprehensive Service</h2>
              <p className="text-gray-400 mb-4">
                Our expert team provides end-to-end support for your vertical transport needs.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start text-gray-400">
                  <span className="mr-3">🔧</span>
                  <span>Professional installation</span>
                </li>
                <li className="flex items-start text-gray-400">
                  <span className="mr-3">📏</span>
                  <span>Custom sizing options</span>
                </li>
                <li className="flex items-start text-gray-400">
                  <span className="mr-3">🔨</span>
                  <span>Regular servicing and maintenance</span>
                </li>
                <li className="flex items-start text-gray-400">
                  <span className="mr-3">👨‍💼</span>
                  <span>Expert engineering guidance</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-8 bg-[#111] border-gray-800">
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold text-white mb-4">Our Installation Process</h2>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="text-center p-4">
                <div className="text-3xl mb-2">📋</div>
                <h3 className="text-white font-semibold mb-2">Assessment</h3>
                <p className="text-gray-400 text-sm">Site evaluation and requirements analysis</p>
              </div>
              <div className="text-center p-4">
                <div className="text-3xl mb-2">✏️</div>
                <h3 className="text-white font-semibold mb-2">Design</h3>
                <p className="text-gray-400 text-sm">Custom system design and planning</p>
              </div>
              <div className="text-center p-4">
                <div className="text-3xl mb-2">🔧</div>
                <h3 className="text-white font-semibold mb-2">Installation</h3>
                <p className="text-gray-400 text-sm">Professional installation with safety checks</p>
              </div>
              <div className="text-center p-4">
                <div className="text-3xl mb-2">✅</div>
                <h3 className="text-white font-semibold mb-2">Maintenance</h3>
                <p className="text-gray-400 text-sm">Regular servicing and support</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-8 bg-[#111] border-gray-800">
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold text-white mb-4">Our Promise</h2>
            <p className="text-gray-400 text-center text-lg italic">
              "With Right Home, vertical movement is no longer a challenge — it's a comfort and a design feature. 
              Choose Right Home for lifts and escalators that move you forward in style."
            </p>
          </CardContent>
        </Card>

        {!loading && galleryImages.length > 0 && (
          <ImageGallery 
            images={galleryImages} 
            title="Our Lift & Escalator Projects"
            groupBySubService={true}
          />
        )}
      </div>
    </div>
  );
};

export default Lifts; 