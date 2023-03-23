const Sequelize = require('sequelize');

const sequelize = new Sequelize('svo', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  pool: { max: 5, min: 0, acquire: 30000, idle: 10000 },
});

const db = {
  sequelize,
  Sequelize,
  flights: require('./flight.model')(sequelize, Sequelize),
  locations: require('./location.model')(sequelize, Sequelize),
  tickets: require('./ticket.model')(sequelize, Sequelize),
  users: require('./user.model')(sequelize, Sequelize),
};

db.flights.hasMany(db.tickets);
db.tickets.belongsTo(db.flights);

db.locations.hasMany(db.flights, {
  foreignKey: 'arriveLocationId',
});
db.locations.hasMany(db.flights, {
  foreignKey: 'startLocationId',
});
db.flights.belongsTo(db.locations);

db.users.hasMany(db.tickets);
db.tickets.belongsTo(db.users);

module.exports = db;
