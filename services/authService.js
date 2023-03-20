const userRepository = require('../repositories/userRepository');
const bcrypt = require('bcrypt');

class userSerivce {
  async register(user) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
    return await userRepository.save(user);
  }

  async login(user) {
    const res = await userRepository.find({ where: { email: user.email } });

    if (res.length !== 0) {
      const hashedPassword = res[0].password;
      if (await bcrypt.compare(user.password, hashedPassword)) {
        return { success: true };
      }
    }
  }

  async reset(user) {
    const res = await userRepository.find({ where: { email: user.email } });

    if (res.length !== 0) {
    }
  }
}

module.exports = new userSerivce();
