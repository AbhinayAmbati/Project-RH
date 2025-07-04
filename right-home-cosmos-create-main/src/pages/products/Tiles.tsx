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

const Tiles = () => {
  const [images, setImages] = useState<ProjectImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(`${API_URL}/project-images/service/tiles`);
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

  const tileFeatures = [
    'Material selection',
    'Pattern design',
    'Color coordination',
    'Installation planning',
    'Maintenance guidance',
    'Cost estimation'
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
          service="Tile Selection"
          description="Choose the perfect tiles for your space with expert guidance. We'll help you select the right materials, patterns, and colors."
          features={tileFeatures}
          className="mb-12"
        />

        <h1 className="text-4xl font-bold text-white mb-8 mt-8 flex items-center gap-3">
          <span className="text-3xl">🏷️</span>
          Premium Tiles Collection
        </h1>

        <Card className="bg-[#111] border-gray-800 mb-8">
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold text-white mb-4">Tiles That Set the Tone of Your Space</h2>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Tiles are not just for covering floors and walls — they define the mood, feel, and look of your space. 
              At Right Home, we offer a wide and exciting range of tiles that cater to all types of homes and offices.
            </p>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Whether you're looking for classy whites, bold colors, or natural stone textures, you'll find a match with us. 
              Our tiles come in various sizes and finishes to fit all spaces — from small apartments to luxury villas, 
              from workspaces to showrooms.
            </p>
          </CardContent>
        </Card>

        <div className="grid gap-8 md:grid-cols-2">
          <Card className="bg-[#111] border-gray-800">
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold text-white mb-4">Our Collection</h2>
              <p className="text-gray-400 mb-4">
                Explore our comprehensive range of tiles for every space and purpose.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start text-gray-400">
                  <span className="mr-3">🏠</span>
                  <span>Floor tiles</span>
                </li>
                <li className="flex items-start text-gray-400">
                  <span className="mr-3">🧱</span>
                  <span>Wall tiles</span>
                </li>
                <li className="flex items-start text-gray-400">
                  <span className="mr-3">🛁</span>
                  <span>Bathroom tiles</span>
                </li>
                <li className="flex items-start text-gray-400">
                  <span className="mr-3">🍳</span>
                  <span>Kitchen tiles</span>
                </li>
                <li className="flex items-start text-gray-400">
                  <span className="mr-3">🌳</span>
                  <span>Outdoor and parking tiles</span>
                </li>
                <li className="flex items-start text-gray-400">
                  <span className="mr-3">✨</span>
                  <span>Designer and feature wall tiles</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-[#111] border-gray-800">
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold text-white mb-4">Finishes & Textures</h2>
              <p className="text-gray-400 mb-4">
                Choose from our diverse range of finishes to match your style and preferences.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start text-gray-400">
                  <span className="mr-3">💎</span>
                  <span>Marble finish</span>
                </li>
                <li className="flex items-start text-gray-400">
                  <span className="mr-3">🪵</span>
                  <span>Wooden finish</span>
                </li>
                <li className="flex items-start text-gray-400">
                  <span className="mr-3">✨</span>
                  <span>Glossy and matte textures</span>
                </li>
                <li className="flex items-start text-gray-400">
                  <span className="mr-3">🎨</span>
                  <span>Traditional and modern patterns</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-8 bg-[#111] border-gray-800">
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold text-white mb-4">Quality Assurance</h2>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="text-center p-4">
                <div className="text-3xl mb-2">💪</div>
                <h3 className="text-white font-semibold mb-2">Durable</h3>
                <p className="text-gray-400 text-sm">Built to last and maintain beauty</p>
              </div>
              <div className="text-center p-4">
                <div className="text-3xl mb-2">🧹</div>
                <h3 className="text-white font-semibold mb-2">Easy to Clean</h3>
                <p className="text-gray-400 text-sm">Simple maintenance for busy lives</p>
              </div>
              <div className="text-center p-4">
                <div className="text-3xl mb-2">💧</div>
                <h3 className="text-white font-semibold mb-2">Resistant</h3>
                <p className="text-gray-400 text-sm">Stain and water resistant</p>
              </div>
              <div className="text-center p-4">
                <div className="text-3xl mb-2">💰</div>
                <h3 className="text-white font-semibold mb-2">Flexible Range</h3>
                <p className="text-gray-400 text-sm">Budget-friendly to premium options</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-8 bg-[#111] border-gray-800">
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold text-white mb-4">Expert Guidance</h2>
            <p className="text-gray-400 mb-4">
              Our dedicated team is here to help you choose the right tiles based on your:
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center p-4">
                <div className="text-3xl mb-2">📐</div>
                <h3 className="text-white font-semibold">Space</h3>
              </div>
              <div className="text-center p-4">
                <div className="text-3xl mb-2">💡</div>
                <h3 className="text-white font-semibold">Lighting</h3>
              </div>
              <div className="text-center p-4">
                <div className="text-3xl mb-2">👥</div>
                <h3 className="text-white font-semibold">Usage</h3>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-8 bg-[#111] border-gray-800">
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold text-white mb-4">Our Promise</h2>
            <p className="text-gray-400 text-center text-lg italic">
              "At Right Home, we believe good flooring is the foundation of a beautiful space. 
              Let your floors, walls, and surroundings speak the language of elegance — only with Right Home's exclusive tile collection."
            </p>
          </CardContent>
        </Card>

        {!loading && galleryImages.length > 0 && (
          <ImageGallery 
            images={galleryImages} 
            title="Our Tile Projects"
            groupBySubService={true}
          />
        )}
      </div>
    </div>
  );
};

export default Tiles;