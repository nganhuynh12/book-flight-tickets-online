const { body, validationResult } = require('express-validator');
const { flightService } = require('../services');

class flightController {
  async add(req, res, next) {
    const result = await flightService.add(req.body);
    return res.status(201).json(result);
  }

  async findAll(req, res, next) {
    const result = await flightService.findAll({ where: req.query });
    return res.json(result);
  }
}

module.exports = new flightController();
