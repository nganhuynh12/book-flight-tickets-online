const express = require('express');
const { body } = require('express-validator');
const passport = require('passport');
const { authController } = require('../controllers');

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
  passport.authenticate('local', {
    failureRedirect: '/auth',
    successRedirect: '/test',
  }),
  authController.login
);

router.post('/reset', authController.reset);

module.exports = router;
