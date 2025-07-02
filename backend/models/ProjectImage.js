const mongoose = require('mongoose');

const projectImageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  cloudinaryId: {
    type: String,
    required: true
  },
  service: {
    type: String,
    required: true,
    enum: ['architecture', 'interiors', 'furniture', 'construction', 'kitchens', 'engineering', 'lifts', 'tiles']
  },
  subService: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('ProjectImage', projectImageSchema); 