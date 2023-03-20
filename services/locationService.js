const locationRepository = require('../repositories/locationRepository');
const baseService = require('./baseService');

class locationService extends baseService {}

module.exports = new locationService(locationRepository);
