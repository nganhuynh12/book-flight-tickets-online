module.exports = (sequelize, Sequelize) => {
  class User extends Sequelize.Model {}

  User.init(
    {
      email: {
        type: Sequelize.STRING,
      },
      password: {
        type: Sequelize.STRING,
      },
      username: {
        type: Sequelize.STRING,
      },
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      gender: {
        type: Sequelize.BOOLEAN,
        defaultValue: 0,
      },
      phone: {
        type: Sequelize.STRING,
      },
      address: {
        type: Sequelize.STRING,
      },
    },
    {
      sequelize,
      modelName: 'user',
    }
  );

  return User;
};
