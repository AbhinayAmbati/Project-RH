import React, { useEffect, useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import Navigation from '@/components/Navigation';
import ImageGallery from '@/components/ui/image-gallery';
import { API_URL } from '@/config/api';
import ContactSection from '@/components/ContactSection';

interface Image {
  url: string;
  title: string;
  description: string;
}

const Tiles = () => {
  const [images, setImages] = useState<Image[]>([]);
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

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-space-dark text-white">
      <div className="container-max py-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-8">
          Premium <span className="text-gradient">Tiles</span>
        </h1>
        <p className="text-xl text-gray-300 mb-12 max-w-4xl">
          Explore our collection of premium tiles that add elegance to any space. 
          From classic designs to modern patterns, we offer tiles that transform floors and walls.
        </p>

        {images.length > 0 ? (
          <ImageGallery images={images} title="Our Tile Projects" />
        ) : (
          <p className="text-gray-400">No images available at the moment.</p>
        )}
      </div>
      
      <ContactSection />
    </div>
  );
};

export default Tiles; 