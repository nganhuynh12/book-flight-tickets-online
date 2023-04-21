class ticketController {
  constructor(service) {
    this.service = service;
  }

  async add(req, res, next) {
    try {
      const result = await this.service.add(req.body);
      return res.status(201).json(result);
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  async findAll(req, res, next) {
    const result = await this.service.findAll({
      page: req.query.page,
      per_page: req.query.per_page,
      where: req.query,
    });
    return res.json(result);
  }

  async findByPk(req, res, next) {
    const result = await this.service.findTicketWithUserData(req.params.id);
    result.username = result.user.username;
    return res.json(result);
  }

  async deleteById(req, res, next) {
    try {
      const result = await this.service.deleteById(req.params.id);
      res.json(result);
    } catch (error) {
      return res.status(400).json(error);
    }
  }
}

module.exports = ticketController;
