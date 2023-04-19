class userController {
  constructor(service) {
    this.service = service;
  }

  async findAll(req, res, next) {
    const result = await this.service.findAll(req.query);
    return res.json(result);
  }

  async findByPk(req, res, next) {
    const result = await this.service.findByPk(req.params.id);
    return res.json(result);
  }

  async updateById(req, res, next) {
    console.log(req.body);
    const result = await this.service.updateById(req.params.id, req.body);
    return res.json(result);
  }

  async delete(req, res, next) {
    try {
      const result = await this.service.deleteById(req.params.id);
      return res.json(result);
    } catch (error) {
      return res.status(400).json(error);
    }
  }
}

module.exports = userController;
