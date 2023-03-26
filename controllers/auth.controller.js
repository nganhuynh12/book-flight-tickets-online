const { validationResult } = require('express-validator');
const { authService } = require('../services');

class authController {
  show(req, res, next) {
    res.render('auth');
  }

  async register(req, res, next) {
    try {
      const result = await authService.register(req.body);
      if (result) res.redirect('/test');
    } catch (error) {
      console.log(error);
      res.render('auth', { error_message: error.message });
    }
  }

  async login(req, res, next) {
    if (req.user) {
      res.json({
        success: true,
      });
    }
  }

  async reset(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty) {
      return res.json({ errors: errors.array() });
    }

    const result = await authService.login(req.body);
    res.json(result);
  }

  logout(req, res, next) {
    req.logout((error) => {
      if (error) return error;
      res.redirect('/auth');
    });
  }
}

module.exports = new authController();
