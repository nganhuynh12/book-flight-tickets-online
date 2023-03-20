const { validationResult } = require('express-validator');
const userSerivce = require('../services/userService');

class userController {
  async find(req, res, next) {
    const result = await userSerivce.find();
    res.json(result);
  }

  async findById(req, res, next) {
    const result = await userSerivce.findById(req.params.id);
    res.json(result);
  }

  async updateById(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.json(errors.array());
    }

    const result = await updateById(req.params.id, req.body);
    res.json(result);
  }

  async delete(req, res, next) {
    const result = await userSerivce.delete(req.params.id);
    res.json(result);
  }
}

module.exports = new userController();
