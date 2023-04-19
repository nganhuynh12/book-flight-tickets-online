const { Op } = require('sequelize');
const baseService = require('./base.service');
const Location = require('../models/index').locations;

module.exports = class flightService extends baseService {
  async findAllWithLocationData(option) {
    console.log(option);
    if ('page' in option && 'per_page' in option) {
      const page = option.page;
      const per_page = option.per_page;

      const offset = (page - 1) * per_page;
      const limit = per_page;
      console.log(offset, limit);

      const res = await this.model.findAndCountAll({
        offset,
        limit,
      });

      return res;
    }

    option.startTime = { [Op.substring]: option.startTime };
    for (let key in option) {
      if (option[key] === '') {
        delete option[key];
      }
    }
    console.log(option);
    return await this.model.findAll({
      include: [
        { model: Location, as: 'startLocation' },
        { model: Location, as: 'arriveLocation' },
      ],
      where: { ...option },
    });
  }
};
