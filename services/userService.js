const userRepository = require('../repositories/userRepository');

class userSerivce {
  async find() {
    return await userRepository.find();
  }

  async findById(id) {
    return await userRepository.findById(id);
  }

  async add(user) {
    return userRepository.add(user);
  }

  // async updateById(id, user) {
  //   return await userRepository.updateById(id, user)
  // }

  async delete(id) {
    return await userRepository.delete(id);
  }
}

module.exports = new userSerivce();
