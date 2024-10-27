const express = require('express');
const router = express.Router();
const { generateOTP, verifyOTP } = require('../controllers/authController');

router.post('/generate-otp', generateOTP);
router.post('/verify-otp', verifyOTP);

module.exports = router;