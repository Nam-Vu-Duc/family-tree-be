import express from 'express';
import { verifyPasscode, checkPasscodeEnabled } from '../controllers/passcodeController.js';

const router = express.Router();

/**
 * Passcode Routes
 * Base path: /api/passcode
 */

// Public routes (không cần authentication)
router.post('/verify', verifyPasscode);
router.get('/check', checkPasscodeEnabled);

export default router;
