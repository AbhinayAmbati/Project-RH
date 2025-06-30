import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { Loader2, Trash2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { API_URL } from '@/config/api';

const services = [
  { value: 'architecture', label: 'Architecture', icon: '🏛️' },
  { value: 'interiors', label: 'Interiors', icon: '🪑' },
  { value: 'automation', label: 'Automation', icon: '🤖' },
  { value: 'construction', label: 'Construction', icon: '🏗️' },
  { value: 'kitchens', label: 'Kitchens', icon: '🍽️' },
  { value: 'engineering', label: 'Engineering', icon: '⚙️' },
  { value: 'lifts', label: 'Lifts', icon: '🛗' },
  { value: 'tiles', label: 'Tiles', icon: '🚿' }
];

interface ProjectImage {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  service: string;
  createdAt: string;
}

const ProjectImages = () => {
  const [selectedService, setSelectedService] = useState<string>('');
  const [images, setImages] = useState<ProjectImage[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();
  const [dialogOpen, setDialogOpen] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    service: '',
    image: null as File | null
  });

  useEffect(() => {
    if (selectedService) {
      fetchImages(selectedService);
    }
  }, [selectedService]);

  const fetchImages = async (service: string) => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/project-images/service/${service}`);
      const data = await response.json();
      setImages(data);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch images',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.image || !formData.title || !formData.description || !formData.service) {
      toast({
        title: 'Error',
        description: 'Please fill in all fields',
        variant: 'destructive'
      });
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('service', formData.service);
    formDataToSend.append('image', formData.image);

    try {
      setUploading(true);
      const response = await fetch(`${API_URL}/project-images/upload`, {
        method: 'POST',
        body: formDataToSend,
        credentials: 'include'
      });

      if (!response.ok) throw new Error('Upload failed');

      toast({
        title: 'Success',
        description: 'Image uploaded successfully'
      });

      setDialogOpen(false);
      setFormData({ title: '', description: '', service: '', image: null });
      if (selectedService === formData.service) {
        fetchImages(selectedService);
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to upload image',
        variant: 'destructive'
      });
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this image?')) return;

    try {
      const response = await fetch(`${API_URL}/project-images/${id}`, {
        method: 'DELETE',
        credentials: 'include'
      });

      if (!response.ok) throw new Error('Delete failed');

      toast({
        title: 'Success',
        description: 'Image deleted successfully'
      });

      setImages(images.filter(img => img._id !== id));
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete image',
        variant: 'destructive'
      });
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Project Images</h2>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gold text-black hover:bg-gold/80">Upload New Image</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-black">Upload Project Image</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  className="bg-white text-black"
                  value={formData.title}
                  onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter image title"
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  className="bg-white text-black"
                  value={formData.description}
                  onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Enter image description"
                />
              </div>
              <div>
                <Label htmlFor="service">Service</Label>
                <Select
                  value={formData.service}
                  onValueChange={value => setFormData(prev => ({ ...prev, service: value }))}
                >
                  <SelectTrigger className="bg-white text-black">
                    <SelectValue placeholder="Select a service" />
                  </SelectTrigger>
                  <SelectContent>
                    {services.map(service => (
                      <SelectItem key={service.value} value={service.value}>
                        <span className="flex items-center gap-2">
                          {service.icon} {service.label}
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="image">Image</Label>
                <Input
                  className="bg-white text-black"
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={e => setFormData(prev => ({ ...prev, image: e.target.files?.[0] || null }))}
                />
              </div>
              <Button type="submit" disabled={uploading} className="w-full">
                {uploading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Upload'}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="mb-6">
        <Select value={selectedService} onValueChange={setSelectedService}>
          <SelectTrigger className="w-[200px] bg-gold text-black hover:bg-gold/80">
            <SelectValue placeholder="Select a service" />
          </SelectTrigger>
          <SelectContent>
            {services.map(service => (
              <SelectItem key={service.value} value={service.value}>
                <span className="flex items-center gap-2">
                  {service.icon} {service.label}
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {loading ? (
        <div className="flex justify-center">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      ) : selectedService ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images && images.length > 0 ? (
            images.map(image => (
              <Card key={image._id} className="overflow-hidden bg-[#111] border-gray-800">
                <div className="aspect-video relative group">
                  <img
                    src={image.imageUrl}
                    alt={image.title}
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="p-4 text-white">
                      <h3 className="font-semibold">{image.title}</h3>
                      <p className="text-sm text-gray-300">{image.description}</p>
                      <Button
                        variant="destructive"
                        size="sm"
                        className="mt-2"
                        onClick={() => handleDelete(image._id)}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-400">
              No images found for this service.
            </div>
          )}
        </div>
      ) : (
        <div className="text-center text-gray-400">
          Please select a service to view images.
        </div>
      )}
    </div>
  );
};

export default ProjectImages; 