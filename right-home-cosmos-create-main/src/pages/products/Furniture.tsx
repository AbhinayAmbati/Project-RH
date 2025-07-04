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

const Furniture = () => {
  const [images, setImages] = useState<ProjectImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(`${API_URL}/project-images/service/furniture`);
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

  const furnitureFeatures = [
    'Custom design consultation',
    'Material selection',
    'Style and finish options',
    'Space planning',
    'Budget optimization',
    'Delivery planning'
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <Loading loading={loading} />
      <Navigation />
      <div className="container mx-auto px-4 py-20">
        <BookConsultation
          service="Furniture"
          description="Explore custom furniture solutions with our experts. We'll help you choose the perfect pieces for your space."
          features={furnitureFeatures}
          className="mb-12"
        />

        <h1 className="text-4xl font-bold text-white mb-8 mt-8 flex items-center gap-3">
          <span className="text-3xl">🛋️</span>
          Artistic Furniture
        </h1>

        <Card className="bg-[#111] border-gray-800 mb-8">
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold text-white mb-4">Comfort with Character</h2>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Furniture is not just something you use — it's something that brings your space to life. 
              At Right Home, we offer a wide range of artistic and functional furniture for homes and offices.
            </p>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Looking for a luxurious center table or a cozy reading chair? Want a customized modular 
              kitchen setup or ergonomic office seating? We've got it all.
            </p>
          </CardContent>
        </Card>
        
        <div className="grid gap-8 md:grid-cols-2">
          <Card className="bg-[#111] border-gray-800">
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold text-white mb-4">Our Collection</h2>
              <p className="text-gray-400 mb-4">
                Explore our comprehensive range of furniture for every space.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start text-gray-400">
                  <span className="mr-3">🛋️</span>
                  <span>Sofas and sectionals</span>
                </li>
                <li className="flex items-start text-gray-400">
                  <span className="mr-3">🛏️</span>
                  <span>Beds and wardrobes</span>
                </li>
                <li className="flex items-start text-gray-400">
                  <span className="mr-3">🪑</span>
                  <span>Dining tables and chairs</span>
                </li>
                <li className="flex items-start text-gray-400">
                  <span className="mr-3">💼</span>
                  <span>Office desks and workstations</span>
                </li>
                <li className="flex items-start text-gray-400">
                  <span className="mr-3">🏢</span>
                  <span>Lounge and reception furniture</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-[#111] border-gray-800">
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold text-white mb-4">Design Styles</h2>
              <p className="text-gray-400 mb-4">
                Choose from a variety of styles to match your aesthetic preferences.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start text-gray-400">
                  <span className="mr-3">🎯</span>
                  <span>Modern</span>
                </li>
                <li className="flex items-start text-gray-400">
                  <span className="mr-3">👑</span>
                  <span>Classic</span>
                </li>
                <li className="flex items-start text-gray-400">
                  <span className="mr-3">✨</span>
                  <span>Minimalist</span>
                </li>
                <li className="flex items-start text-gray-400">
                  <span className="mr-3">🌳</span>
                  <span>Rustic</span>
                </li>
                <li className="flex items-start text-gray-400">
                  <span className="mr-3">💎</span>
                  <span>Luxury designer pieces</span>
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
                <div className="text-3xl mb-2">🏆</div>
                <h3 className="text-white font-semibold mb-2">Quality</h3>
                <p className="text-gray-400 text-sm">High-quality materials</p>
              </div>
              <div className="text-center p-4">
                <div className="text-3xl mb-2">⚒️</div>
                <h3 className="text-white font-semibold mb-2">Craftsmanship</h3>
                <p className="text-gray-400 text-sm">Expert craftsmanship in every piece</p>
              </div>
              <div className="text-center p-4">
                <div className="text-3xl mb-2">🎨</div>
                <h3 className="text-white font-semibold mb-2">Design</h3>
                <p className="text-gray-400 text-sm">Unique and distinctive designs</p>
              </div>
              <div className="text-center p-4">
                <div className="text-3xl mb-2">☁️</div>
                <h3 className="text-white font-semibold mb-2">Comfort</h3>
                <p className="text-gray-400 text-sm">Long-lasting comfort and durability</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-8 bg-[#111] border-gray-800">
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold text-white mb-4">Our Process</h2>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="text-center p-4">
                <div className="text-3xl mb-2">👋</div>
                <h3 className="text-white font-semibold mb-2">Consultation</h3>
                <p className="text-gray-400 text-sm">Understanding your style and needs</p>
              </div>
              <div className="text-center p-4">
                <div className="text-3xl mb-2">✏️</div>
                <h3 className="text-white font-semibold mb-2">Selection</h3>
                <p className="text-gray-400 text-sm">Choosing the perfect pieces</p>
              </div>
              <div className="text-center p-4">
                <div className="text-3xl mb-2">🛠️</div>
                <h3 className="text-white font-semibold mb-2">Customization</h3>
                <p className="text-gray-400 text-sm">Tailoring to your specifications</p>
              </div>
              <div className="text-center p-4">
                <div className="text-3xl mb-2">✨</div>
                <h3 className="text-white font-semibold mb-2">Delivery</h3>
                <p className="text-gray-400 text-sm">Professional installation and setup</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-8 bg-[#111] border-gray-800">
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold text-white mb-4">Our Promise</h2>
            <p className="text-gray-400 text-center text-lg italic">
              "With Right Home furniture, every room becomes more inviting, more stylish, and more complete. 
              Because true comfort is not just how it feels — it's also how it looks."
            </p>
          </CardContent>
        </Card>

        {!loading && galleryImages.length > 0 && (
          <ImageGallery 
            images={galleryImages} 
            title="Our Furniture Collection"
            groupBySubService={true}
          />
        )}
      </div>
    </div>
  );
};

export default Furniture; 