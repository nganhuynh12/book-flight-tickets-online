const baseService = require('./base.service');
const db = require('../models');

class ticketService extends baseService {}

module.exports = new ticketService(db.tickets);
