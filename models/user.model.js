const { Model, DataTypes } = require('sequelize');
const sequelize = require('.');

class User extends Model {}

User.init(
  {
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    username: {
      type: DataTypes.STRING,
    },
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    gender: {
      type: DataTypes.BOOLEAN,
      defaultValue: 0,
    },
    phone: {
      type: DataTypes.STRING,
    },
    address: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: 'user',
  }
);

module.exports = User;
