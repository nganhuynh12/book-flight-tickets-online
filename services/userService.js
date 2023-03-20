const userRepository = require('../repositories/userRepository');
const baseService = require('./baseService');

class userSerivce extends baseService {}

module.exports = new userSerivce(userRepository);
