const { validationResult } = require('express-validator');
const { addTicket, findAllTicket } = require('../services/ticket');

class ticketController {
  async addTicket(req, res, next) {
    const result = await addTicket(req.body);
    res.json(result);
  }

  async findAllTicket(req, res, next) {
    const result = await findAllTicket();
    res.json(result);
  }
}

module.exports = new ticketController();
