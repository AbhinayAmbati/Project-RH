const ProjectImage = require('../models/ProjectImage');
const cloudinary = require('../config/cloudinaryConfig');
const fs = require('fs');

// Define the controller object
const projectImageController = {
  uploadImage: async (req, res) => {
    try {
      // Check if file exists in request
      if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
      }

      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'project-images',
        use_filename: true
      });

      // Create new project image document
      const newImage = new ProjectImage({
        title: req.body.title,
        description: req.body.description,
        service: req.body.service,
        subService: req.body.subService,
        imageUrl: result.secure_url,
        cloudinaryId: result.public_id
      });

      // Save to database
      await newImage.save();

      // Delete local file after upload
      fs.unlinkSync(req.file.path);

      res.status(201).json({
        message: 'Image uploaded successfully',
        image: newImage
      });
    } catch (error) {
      console.error('Error uploading image:', error);
      // Delete local file if it exists
      if (req.file && req.file.path) {
        fs.unlinkSync(req.file.path);
      }
      res.status(500).json({ message: 'Error uploading image', error: error.message });
    }
  },

  updateImage: async (req, res) => {
    try {
      const { id } = req.params;
      const { title, description, service, subService } = req.body;

      const image = await ProjectImage.findById(id);
      if (!image) {
        return res.status(404).json({ message: 'Image not found' });
      }

      // Update the image details
      image.title = title;
      image.description = description;
      image.service = service;
      image.subService = subService;

      await image.save();

      res.json({
        message: 'Image updated successfully',
        image
      });
    } catch (error) {
      console.error('Error updating image:', error);
      res.status(500).json({ message: 'Error updating image', error: error.message });
    }
  },

  getImagesByService: async (req, res) => {
    try {
      const { service } = req.params;
      const images = await ProjectImage.find({ service }).sort({ createdAt: -1 });
      res.json(images);
    } catch (error) {
      console.error('Error fetching images:', error);
      res.status(500).json({ message: 'Error fetching images', error: error.message });
    }
  },

  deleteImage: async (req, res) => {
    try {
      const image = await ProjectImage.findById(req.params.id);
      if (!image) {
        return res.status(404).json({ message: 'Image not found' });
      }

      // Delete image from cloudinary
      await cloudinary.uploader.destroy(image.cloudinaryId);

      // Delete image from database
      await image.deleteOne();

      res.json({ message: 'Image deleted successfully' });
    } catch (error) {
      console.error('Error deleting image:', error);
      res.status(500).json({ message: 'Error deleting image', error: error.message });
    }
  }
};

// Export the controller
module.exports = projectImageController; 