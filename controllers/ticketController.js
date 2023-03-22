const ticketService = require('../services/ticketService');

class ticketController {
  async add(req, res, next) {
    const result = await ticketService.add(req.body);
    res.json(result);
  }

  async findAll(req, res, next) {
    const result = await ticketService.findAll({ where: req.query });
    res.json(result);
  }

  async deleteById(req, res, next) {
    const result = await ticketService.deleteById(req.params.id);
    res.json(result);
  }
}

module.exports = new ticketController();
