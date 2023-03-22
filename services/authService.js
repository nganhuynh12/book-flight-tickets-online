const bcrypt = require('bcrypt');
const User = require('../models/user.model');

class userSerivce {
  async register(user) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
    console.log(user);
    return await User.create(user);
  }

  async login(user) {
    const usr = await User.findOne({ where: { email: user.email } });

    if (usr) {
      const hashedPassword = usr.password;
      if (await bcrypt.compare(user.password, hashedPassword)) {
        return { success: true };
      }
    }
  }

  async reset(user) {
    const res = await User.findOne({ where: { email: user.email } });

    if (res.length !== 0) {
    }
  }
}

module.exports = new userSerivce();
