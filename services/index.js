const db = require('../models');

module.exports = {
  authService: new (require('./auth.service'))(db.users),
  flightService: new (require('./flight.service'))(db.flights, 'flights'),
  locationService: new (require('./location.service'))(
    db.locations,
    'locations'
  ),
  ticketService: new (require('./ticket.service'))(db.tickets, 'tickets'),
  userService: new (require('./user.service'))(db.users, 'users'),
};
