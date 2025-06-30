import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import Navigation from '@/components/Navigation';
import ImageGallery from '@/components/ui/image-gallery';

const constructionImages = [
  {
    url: "/images/construction/project1.jpg",
    title: "Modern Villa Project",
    description: "Luxury 5-bedroom villa with contemporary design in premium location"
  },
  {
    url: "/images/construction/project2.jpg",
    title: "Commercial Complex",
    description: "Multi-story commercial building with state-of-the-art facilities"
  },
  {
    url: "/images/construction/project3.jpg",
    title: "Residential Apartments",
    description: "High-rise residential complex with modern amenities"
  },
  {
    url: "/images/construction/project4.jpg",
    title: "Industrial Warehouse",
    description: "Large-scale industrial warehouse with advanced storage solutions"
  },
  {
    url: "/images/construction/project5.jpg",
    title: "Shopping Mall",
    description: "Modern shopping mall with entertainment facilities"
  },
  {
    url: "/images/construction/project6.jpg",
    title: "Office Building",
    description: "Corporate office building with sustainable design features"
  }
];

const Construction = () => {
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

        <ImageGallery 
          images={constructionImages} 
          title="Our Construction Projects" 
        />
      </div>
    </div>
  );
};

export default Construction;