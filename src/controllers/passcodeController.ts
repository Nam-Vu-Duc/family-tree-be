import { Request, Response } from 'express';

/**
 * Passcode Controller - Xử lý xác thực mã unlock
 * 
 * Lưu ý: Mã (passcode) được lưu trong environment variable
 * .env: WEBSITE_PASSCODE=123456
 */

const WEBSITE_PASSCODE = process.env.WEBSITE_PASSCODE || '123456';

/**
 * Verify passcode
 * POST /api/passcode/verify
 * Body: { passcode: string }
 */
export const verifyPasscode = (req: Request, res: Response) => {
  try {
    const { passcode } = req.body;

    // Validate input
    if (!passcode || typeof passcode !== 'string') {
      return res.status(400).json({
        isValid: false,
        message: 'Passcode is required',
      });
    }

    // Check if passcode matches
    const isValid = passcode.trim() === WEBSITE_PASSCODE.trim();

    if (!isValid) {
      return res.status(401).json({
        isValid: false,
        message: 'Invalid passcode',
      });
    }

    // Success
    return res.status(200).json({
      isValid: true,
      message: 'Passcode verified successfully',
      expiresIn: 24 * 60 * 60, // 24 hours in seconds
    });
  } catch (error) {
    console.error('Passcode verification error:', error);
    return res.status(500).json({
      isValid: false,
      message: 'Internal server error',
    });
  }
};

/**
 * Check passcode endpoint (for health check)
 * GET /api/passcode/check
 */
export const checkPasscodeEnabled = (req: Request, res: Response) => {
  return res.status(200).json({
    enabled: true,
    message: 'Website passcode protection is enabled',
  });
};
