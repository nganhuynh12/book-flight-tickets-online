const baseService = require('./base.service');
const db = require('../models');

class locationService extends baseService {}

module.exports = new locationService(db.locations);
