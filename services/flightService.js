const flightRepository = require('../repositories/flightRepository');
const baseService = require('./baseService');

class flightService extends baseService {}

module.exports = new flightService(flightRepository);
