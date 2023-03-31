class authController {
  constructor(service) {
    this.service = service;
  }

  show(req, res, next) {
    return res.render('auth');
  }

  async register(req, res, next) {
    try {
      console.log(this);
      const result = await this.service.register(req.body);
      if (result) return res.redirect('/test');
    } catch (error) {
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

  logout(req, res, next) {
    req.logout((error) => {
      if (error) return error;
      return res.redirect('/auth');
    });
  }
}

module.exports = authController;
