const { validationResult } = require('express-validator');
const { userService } = require('../services');

class userController {
  async findAll(req, res, next) {
    const result = await userSerivce.findAll();
    res.json(result);
  }

  async findByPk(req, res, next) {
    const result = await userSerivce.findByPk(req.params.id);
    res.json(result);
  }

  async updateById(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.json(errors.array());
    }

    const result = await userService.updateById(req.params.id, req.body);
    res.json(result);
  }

  async delete(req, res, next) {
    const result = await userSerivce.deleteById(req.params.id);
    res.json(result);
  }
}

module.exports = new userController();
