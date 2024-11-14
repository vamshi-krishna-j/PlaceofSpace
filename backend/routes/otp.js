const express = require('express');
const otpController = require('../controllers/otp');
const otpRouter = express.Router();
otpRouter.post('/send-otp', otpController.sendOTP);
module.exports = otpRouter;