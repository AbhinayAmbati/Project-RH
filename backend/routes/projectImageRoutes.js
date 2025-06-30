const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { protect } = require('../middleware/protectedRoute');
const imageController = require('../controllers/projectImageController');

console.log('Image Controller:', imageController);
console.log('Upload Image Function:', imageController.uploadImage);

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer for handling file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  // Accept images only
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return cb(new Error('Only image files are allowed!'), false);
  }
  cb(null, true);
};

const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB max file size
  }
});

// Test route to verify basic routing works
router.get('/test', (req, res) => {
  res.json({ message: 'Test route working' });
});

// Define the upload middleware
const uploadMiddleware = upload.single('image');

// Routes with simplified handlers
router.post('/upload', protect, uploadMiddleware, function(req, res) {
  return imageController.uploadImage(req, res);
});

router.get('/service/:service', function(req, res) {
  return imageController.getImagesByService(req, res);
});

router.delete('/:id', protect, function(req, res) {
  return imageController.deleteImage(req, res);
});

module.exports = router; 