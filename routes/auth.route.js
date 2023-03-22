const express = require('express');
const { body } = require('express-validator');
const authController = require('../controllers/auth.controller');

const router = express.Router();

router.get('/', authController.show);

router.post(
  '/register',
  body('email').exists().notEmpty().isEmail().normalizeEmail(),
  body('password')
    .exists()
    .isAlphanumeric()
    .notEmpty()
    .isLength({ min: 6, max: 20 }),
  authController.register
);

router.post(
  '/login',
  body('email').exists().notEmpty().isEmail().normalizeEmail(),
  body('password')
    .exists()
    .isAlphanumeric()
    .notEmpty()
    .isLength({ min: 6, max: 20 }),
  authController.login
);

router.post('/reset', authController.reset);

module.exports = router;
