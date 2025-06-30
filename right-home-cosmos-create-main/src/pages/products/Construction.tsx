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

const Construction = () => {
  const [images, setImages] = useState<ProjectImage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(`${API_URL}/project-images/service/construction`);
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
    description: image.description,
    subService: image.subService
  }));

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <Navigation />
      <div className="container mx-auto px-4 py-20">
        <h1 className="text-4xl font-bold text-white mb-8 mt-8 flex items-center gap-3">
          <span className="text-3xl">🏗️</span>
          Construction Services
        </h1>
        
        <div className="grid gap-8 md:grid-cols-2">
          <Card className="bg-[#111] border-gray-800">
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold text-white mb-4">Our Construction Expertise</h2>
              <p className="text-gray-400 mb-4">
                We deliver excellence in construction with a focus on quality, safety, and innovation. 
                Our experienced team handles projects of all sizes with precision and professionalism.
              </p>
              <ul className="list-disc list-inside text-gray-400 space-y-2">
                <li>Residential Construction</li>
                <li>Commercial Buildings</li>
                <li>Renovation Projects</li>
                <li>Infrastructure Development</li>
                <li>Project Management</li>
                <li>Quality Assurance</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-[#111] border-gray-800">
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold text-white mb-4">Why Choose Our Construction Services</h2>
              <ul className="space-y-4 text-gray-400">
                <li className="flex items-start">
                  <span className="mr-2">🏆</span>
                  <span>Proven track record of successful projects</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">⚡</span>
                  <span>Efficient project execution and timely delivery</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">🛡️</span>
                  <span>Strict safety standards and quality control</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">👥</span>
                  <span>Skilled workforce and expert supervision</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">📊</span>
                  <span>Transparent communication and reporting</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-8 bg-[#111] border-gray-800">
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold text-white mb-4">Our Construction Process</h2>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="text-center p-4">
                <div className="text-3xl mb-2">📝</div>
                <h3 className="text-white font-semibold mb-2">Planning</h3>
                <p className="text-gray-400 text-sm">Detailed project planning and feasibility study</p>
              </div>
              <div className="text-center p-4">
                <div className="text-3xl mb-2">🏗️</div>
                <h3 className="text-white font-semibold mb-2">Construction</h3>
                <p className="text-gray-400 text-sm">Professional execution with quality materials</p>
              </div>
              <div className="text-center p-4">
                <div className="text-3xl mb-2">🔍</div>
                <h3 className="text-white font-semibold mb-2">Quality Control</h3>
                <p className="text-gray-400 text-sm">Rigorous inspection and testing</p>
              </div>
              <div className="text-center p-4">
                <div className="text-3xl mb-2">🔑</div>
                <h3 className="text-white font-semibold mb-2">Handover</h3>
                <p className="text-gray-400 text-sm">Project completion and client satisfaction</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {!loading && galleryImages.length > 0 && (
          <ImageGallery 
            images={galleryImages} 
            title="Our Construction Projects"
            groupBySubService={true}
          />
        )}
      </div>
      <ContactSection />
    </div>
  );
};

export default Construction;