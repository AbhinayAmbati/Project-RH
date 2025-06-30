const User = require('../models/User');
const Consultation = require('../models/Consultation');
const bcrypt = require('bcrypt');

// Get admin dashboard stats
const getStats = async (req, res) => {
    try {
        // Get current date and date 6 months ago
        const now = new Date();
        const sixMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 5, 1);

        const [
            totalUsers,
            totalConsultations,
            pendingConsultations,
            completedConsultations,
            monthlyConsultations,
            monthlyUsers
        ] = await Promise.all([
            User.countDocuments(),
            Consultation.countDocuments(),
            Consultation.countDocuments({ status: 'pending' }),
            Consultation.countDocuments({ status: 'completed' }),
            Consultation.aggregate([
                {
                    $match: {
                        createdAt: { $gte: sixMonthsAgo }
                    }
                },
                {
                    $group: {
                        _id: {
                            year: { $year: "$createdAt" },
                            month: { $month: "$createdAt" }
                        },
                        count: { $sum: 1 }
                    }
                },
                {
                    $sort: { "_id.year": 1, "_id.month": 1 }
                }
            ]),
            User.aggregate([
                {
                    $match: {
                        createdAt: { $gte: sixMonthsAgo }
                    }
                },
                {
                    $group: {
                        _id: {
                            year: { $year: "$createdAt" },
                            month: { $month: "$createdAt" }
                        },
                        count: { $sum: 1 }
                    }
                },
                {
                    $sort: { "_id.year": 1, "_id.month": 1 }
                }
            ])
        ]);

        // Process monthly stats
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const monthlyStats = [];

        // Initialize monthly stats for the last 6 months
        for (let i = 0; i < 6; i++) {
            const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
            const monthKey = `${date.getFullYear()}-${date.getMonth() + 1}`;
            
            const consultationData = monthlyConsultations.find(
                item => item._id.year === date.getFullYear() && item._id.month === (date.getMonth() + 1)
            );
            
            const userData = monthlyUsers.find(
                item => item._id.year === date.getFullYear() && item._id.month === (date.getMonth() + 1)
            );

            monthlyStats.unshift({
                month: monthNames[date.getMonth()],
                consultations: consultationData?.count || 0,
                users: userData?.count || 0
            });
        }

        res.status(200).json({
            success: true,
            data: {
                totalUsers,
                totalConsultations,
                pendingConsultations,
                completedConsultations,
                monthlyStats
            }
        });
    } catch (error) {
        console.error('Stats error:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching stats'
        });
    }
};

// Get all users
const getUsers = async (req, res) => {
    try {
        const users = await User.find()
            .select('-password')
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            data: users
        });
    } catch (error) {
        console.error('Get users error:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching users'
        });
    }
};

// Check if user is last admin
const isLastAdmin = async (currentUserId) => {
    const adminCount = await User.countDocuments({ role: 'admin' });
    const isRequestedUserAdmin = await User.exists({ _id: currentUserId, role: 'admin' });
    return adminCount === 1 && isRequestedUserAdmin;
};

// Delete user
const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        // Prevent deleting self
        if (user._id.toString() === req.user._id.toString()) {
            // Check if this is the last admin
            if (await isLastAdmin(user._id)) {
                return res.status(400).json({
                    success: false,
                    message: 'Cannot delete the last admin account'
                });
            }
            return res.status(400).json({
                success: false,
                message: 'You cannot delete your own account'
            });
        }

        await user.deleteOne();

        res.status(200).json({
            success: true,
            message: 'User deleted successfully'
        });
    } catch (error) {
        console.error('Delete user error:', error);
        res.status(500).json({
            success: false,
            message: 'Error deleting user'
        });
    }
};

// Promote user to admin
const promoteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        if (user.role === 'admin') {
            return res.status(400).json({
                success: false,
                message: 'User is already an admin'
            });
        }

        user.role = 'admin';
        await user.save();

        res.status(200).json({
            success: true,
            message: 'User promoted to admin successfully'
        });
    } catch (error) {
        console.error('Promote user error:', error);
        res.status(500).json({
            success: false,
            message: 'Error promoting user'
        });
    }
};

// Demote admin to user
const demoteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        if (user.role !== 'admin') {
            return res.status(400).json({
                success: false,
                message: 'User is not an admin'
            });
        }

        // Prevent self-demotion
        if (user._id.toString() === req.user._id.toString()) {
            return res.status(400).json({
                success: false,
                message: 'You cannot demote yourself'
            });
        }

        // Check if this is the last admin
        if (await isLastAdmin(user._id)) {
            return res.status(400).json({
                success: false,
                message: 'Cannot demote the last admin'
            });
        }

        user.role = 'user';
        await user.save();

        res.status(200).json({
            success: true,
            message: 'User demoted to regular user successfully'
        });
    } catch (error) {
        console.error('Demote user error:', error);
        res.status(500).json({
            success: false,
            message: 'Error demoting user'
        });
    }
};

// Create new user
const createUser = async (req, res) => {
    try {
        const { name, email, password, role, phone, address } = req.body;

        // Validate input
        if (!name || !email || !password || !phone || !address) {
            return res.status(400).json({
                success: false,
                message: 'Please provide name, email, password, phone and address'
            });
        }

        // Check if user exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({
                success: false,
                message: 'User already exists'
            });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role: role || 'user',
            isVerified: true, // Admin-created users are automatically verified
            phone,
            address
        });

        // Remove password from response
        const userResponse = user.toObject();
        delete userResponse.password;

        res.status(201).json({
            success: true,
            data: userResponse,
            message: 'User created successfully'
        });
    } catch (error) {
        console.error('Create user error:', error);
        res.status(500).json({
            success: false,
            message: 'Error creating user'
        });
    }
};

module.exports = {
    getStats,
    getUsers,
    deleteUser,
    promoteUser,
    demoteUser,
    createUser
}; 