const locationRepository = require('../repositories/locationRepository');

class locationService {
  async find() {
    return await locationRepository.find();
  }

  async add(location) {
    return await locationRepository.save(location);
  }
}

module.exports = new locationService();
