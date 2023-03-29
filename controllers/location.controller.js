const { locationService } = require('../services');

class locationController {
  async add(req, res, next) {
    try {
      const result = await locationService.add(req.body);
      return res.status(201).json(result);
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  async findAll(req, res, next) {
    const result = await locationService.findAll();
    return res.json(result);
  }

  async deleteById(req, res, next) {
    const result = await locationService.deleteById(req.params.id);
    return res.json(result);
  }

  async updateById(req, res, next) {
    const result = await locationService.updateById(req.params.id, req.body);
    return res.json(result);
  }
}

module.exports = new locationController();
