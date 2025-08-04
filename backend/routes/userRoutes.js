import express from 'express';
import {
  loginUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  updateUser,
  getUserById,
  verifyOtp,
  forgotPasswordRequest,
} from '../controllers/userController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// =================================================================
// --- PUBLIC ROUTES ---
// =================================================================
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.post('/verify-otp', verifyOtp);


router.post('/forgot-password', forgotPasswordRequest);
router.post('/reset-password', resetPassword);
// --------------------------------

// =================================================================
// --- PRIVATE & ADMIN ROUTES ---
// =================================================================
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);
router.route('/').get(protect, admin, getUsers);
router.route('/:id').get(protect, admin, getUserById).put(protect, admin, updateUser).delete(protect, admin, deleteUser);

export default router;
