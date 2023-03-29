module.exports = (app) => {
  app.use('/', require('./index.route'));
  app.use('/auth', require('./auth.route'));
  app.use('/users', require('./user.route'));
  app.use('/flights', require('./flight.route'));
  app.use('/tickets', require('./ticket.route'));
  app.use('/locations', require('./location.route'));
};
