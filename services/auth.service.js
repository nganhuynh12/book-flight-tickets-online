const bcrypt = require('bcrypt');
const db = require('../models');

class authService {
  async register(user) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
    console.log(user);
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
