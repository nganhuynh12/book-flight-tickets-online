const { validationResult } = require('express-validator');
const { addLocation, findAllLocation } = require('../services/location');

class locationController {
  async addLocation(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.json(errors.array());
    }

    const result = await addLocation(req.body);
    res.json(result);
  }

  async findAllLocation(req, res, next) {
    const result = await findAllLocation();
    res.json(result);
  }
}

module.exports = new locationController();
