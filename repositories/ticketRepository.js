const baseRepository = require('./baseRepository');

class ticketRepository extends baseRepository {}

module.exports = new ticketRepository('ticket');
