const ticketService = require('../services/ticketService');

class ticketController {
  async add(req, res, next) {
    const result = await ticketService.add(req.body);
    res.json(result);
  }

  async find(req, res, next) {
    const result = await ticketService.find();
    res.json(result);
  }

  async delete(req, res, next) {
    const result = await ticketService.delete(req.params.id);
    res.json(result);
  }
}

module.exports = new ticketController();
