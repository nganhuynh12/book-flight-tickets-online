module.exports = (sequelize, Sequelize) => {
  class Ticket extends Sequelize.Model {}

  Ticket.init(
    {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      type: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      price: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      seatId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      luggagePrice: {
        type: Sequelize.INTEGER,
        allowNull: false,
        default: 0,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: 'email',
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
    },
    { sequelize, modelName: 'ticket' }
  );

  return Ticket;
};
