const baseService = require('./base.service');
const Flight = require('../models/flight.model');

class flightService extends baseService {}

module.exports = new flightService(Flight);
