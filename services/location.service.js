const Location = require('../models/location.model');
const baseService = require('./base.service');

class locationService extends baseService {}

module.exports = new locationService(Location);
