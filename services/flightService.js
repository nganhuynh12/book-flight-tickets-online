const flightRepository = require('../repositories/flightRepository');

class flightService {
  async find(options) {
    return await flightRepository.find(options);
  }

  async add(flight) {
    return await flightRepository.save(flight);
  }
}

module.exports = new flightService();
