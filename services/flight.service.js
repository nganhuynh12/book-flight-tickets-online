const baseService = require('./base.service');
const Location = require('../models/index').locations;

module.exports = class flightService extends baseService {
  findAllWithLocationData(option) {
    console.log(option.where);
    return this.model.findAll({
      include: [
        { model: Location, as: 'startLocation' },
        { model: Location, as: 'arriveLocation' },
      ],
      ...option,
    });
  }
};
