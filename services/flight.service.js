const baseService = require('./base.service');
const db = require('../models');

class flightService extends baseService {}

module.exports = new flightService(db.flights);
