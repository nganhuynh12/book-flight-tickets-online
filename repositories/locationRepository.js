const baseRepository = require('./baseRepository');

class locationRepository extends baseRepository {}

module.exports = new locationRepository('location');
