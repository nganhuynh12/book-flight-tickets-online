const ticketRepository = require('../repositories/ticketRepository');
const baseService = require('./baseService');

class ticketService extends baseService {}

module.exports = new ticketService(ticketRepository);
