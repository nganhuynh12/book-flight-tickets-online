const { findAllUser, findUserById } = require('../db/user');
const { validationResult } = require('express-validator');

class userController {
  async findAllUser(req, res, next) {
    const result = await findAllUser();
    res.json(result);
  }

  async findUserById(req, res, next) {
    const result = await findUserById(req.params.id);
    res.json(result);
  }

  async updateUserById(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.json(errors.array());
    }

    const result = await updateUserById(req.params.id, req.body);
    res.json(result);
  }

  async deleteUserById(req, res, next) {
    const result = await deleteUserById(req.params.id);
    res.json(result);
  }
}

module.exports = new userController();
