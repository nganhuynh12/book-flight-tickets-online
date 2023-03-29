const bcrypt = require('bcrypt');
const { where } = require('sequelize');
const db = require('../models');

class authService {
  async register(user) {
    const res = await db.users.findOne({ where: { email: user.email } });
    if (res) {
      throw { message: 'Already use email' };
    }
    const hashedPassword = await bcrypt.hash(
      user.password,
      await bcrypt.genSalt(10)
    );
    user.password = hashedPassword;
    return await db.users.create(user);
  }

  async login(user) {
    const usr = await db.users.findOne({ where: { email: user.email } });

    if (usr) {
      const hashedPassword = usr.password;
      if (await bcrypt.compare(user.password, hashedPassword)) {
        return { success: true };
      }
    }
  }

  async reset(user) {
    const res = await db.users.findOne({ where: { email: user.email } });

    if (res.length !== 0) {
    }
  }
}

module.exports = new authService();
