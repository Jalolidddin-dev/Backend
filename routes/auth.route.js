const express = require('express');
const authController = require('../controllers/auth.controller');
const router = express.Router();
const { body } = require('express-validator');

router.post(
  '/register',
  body('email').isEmail(),
  body('userName').isLength({ min: 5, max: 30 }),
  body('password').isLength({ min: 3, max: 30 }),
  authController.register
);
router.post('/login', authController.login);
router.post('/forgot-password', authController.forgotPassword);
router.post('/logout', authController.logout);

module.exports = router;
