const baseService = require('./base.service');
const db = require('../models');

class userSerivce extends baseService {}

module.exports = new userSerivce(db.users);
