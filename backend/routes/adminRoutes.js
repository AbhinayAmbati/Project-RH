const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/protectedRoute');
const {
    getStats,
    getUsers,
    deleteUser,
    promoteUser,
    demoteUser,
    createUser
} = require('../controllers/adminController');

// All routes require authentication and admin role
router.use(protect, admin);

// Stats routes
router.get('/stats', getStats);

// User management routes
router.post('/users', createUser);
router.get('/users', getUsers);
router.delete('/users/:id', deleteUser);
router.post('/users/:id/promote', promoteUser);
router.post('/users/:id/demote', demoteUser);

module.exports = router; 