const { addFlight, findAllFlight } = require('../repositories/flight');
const { body, validationResult } = require('express-validator');

class flightController {
  async addFlight(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.json(errors.array());
    }

    const result = await addFlight(req.body);
    res.json(result);
  }

  async findAllFlight(req, res, next) {
    const result = await findAllFlight();
    res.json(result);
  }
}

module.exports = new flightController();
