import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { Loader2, Trash2, Filter, Edit2, X, Save } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { API_URL } from '@/config/api';
import { useAuth } from '@/context/AuthContext';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

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
  subService: string;
  createdAt: string;
}

const ProjectImages = () => {
  const [selectedService, setSelectedService] = useState<string>('all');
  const [images, setImages] = useState<ProjectImage[]>([]);
  const [filteredImages, setFilteredImages] = useState<ProjectImage[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [previewDialogOpen, setPreviewDialogOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<ProjectImage | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    title: '',
    description: '',
    service: '',
    subService: ''
  });
  const { token } = useAuth();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    service: '',
    subService: '',
    image: null as File | null
  });

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [imageToDelete, setImageToDelete] = useState<ProjectImage | null>(null);

  useEffect(() => {
    fetchAllImages();
  }, []);

  useEffect(() => {
    if (selectedService && selectedService !== 'all') {
      setFilteredImages(images.filter(img => img.service === selectedService));
    } else {
      setFilteredImages(images);
    }
  }, [selectedService, images]);

  const fetchAllImages = async () => {
    try {
      setLoading(true);
      const promises = services.map(service => 
        fetch(`${API_URL}/project-images/service/${service.value}`).then(res => res.json())
      );
      const results = await Promise.all(promises);
      const allImages = results.flat();
      setImages(allImages);
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

  const handleImageClick = (image: ProjectImage) => {
    setSelectedImage(image);
    setEditForm({
      title: image.title,
      description: image.description,
      service: image.service,
      subService: image.subService
    });
    setPreviewDialogOpen(true);
    setIsEditing(false);
  };

  const handleEditSubmit = async () => {
    if (!selectedImage) return;

    try {
      const response = await fetch(`${API_URL}/project-images/${selectedImage._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        credentials: 'include',
        body: JSON.stringify(editForm)
      });

      if (!response.ok) throw new Error('Update failed');

      const updatedImage = await response.json();
      setImages(images.map(img => 
        img._id === selectedImage._id ? { ...img, ...editForm } : img
      ));
      setSelectedImage({ ...selectedImage, ...editForm });
      setIsEditing(false);

      toast({
        title: 'Success',
        description: 'Image details updated successfully'
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update image details',
        variant: 'destructive'
      });
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
    formDataToSend.append('subService', formData.subService);
    formDataToSend.append('image', formData.image);

    try {
      setUploading(true);
      const response = await fetch(`${API_URL}/project-images/upload`, {
        method: 'POST',
        body: formDataToSend,
        credentials: 'include',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) throw new Error('Upload failed');

      const newImage = await response.json();
      
      toast({
        title: 'Success',
        description: 'Image uploaded successfully'
      });

      setUploadDialogOpen(false);
      setFormData({ title: '', description: '', service: '', subService: '', image: null });
      await fetchAllImages(); // Refresh all images
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

  const handleDeleteClick = (image: ProjectImage) => {
    setImageToDelete(image);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!imageToDelete) return;

    try {
      const response = await fetch(`${API_URL}/project-images/${imageToDelete._id}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) throw new Error('Delete failed');

      toast({
        title: 'Success',
        description: 'Image deleted successfully'
      });

      setImages(images.filter(img => img._id !== imageToDelete._id));
      setDeleteDialogOpen(false);
      setPreviewDialogOpen(false);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete image',
        variant: 'destructive'
      });
    }
  };

  const getServiceIcon = (serviceValue: string) => {
    const service = services.find(s => s.value === serviceValue);
    return service ? service.icon : '🖼️';
  };

  const getServiceLabel = (serviceValue: string) => {
    const service = services.find(s => s.value === serviceValue);
    return service ? service.label : serviceValue;
  };

  // Group images by service and then by subService
  const groupedImages = React.useMemo(() => {
    return filteredImages.reduce((acc, image) => {
      if (!acc[image.service]) {
        acc[image.service] = {};
      }
      if (!acc[image.service][image.subService]) {
        acc[image.service][image.subService] = [];
      }
      acc[image.service][image.subService].push(image);
      return acc;
    }, {} as Record<string, Record<string, ProjectImage[]>>);
  }, [filteredImages]);

  // Get unique sub-services for a given service
  const getExistingSubServices = (serviceValue: string) => {
    return Array.from(new Set(
      images
        .filter(img => img.service === serviceValue)
        .map(img => img.subService)
    )).filter(Boolean);
  };

  // Compute existing sub-services for the selected service
  const existingSubServices = React.useMemo(() => {
    if (!formData.service) return [];
    return getExistingSubServices(formData.service);
  }, [formData.service, images]);

  // Compute existing sub-services for editing
  const existingEditSubServices = React.useMemo(() => {
    if (!editForm.service) return [];
    return getExistingSubServices(editForm.service);
  }, [editForm.service, images]);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Project Images</h2>
        <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
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
                <Label htmlFor="subService">Sub Service</Label>
                <div className="space-y-2">
                  <Input
                    id="subService"
                    className="bg-white text-black"
                    value={formData.subService}
                    onChange={e => setFormData(prev => ({ ...prev, subService: e.target.value }))}
                    placeholder="Enter sub service name (e.g., Modern Kitchen, Master Bedroom)"
                    list="subServiceSuggestions"
                  />
                  {existingSubServices.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      <span className="text-sm text-gray-500">Existing sub-services:</span>
                      {existingSubServices.map((subService) => (
                        <Button
                          key={subService}
                          type="button"
                          variant="outline"
                          size="sm"
                          className="text-xs bg-white text-black hover:bg-gray-100"
                          onClick={() => setFormData(prev => ({ ...prev, subService }))}
                        >
                          {subService}
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
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

      <div className="mb-6 flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5" />
          <span className="text-sm text-gray-400">Filter by service:</span>
        </div>
        <Select value={selectedService} onValueChange={setSelectedService}>
          <SelectTrigger className="w-[200px] bg-gold text-black hover:bg-gold/80">
            <SelectValue placeholder="All Services" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Services</SelectItem>
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
      ) : (
        <div className="space-y-12">
          {Object.entries(groupedImages).map(([service, subServices]) => (
            <div key={service} className="space-y-8">
              <h2 className="text-2xl font-bold text-gold flex items-center gap-2">
                {getServiceIcon(service)} {getServiceLabel(service)}
              </h2>
              {Object.entries(subServices).map(([subService, images]) => (
                <div key={`${service}-${subService}`} className="space-y-4 ml-8">
                  <h3 className="text-xl font-semibold text-white">
                    {subService}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {images.map(image => (
                      <Card 
                        key={image._id} 
                        className="overflow-hidden bg-[#111] border-gray-800 hover:border-gold transition-all duration-300 cursor-pointer"
                        onClick={() => handleImageClick(image)}
                      >
                        <div className="aspect-square relative group">
                          <img
                            src={image.imageUrl}
                            alt={image.title}
                            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-black/75 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4">
                            <div>
                              <h3 className="font-semibold text-lg mb-2">{image.title}</h3>
                              <p className="text-sm text-gray-300 line-clamp-3">{image.description}</p>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      {/* Image Preview/Edit Dialog */}
      <Dialog open={previewDialogOpen} onOpenChange={setPreviewDialogOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle className="text-black flex justify-between items-center">
              <span>{isEditing ? 'Edit Image Details' : 'Image Preview'}</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setPreviewDialogOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </DialogTitle>
          </DialogHeader>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="aspect-square relative">
              <img
                src={selectedImage?.imageUrl}
                alt={selectedImage?.title}
                className="object-cover w-full h-full rounded-lg"
              />
            </div>
            
            <div className="space-y-4">
              {isEditing ? (
                <>
                  <div>
                    <Label htmlFor="edit-title">Title</Label>
                    <Input
                      id="edit-title"
                      value={editForm.title}
                      onChange={e => setEditForm(prev => ({ ...prev, title: e.target.value }))}
                      className="bg-white text-black"
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-description">Description</Label>
                    <Textarea
                      id="edit-description"
                      value={editForm.description}
                      onChange={e => setEditForm(prev => ({ ...prev, description: e.target.value }))}
                      className="bg-white text-black min-h-[150px]"
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-service">Service</Label>
                    <Select
                      value={editForm.service}
                      onValueChange={value => setEditForm(prev => ({ ...prev, service: value }))}
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
                    <Label htmlFor="edit-subService">Sub Service</Label>
                    <div className="space-y-2">
                      <Input
                        id="edit-subService"
                        value={editForm.subService}
                        onChange={e => setEditForm(prev => ({ ...prev, subService: e.target.value }))}
                        className="bg-white text-black"
                        placeholder="Enter sub service name"
                        list="editSubServiceSuggestions"
                      />
                      {existingEditSubServices.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          <span className="text-sm text-gray-500">Existing sub-services:</span>
                          {existingEditSubServices.map((subService) => (
                            <Button
                              key={subService}
                              type="button"
                              variant="outline"
                              size="sm"
                              className="text-xs bg-white text-black hover:bg-gray-100"
                              onClick={() => setEditForm(prev => ({ ...prev, subService }))}
                            >
                              {subService}
                            </Button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2 pt-4">
                    <Button onClick={handleEditSubmit} className="flex-1">
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setIsEditing(false)}
                      className="flex-1 text-black"
                    >
                      Cancel
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <h3 className="text-lg font-semibold text-black">{selectedImage?.title}</h3>
                    <p className="text-sm text-gray-500">
                      {getServiceIcon(selectedImage?.service || '')} {getServiceLabel(selectedImage?.service || '')} - {selectedImage?.subService}
                    </p>
                  </div>
                  <p className="text-gray-600">{selectedImage?.description}</p>
                  <div className="flex gap-2 pt-4 text-black">
                    <Button
                      onClick={() => setIsEditing(true)}
                      variant="outline"
                      className="flex-1"
                    >
                      <Edit2 className="h-4 w-4 mr-2" color='black'/>
                      Edit Details
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => selectedImage && handleDeleteClick(selectedImage)}
                      className="flex-1"
                    >
                      <Trash2 className="h-4 w-4 mr-2"/>
                      Delete Image
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to delete this image?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the image
              "{imageToDelete?.title}" from the server.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDeleteDialogOpen(false)} className='text-black'>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Datalists for sub-service suggestions */}
      <datalist id="subServiceSuggestions">
        {existingSubServices.map((subService) => (
          <option key={subService} value={subService} />
        ))}
      </datalist>
      <datalist id="editSubServiceSuggestions">
        {existingEditSubServices.map((subService) => (
          <option key={subService} value={subService} />
        ))}
      </datalist>
    </div>
  );
};

export default ProjectImages; 