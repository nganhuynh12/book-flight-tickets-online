module.exports = class flightController {
  constructor(service) {
    this.service = service;
  }

  async add(req, res, next) {
    try {
      const result = await this.service.add(req.body);
      return res.status(201).json(result);
    } catch (error) {
      return res.json(400).json(error);
    }
  }

  async findAll(req, res, next) {
    const result = await this.service.findAllWithLocationData(req.query);
    console.log(result);
    return res.json(result);
  }
};
