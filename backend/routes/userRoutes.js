const express = require('express');
const router = express.Router();
const { protect } = require("../middleware/protectedRoute");
const { registerUser, verifyEmail, verifyEmailChange, forgotPassword, resetPassword, changePassword, logout, deleteAccount, updateProfile, updatePassword, loginUser, getUser } = require("../controllers/userController");

router.post("/register", registerUser);
router.post("/verify-email", verifyEmail);
router.post("/verify-email-change", verifyEmailChange);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.post("/change-password", protect, changePassword);
router.post("/logout", protect, logout);
router.post("/delete-account", protect, deleteAccount);
router.post("/update-profile", protect, updateProfile);
router.post("/update-password", protect, updatePassword);
router.post("/login", loginUser);
router.get("/me", protect, getUser);


module.exports = router;
