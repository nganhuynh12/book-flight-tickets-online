const Ticket = require('../models/ticket.model');
const baseService = require('./baseService');

class ticketService extends baseService {}

module.exports = new ticketService(Ticket);
