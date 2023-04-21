module.exports = (sequelize, Sequelize) => {
  class User extends Sequelize.Model {}

  User.init(
    {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: 'email',
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
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
      birthDay: {
        type: Sequelize.DATEONLY,
      },
      isAdmin: {
        type: Sequelize.BOOLEAN,
      },
    },
    {
      sequelize,
      modelName: 'user',
    }
  );

  return User;
};
