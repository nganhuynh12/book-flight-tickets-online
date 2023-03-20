const flightRepository = require('../repositories/flightRepository');

class flightService {
  async findAll() {
    return await flightRepository.find();
  }

  async add(flight) {
    return await flightRepository.save(flight);
  }
}

module.exports = new flightService();
