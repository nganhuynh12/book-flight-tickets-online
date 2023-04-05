class authController {
  constructor(service) {
    this.service = service;
  }

  show(req, res, next) {
    return res.render('auth');
  }

  async register(req, res, next) {
    try {
      const result = await this.service.register(req.body);
      if (result.success) {
        return res.redirect('/test');
      } else {
        return res.render('auth', { error_message: res.message });
      }
    } catch (error) {
      console.error(error);
      return res.render('auth', { error_message: error.message });
    }
  }

  async login(req, res, next) {
    if (req.user) {
      return res.json({
        success: true,
      });
    }
  }

  async reset(req, res, next) {
    const result = await this.service.login(req.body);
    return res.json(result);
  }

  logout(req, res, next) {}
}

module.exports = authController;
