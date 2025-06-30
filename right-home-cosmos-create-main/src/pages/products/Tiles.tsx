import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import Navigation from '@/components/Navigation';

const Tiles = () => {
  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <Navigation />
      <div className="container mx-auto px-4 py-20">
        <h1 className="text-4xl font-bold text-white mb-8 mt-8 flex items-center gap-3">
          <span className="text-3xl">🚿</span>
          Tile Solutions
        </h1>
        
        <div className="grid gap-8 md:grid-cols-2">
          <Card className="bg-[#111] border-gray-800">
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold text-white mb-4">Our Tile Expertise</h2>
              <p className="text-gray-400 mb-4">
                Transform your spaces with our premium tile solutions. We offer a wide range of tiles 
                and expert installation services to create stunning, durable surfaces for any area of your home.
              </p>
              <ul className="list-disc list-inside text-gray-400 space-y-2">
                <li>Ceramic Tiles</li>
                <li>Porcelain Tiles</li>
                <li>Natural Stone</li>
                <li>Mosaic Designs</li>
                <li>Custom Patterns</li>
                <li>Waterproofing Solutions</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-[#111] border-gray-800">
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold text-white mb-4">Why Choose Our Tile Services</h2>
              <ul className="space-y-4 text-gray-400">
                <li className="flex items-start">
                  <span className="mr-2">🎨</span>
                  <span>Wide selection of designs</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">💪</span>
                  <span>Expert installation team</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✨</span>
                  <span>Premium quality materials</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">🛡️</span>
                  <span>Long-lasting durability</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">💫</span>
                  <span>Perfect finishing touches</span>
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
                <div className="text-3xl mb-2">🎯</div>
                <h3 className="text-white font-semibold mb-2">Consultation</h3>
                <p className="text-gray-400 text-sm">Design selection and space assessment</p>
              </div>
              <div className="text-center p-4">
                <div className="text-3xl mb-2">📏</div>
                <h3 className="text-white font-semibold mb-2">Planning</h3>
                <p className="text-gray-400 text-sm">Layout design and material preparation</p>
              </div>
              <div className="text-center p-4">
                <div className="text-3xl mb-2">🔨</div>
                <h3 className="text-white font-semibold mb-2">Installation</h3>
                <p className="text-gray-400 text-sm">Professional tile setting and grouting</p>
              </div>
              <div className="text-center p-4">
                <div className="text-3xl mb-2">✨</div>
                <h3 className="text-white font-semibold mb-2">Finishing</h3>
                <p className="text-gray-400 text-sm">Final touches and quality inspection</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Tiles; 