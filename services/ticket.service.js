const baseService = require('./base.service');
const User = require('../models/index').users;
const Flight = require('../models/index').flights;
const Location = require('../models/index').locations;

module.exports = class ticketService extends baseService {
  findTicketWithUserData(pk) {
    return this.model.findOne({
      where: { id: pk },
      include: [
        User,
        {
          model: Flight,
          include: [{ all: true }],
        },
      ],
    });
  }
};
