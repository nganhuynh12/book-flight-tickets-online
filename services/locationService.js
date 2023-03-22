const Location = require('../models/location.model');
const baseService = require('./baseService');

class locationService extends baseService {}

module.exports = new locationService(Location);
