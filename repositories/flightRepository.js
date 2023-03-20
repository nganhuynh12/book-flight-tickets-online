const baseRepository = require('./baseRepository');

class flightRepository extends baseRepository {}

module.exports = new flightRepository('flight');
