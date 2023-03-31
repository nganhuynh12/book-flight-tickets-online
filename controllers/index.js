const service = require('../services');

module.exports = {
  authController: new (require('./auth.controller'))(service.authService),
  flightController: new (require('./flight.controller'))(service.flightService),
  locationController: new (require('./location.controller'))(
    service.locationService
  ),
  ticketController: new (require('./ticket.controller'))(service.ticketService),
  userController: new (require('./user.controller'))(service.userService),
};
