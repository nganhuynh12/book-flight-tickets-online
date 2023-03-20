const { body, validationResult } = require('express-validator');
const flightService = require('../services/flightService');

class flightController {
  async add(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json(errors.array());
    }

    const result = await flightService.add(req.body);
    return res.json(result);
  }

  async find(req, res, next) {
    const result = await flightService.find({ where: req.query });

    return res.json(result);
  }
}

module.exports = new flightController();
