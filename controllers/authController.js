const { validationResult } = require('express-validator');
const { register, login } = require('../services/user');

class authController {
  show(req, res, next) {
    res.render('auth');
  }

  async register(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const result = await register(req.body.email, req.body.password);
    res.status(201).json(result);
  }

  async login(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({ errors: errors.array() });
    }

    const result = await login(req.body.email, req.body.password);
    res.json(result);
  }
}

module.exports = new authController();
