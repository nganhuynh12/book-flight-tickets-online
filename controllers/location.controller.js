class locationController {
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
    console.log(req);
    const result = await this.service.findAll(req.query);
    return res.json(result);
  }

  async deleteById(req, res, next) {
    return res.json(result);
  }

  async updateById(req, res, next) {
    const result = await this.service.updateById(req.params.id, req.body);
    return res.json(result);
  }
}

module.exports = locationController;
