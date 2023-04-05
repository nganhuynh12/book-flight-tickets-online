const bcrypt = require('bcrypt');
const { log } = require('grunt');

module.exports = class authService {
  constructor(model) {
    this.model = model;
  }

  async register(user) {
    let res = await this.model.findOne({ where: { email: user.email } });
    if (res) {
      return {
        success: false,
        message: 'Already use email',
      };
    }
    const hashedPassword = await bcrypt.hash(
      user.password,
      await bcrypt.genSalt(10)
    );
    user.password = hashedPassword;
    const result = await this.model.create(user);
    if (result) {
      return { success: true, message: 'User created' };
    }
  }

  async reset(user) {
    const res = await this.model.findOne({ where: { email: user.email } });

    if (res.length !== 0) {
    }
  }
};
