const Ticket = require('../models/ticket.model');
const baseService = require('./base.service');

class ticketService extends baseService {}

module.exports = new ticketService(Ticket);
