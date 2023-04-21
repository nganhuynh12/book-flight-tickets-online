const express = require('express');
const { body } = require('express-validator');
const passport = require('passport');
const { authController } = require('../controllers');
const localAuthGuard = require('../guards/local-auth.guard');
const validationPipe = require('../pipes/validation.pipe');

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
  validationPipe,
  authController.register.bind(authController)
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
    successRedirect: '/home',
    failureFlash: 'login error',
  }),
  validationPipe,
  authController.login.bind(authController)
);

router.get(
  '/logout',
  localAuthGuard,
  authController.logout.bind(authController)
);

router.post('/reset', authController.reset.bind(authController));

module.exports = router;
