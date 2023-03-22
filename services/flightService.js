const baseService = require('./baseService');
const Flight = require('../models/flight.model');

class flightService extends baseService {}

module.exports = new flightService(Flight);
