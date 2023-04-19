const { Op } = require('sequelize');
const baseService = require('./base.service');
const Location = require('../models/index').locations;

module.exports = class flightService extends baseService {
  findAllWithLocationData(option) {
    console.log(option.where);
    for (let key in option.where) {
      if (option.where[key] === '') {
        delete option.where[key];
      }
    }
    option.where.startTime = { [Op.substring]: option.where.startTime };
    return this.model.findAll({
      include: [
        { model: Location, as: 'startLocation' },
        { model: Location, as: 'arriveLocation' },
      ],
      ...option,
    });
  }
};
