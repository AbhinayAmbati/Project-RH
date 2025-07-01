const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

// Helper function to generate JWT token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
    });
};

// Helper function to send email
const sendEmail = async (email, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        const mailOptions = {
            from: process.env.SMTP_USER,
            to: email,
            subject: subject,
            text: text,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: %s', info.messageId);
        return true;
    } catch (error) {
        console.error('Email sending error:', error);
        return false;
    }
};

const registerUser = async (req, res) => {
    try {
        const { name, email, password, phone, address } = req.body;

        // Validate input
        if (!name || !email || !password || !phone || !address) {
            return res.status(400).json({ message: "Please fill all fields" });
        }

        // Check if user exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create verification token
        const verificationToken = crypto.randomBytes(32).toString("hex");

        // Create user
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            phone,
            address,
            verificationToken,
        });

        if (user) {
            // Send verification email with encoded parameters
            const encodedToken = encodeURIComponent(verificationToken);
            const encodedEmail = encodeURIComponent(email);
            const verificationLink = `${process.env.FRONTEND_URL}/email-verification?token=${encodedToken}&email=${encodedEmail}`;
            
            const emailSent = await sendEmail(
                email,
                "Verify Your Email - Right Home Cosmos",
                `Welcome to Right Home Cosmos!\n\n` +
                `Please click on the following link to verify your email address:\n\n` +
                `${verificationLink}\n\n` +
                `If you did not create this account, please ignore this email.\n\n` +
                `Best regards,\n` +
                `Right Home Cosmos Team`
            );

            if (!emailSent) {
                // If email fails to send, still create the account but inform the user
                return res.status(201).json({
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    phone: user.phone,
                    address: user.address,
                    token: generateToken(user._id),
                    message: "Account created but verification email could not be sent. Please contact support."
                });
            }

            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                token: generateToken(user._id),
                message: "Registration successful! Please check your email to verify your account."
            });
        }
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ message: error.message });
    }
};

const verifyEmail = async (req, res) => {
    try {
        const { email, verificationToken } = req.body;

        if (!email || !verificationToken) {
            return res.status(400).json({ message: "Missing verification parameters" });
        }

        const user = await User.findOne({ 
            email: decodeURIComponent(email),
            verificationToken: decodeURIComponent(verificationToken)
        });

        if (!user) {
            return res.status(400).json({ message: "Invalid verification token or email" });
        }

        if (user.isVerified) {
            return res.status(400).json({ message: "Email is already verified" });
        }

        user.isVerified = true;
        user.verificationToken = undefined;
        await user.save();

        res.status(200).json({ message: "Email verified successfully" });
    } catch (error) {
        console.error("Verification error:", error);
        res.status(500).json({ message: error.message });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({ 
                success: false,
                message: "Please fill all fields" 
            });
        }

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ 
                success: false,
                message: "Invalid credentials" 
            });
        }

        // Check if password matches
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ 
                success: false,
                message: "Invalid credentials" 
            });
        }

        // Check if email is verified
        if (!user.isVerified) {
            return res.status(400).json({ 
                success: false,
                message: "Please verify your email first" 
            });
        }

        // Generate JWT token
        const token = generateToken(user._id);

        // Set cookie options
        const cookieOptions = {
            expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
        };

        // Set the JWT token in a cookie
        res.cookie('token', token, cookieOptions);

        // Send the response
        res.status(200).json({
            success: true,
            data: {
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
            },
            token: token,
            message: "Login successful"
        });
    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: error.message 
        });
    }
};

const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        // Generate reset token
        const resetToken = crypto.randomBytes(32).toString("hex");
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpire = Date.now() + 3600000; // 1 hour
        await user.save();

        // Send reset email
        const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;
        await sendEmail(
            email,
            "Password Reset Request",
            `Please click on this link to reset your password: ${resetLink}`
        );

        res.status(200).json({ message: "Password reset email sent" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const resetPassword = async (req, res) => {
    try {
        const { password, token } = req.body;

        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpire: { $gt: Date.now() },
        });

        if (!user) {
            return res.status(400).json({ message: "Invalid or expired reset token" });
        }

        // Hash new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save();

        res.status(200).json({ message: "Password reset successful" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const changePassword = async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;

        const user = await User.findById(req.user._id);
        
        // Verify old password
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Current password is incorrect" });
        }

        // Hash new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        user.password = hashedPassword;
        await user.save();

        res.status(200).json({ message: "Password changed successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const logout = async (req, res) => {
    try {
        // Since we're using JWT, we don't need to do anything server-side
        // The client should remove the token from storage
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteAccount = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        
        // Check if user is an admin
        if (user.role === 'admin') {
            // Count total admins
            const adminCount = await User.countDocuments({ role: 'admin' });
            
            // If this is the last admin, prevent deletion
            if (adminCount === 1) {
                return res.status(403).json({ 
                    success: false,
                    message: "Cannot delete account: You are the last administrator" 
                });
            }
        }

        await User.findByIdAndDelete(req.user._id);
        res.status(200).json({ 
            success: true,
            message: "Account deleted successfully" 
        });
    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: error.message 
        });
    }
};

const updateProfile = async (req, res) => {
    try {
        const { name, email, phone, address, requireEmailVerification } = req.body;

        const user = await User.findById(req.user._id);
        
        // Check if email is being updated and requires verification
        if (email && email !== user.email && requireEmailVerification) {
            // Check if email is already taken
            const emailExists = await User.findOne({ email });
            if (emailExists) {
                return res.status(400).json({ message: "Email is already in use" });
            }

            // Generate verification token for new email
            const verificationToken = crypto.randomBytes(32).toString("hex");
            
            // Store new email and verification token temporarily
            user.pendingEmail = email;
            user.emailVerificationToken = verificationToken;
            user.emailVerificationExpires = Date.now() + 24 * 60 * 60 * 1000; // 24 hours

            // Send verification email
            const encodedToken = encodeURIComponent(verificationToken);
            const encodedEmail = encodeURIComponent(email);
            const verificationLink = `${process.env.FRONTEND_URL}/verify-email-change?token=${encodedToken}&email=${encodedEmail}`;
            
            const emailSent = await sendEmail(
                email,
                "Verify Your New Email - Right Home Cosmos",
                `Please click on the following link to verify your new email address:\n\n` +
                `${verificationLink}\n\n` +
                `If you did not request this change, please ignore this email.\n\n` +
                `This link will expire in 24 hours.\n\n` +
                `Best regards,\n` +
                `Right Home Cosmos Team`
            );

            if (!emailSent) {
                return res.status(500).json({ message: "Failed to send verification email" });
            }
        } else if (email && email !== user.email) {
            // If email is changed but verification not required (should not happen from frontend)
            return res.status(400).json({ message: "Email change requires verification" });
        }

        // Update other fields
        if (name) user.name = name;
        if (phone) user.phone = phone;
        if (address) user.address = address;

        user.updatedAt = Date.now();
        await user.save();

        // Return response based on whether email is being verified
        if (user.pendingEmail) {
            res.status(200).json({
                message: "Profile updated. Please verify your new email address.",
                requiresEmailVerification: true,
                _id: user._id,
                name: user.name,
                email: user.email, // Return current email, not pending
                phone: user.phone,
                address: user.address,
            });
        } else {
            res.status(200).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
            });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updatePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;
        const user = await User.findById(req.user.id);

        // Check if current password matches
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Current password is incorrect" });
        }

        // Hash new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        // Update password
        user.password = hashedPassword;
        await user.save();

        res.status(200).json({ message: "Password updated successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select("-password");
        res.status(200).json({
            success: true,
            data: user,
            message: "User profile retrieved successfully"
        });
    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: error.message 
        });
    }
};

// Add new function to verify email change
const verifyEmailChange = async (req, res) => {
    try {
        const { token: verificationToken, email } = req.body;

        if (!email || !verificationToken) {
            return res.status(400).json({ 
                success: false,
                message: "Missing verification parameters" 
            });
        }

        const user = await User.findOne({
            pendingEmail: decodeURIComponent(email),
            emailVerificationToken: verificationToken,
            emailVerificationExpires: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({ 
                success: false,
                message: "Invalid or expired verification link" 
            });
        }

        // Update email and clear verification fields
        user.email = user.pendingEmail;
        user.pendingEmail = undefined;
        user.emailVerificationToken = undefined;
        user.emailVerificationExpires = undefined;
        await user.save();

        res.status(200).json({ 
            success: true,
            message: "Email updated successfully" 
        });
    } catch (error) {
        console.error("Email change verification error:", error);
        res.status(500).json({ 
            success: false,
            message: error.message 
        });
    }
};

module.exports = {
    registerUser,
    verifyEmail,
    loginUser,
    forgotPassword,
    resetPassword,
    changePassword,
    logout,
    deleteAccount,
    updateProfile,
    updatePassword,
    getUser,
    verifyEmailChange,
};
