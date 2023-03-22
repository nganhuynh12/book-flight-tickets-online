const { Model, DataTypes } = require('sequelize');
const sequelize = require('.');

class Ticket extends Model {}

Ticket.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    type: {
      type: DataTypes.BOOLEAN,
    },
    price: {
      type: DataTypes.FLOAT,
    },
    flightId: {
      type: DataTypes.INTEGER,
    },
    userId: {
      type: DataTypes.INTEGER,
    },
    seatId: {
      type: DataTypes.INTEGER,
    },
  },
  { sequelize, modelName: 'ticket' }
);

module.exports = Ticket;
