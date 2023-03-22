const { validationResult } = require('express-validator');
const locationService = require('../services/locationService');

class locationController {
  async add(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.json(errors.array());
    }
    const result = await locationService.add(req.body);
    res.json(result);
  }

  async findAll(req, res, next) {
    const result = await locationService.findAll();
    res.json(result);
  }

  async deleteById(req, res, next) {
    const result = await locationService.deleteById(req.params.id);
    res.json(result);
  }

  async updateById(req, res, next) {
    const result = await locationService.updateById(req.params.id, req.body);
    res.json(result);
  }
}

module.exports = new locationController();
