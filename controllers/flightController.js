const { body, validationResult } = require('express-validator');
const flightService = require('../services/flightService');

class flightController {
  async add(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json(errors.array());
    }

    const result = await flightService.add(req.body);
    return res.json(result);
  }

  async find(req, res, next) {
    if (req.query.startLocation && req.query.arriveLocation) {
      const result = await flightService.find({
        where: {
          arriveLocation: req.query.arriveLocation,
          startLocation: req.query.startLocation,
        },
      });

      return res.json(result);
    } else if (req.query.arriveLocation) {
      const result = await flightService.find({
        where: { arriveLocation: req.query.arriveLocation },
      });

      return res.json(result);
    } else if (req.query.startLocation) {
      const result = await flightService.find({
        where: { startLocation: req.query.startLocation },
      });

      return res.json(result);
    } else {
      const result = await flightService.find();

      return res.json(result);
    }
  }
}

module.exports = new flightController();
