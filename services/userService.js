const User = require('../models/user.model');
const baseService = require('./baseService');

class userSerivce extends baseService {}

module.exports = new userSerivce(User);
