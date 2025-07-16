const express = require('express');
const router = express.Router();
const speakeasy = require('speakeasy');
const User = require('../models/User');

// Verify OTP and confirm setup
router.post('/verify-setup', async (req, res) => {
  const { email, token } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Validate OTP
    const verified = speakeasy.totp.verify({
      secret: user.totpSecret,
      encoding: 'base32',
      token,
      window: 1,
    });

    if (!verified) {
      return res.status(400).json({ message: 'Invalid code. Please try again.' });
    }

    // Setup confirmed (you can optionally flag it)
    user.isTwoFactorEnabled = true; // Add this field in your User model if needed
    await user.save();

    res.status(200).json({ message: 'Authenticator App linked successfully ✅', verified: true });
  } catch (err) {
    console.error('Error in verify-setup:', err);
    res.status(500).json({ message: 'Server error during verification.' });
  }
});

module.exports = router;
