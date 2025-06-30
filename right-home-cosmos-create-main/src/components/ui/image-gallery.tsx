import React, { useState } from 'react';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

interface Image {
  url: string;
  title: string;
  description: string;
}

interface ImageGalleryProps {
  images: Image[];
  title: string;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, title }) => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const handlePrevious = () => {
    setSelectedImage(prev => 
      prev !== null ? (prev === 0 ? images.length - 1 : prev - 1) : null
    );
  };

  const handleNext = () => {
    setSelectedImage(prev => 
      prev !== null ? (prev === images.length - 1 ? 0 : prev + 1) : null
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') handlePrevious();
    if (e.key === 'ArrowRight') handleNext();
    if (e.key === 'Escape') setSelectedImage(null);
  };

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-semibold text-white mb-6">{title}</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((image, index) => (
          <Card 
            key={index}
            className="group relative overflow-hidden cursor-pointer bg-[#111] border-gray-800 hover:border-gold/50 transition-colors"
            onClick={() => setSelectedImage(index)}
          >
            <div className="aspect-video relative">
              <img
                src={image.url}
                alt={image.title}
                className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <div className="p-4 text-white">
                  <h3 className="font-semibold">{image.title}</h3>
                  <p className="text-sm text-gray-300">{image.description}</p>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Dialog open={selectedImage !== null} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent 
          className="max-w-4xl bg-[#111] border-gray-800 p-0"
          onKeyDown={handleKeyDown}
        >
          {selectedImage !== null && (
            <div className="relative">
              <img
                src={images[selectedImage].url}
                alt={images[selectedImage].title}
                className="w-full h-auto"
              />
              
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 text-white/80 hover:text-white bg-black/50 hover:bg-black/70 rounded-full p-2 transition-colors"
              >
                <X size={20} />
              </button>

              <div className="absolute bottom-0 left-0 right-0 bg-black/80 p-4">
                <h3 className="text-white font-semibold text-lg">
                  {images[selectedImage].title}
                </h3>
                <p className="text-gray-300">
                  {images[selectedImage].description}
                </p>
              </div>

              <button
                onClick={handlePrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white bg-black/50 hover:bg-black/70 rounded-full p-2 transition-colors"
              >
                <ChevronLeft size={24} />
              </button>

              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white bg-black/50 hover:bg-black/70 rounded-full p-2 transition-colors"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ImageGallery; 