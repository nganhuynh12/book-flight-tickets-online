const { validationResult } = require('express-validator');
const { userService } = require('../services');

class userController {
  async findAll(req, res, next) {
    const result = await userSerivce.findAll();
    return res.json(result);
  }

  async findByPk(req, res, next) {
    const result = await userSerivce.findByPk(req.params.id);
    return res.json(result);
  }

  async updateById(req, res, next) {
    const result = await userService.updateById(req.params.id, req.body);
    return res.json(result);
  }

  async delete(req, res, next) {
    try {
      const result = await userSerivce.deleteById(req.params.id);
      return res.json(result);
    } catch (error) {
      return res.status(400).json(error);
    }
  }
}

module.exports = new userController();
