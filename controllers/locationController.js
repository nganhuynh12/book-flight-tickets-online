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

  async find(req, res, next) {
    const result = await locationService.find();
    res.json(result);
  }

  async delete(req, res, next) {
    const result = await locationService.delete(req.params.id);
    res.json(result);
  }

  async update(req, res, next) {
    const result = await locationService.update(req.params.id, req.body);
    res.json(result);
  }
}

module.exports = new locationController();
