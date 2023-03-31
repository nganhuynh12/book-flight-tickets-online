const db = require('../models');

module.exports = {
  authService: new (require('./auth.service'))(db.users),
  flightService: new (require('./flight.service'))(db.flights),
  locationService: new (require('./location.service'))(db.locations),
  ticketService: new (require('./ticket.service'))(db.tickets),
  userService: new (require('./user.service'))(db.users),
};
