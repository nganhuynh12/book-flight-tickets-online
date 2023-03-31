const bcrypt = require('bcrypt');

module.exports = class authService {
  constructor(model) {
    this.model = model;
  }

  async register(user) {
    const res = await this.model.findOne({ where: { email: user.email } });
    if (res) {
      throw { message: 'Already use email' };
    }
    const hashedPassword = await bcrypt.hash(
      user.password,
      await bcrypt.genSalt(10)
    );
    user.password = hashedPassword;
    return await this.model.create(user);
  }

  async login(user) {
    const usr = await this.model.findOne({ where: { email: user.email } });

    if (usr) {
      const hashedPassword = usr.password;
      if (await bcrypt.compare(user.password, hashedPassword)) {
        return { success: true };
      }
    }
  }

  async reset(user) {
    const res = await this.model.findOne({ where: { email: user.email } });

    if (res.length !== 0) {
    }
  }
};
