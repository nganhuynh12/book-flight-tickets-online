const { validationResult } = require('express-validator');
const authService = require('../services/auth.service');

class authController {
  show(req, res, next) {
    res.render('auth');
  }

  async register(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const result = await authService.register(req.body);
    res.status(201).json(result);
  }

  async login(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({ errors: errors.array() });
    }

    const result = await authService.login(req.body);
    res.json(result);
  }

  async reset(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty) {
      return res.json({ errors: errors.array() });
    }

    const result = await authService.login(req.body);
    res.json(result);
  }
}

module.exports = new authController();
