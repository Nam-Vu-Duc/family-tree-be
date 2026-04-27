import express from 'express';
import {
  register,
  login,
  verify,
  getAllUsers,
  updateProfile,
  deactivateAccount,
} from '../controllers/authController.js';
import { verifyToken, verifyAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

/**
 * Public routes (no authentication required)
 */

// Register new user
// POST /api/auth/register
router.post('/register', register);

// Login user
// POST /api/auth/login
router.post('/login', login);

/**
 * Protected routes (authentication required)
 */

// Verify token
// GET /api/auth/verify
router.get('/verify', verifyToken, verify);

// Update user profile
// PUT /api/auth/profile
router.put('/profile', verifyToken, updateProfile);

// Deactivate account
// DELETE /api/auth/account
router.delete('/account', verifyToken, deactivateAccount);

/**
 * Admin only routes
 */

// Get all users
// GET /api/auth/users
router.get('/users', verifyToken, verifyAdmin, getAllUsers);

export default router;
