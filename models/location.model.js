const { Model, DataTypes } = require('sequelize');
const sequelize = require('.');

class Location extends Model {}

Location.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    value: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: 'location',
  }
);

module.exports = Location;
