const { DataTypes, Model } = require('sequelize');
const sequelize = require('.');

class Flight extends Model {}

Flight.init(
  {
    startTime: {
      type: DataTypes.STRING,
    },
    arriveTime: {
      type: DataTypes.DATE,
    },
    startLocation: {
      type: DataTypes.INTEGER,
    },
    arriveLocation: {
      type: DataTypes.INTEGER,
    },
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    numSeat: {
      type: DataTypes.INTEGER,
    },
  },
  { sequelize, modelName: 'flight' }
);

module.exports = Flight;
