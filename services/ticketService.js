const ticketRepository = require('../repositories/ticketRepository');

class ticketService {
  async find() {
    return await ticketRepository.find();
  }

  async add(ticket) {
    return await ticketRepository.save(ticket);
  }
}
module.exports = new ticketService();
