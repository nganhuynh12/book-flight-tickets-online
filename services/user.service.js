const User = require('../models/user.model');
const baseService = require('./base.service');

class userSerivce extends baseService {}

module.exports = new userSerivce(User);
