const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/protectedRoute');
const {
    createConsultation,
    getConsultations,
    getConsultation,
    updateConsultation,
    deleteConsultation
} = require('../controllers/consultationController');

// Public route for creating consultations
router.post('/', createConsultation);

// Admin routes
router.get('/', protect, admin, getConsultations);
router.get('/:id', protect, admin, getConsultation);
router.put('/:id', protect, admin, updateConsultation);
router.delete('/:id', protect, admin, deleteConsultation);

module.exports = router;
