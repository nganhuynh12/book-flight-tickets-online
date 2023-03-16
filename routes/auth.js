const express = require('express');
const { register, login } = require('../db/user');
const router = express.Router();
const { body, validationResult } = require('express-validator');

router.get('/', function (req, res, next) {
  res.render('auth');
});

router.post(
  '/register',
  body('email').exists().notEmpty().isEmail().normalizeEmail(),
  body('password')
    .exists()
    .isAlphanumeric()
    .notEmpty()
    .isLength({ min: 6, max: 20 }),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const result = await register(req.body.email, req.body.password);
    res.status(201).json(result);
  }
);

router.post(
  '/login',
  body('email').exists().notEmpty().isEmail().normalizeEmail(),
  body('password')
    .exists()
    .isAlphanumeric()
    .notEmpty()
    .isLength({ min: 6, max: 20 }),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({ errors: errors.array() });
    }

    const result = await login(req.body.email, req.body.password);
    res.json(result);
  }
);

module.exports = router;
