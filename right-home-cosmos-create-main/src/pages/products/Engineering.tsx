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

const Engineering = () => {
  const [images, setImages] = useState<ProjectImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(`${API_URL}/project-images/service/engineering`);
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

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <Navigation />
      <div className="container mx-auto px-4 py-20">
        <h1 className="text-4xl font-bold text-white mb-8 mt-8 flex items-center gap-3">
          <span className="text-3xl">⚙️</span>
          Engineering Services
        </h1>
        
        <div className="grid gap-8 md:grid-cols-2">
          <Card className="bg-[#111] border-gray-800">
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold text-white mb-4">Our Engineering Expertise</h2>
              <p className="text-gray-400 mb-4">
                Our engineering services combine technical excellence with innovative solutions to deliver 
                reliable and efficient systems for your property. We ensure every project meets the highest 
                standards of safety and performance.
              </p>
              <ul className="list-disc list-inside text-gray-400 space-y-2">
                <li>Structural Engineering</li>
                <li>MEP Systems Design</li>
                <li>Energy Efficiency Solutions</li>
                <li>Technical Consultancy</li>
                <li>System Integration</li>
                <li>Safety Compliance</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-[#111] border-gray-800">
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold text-white mb-4">Why Choose Our Engineering Services</h2>
              <ul className="space-y-4 text-gray-400">
                <li className="flex items-start">
                  <span className="mr-2">🎓</span>
                  <span>Certified professional engineers</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">💡</span>
                  <span>Innovative technical solutions</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">📊</span>
                  <span>Data-driven approach</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">🛡️</span>
                  <span>Safety-first methodology</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">🌱</span>
                  <span>Sustainable engineering practices</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-8 bg-[#111] border-gray-800">
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold text-white mb-4">Our Engineering Process</h2>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="text-center p-4">
                <div className="text-3xl mb-2">📋</div>
                <h3 className="text-white font-semibold mb-2">Analysis</h3>
                <p className="text-gray-400 text-sm">Comprehensive system analysis and requirements gathering</p>
              </div>
              <div className="text-center p-4">
                <div className="text-3xl mb-2">🔬</div>
                <h3 className="text-white font-semibold mb-2">Design</h3>
                <p className="text-gray-400 text-sm">Detailed engineering design and calculations</p>
              </div>
              <div className="text-center p-4">
                <div className="text-3xl mb-2">⚡</div>
                <h3 className="text-white font-semibold mb-2">Implementation</h3>
                <p className="text-gray-400 text-sm">System installation and integration</p>
              </div>
              <div className="text-center p-4">
                <div className="text-3xl mb-2">✅</div>
                <h3 className="text-white font-semibold mb-2">Testing</h3>
                <p className="text-gray-400 text-sm">Quality assurance and performance verification</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {!loading && galleryImages.length > 0 && (
          <ImageGallery 
            images={galleryImages} 
            title="Our Engineering Projects" 
          />
        )}
      </div>
    </div>
  );
};

export default Engineering; 