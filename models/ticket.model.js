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
      luggageType: {
        type: Sequelize.INTEGER,
        allowNull: false,
        default: 0,
      },
    },
    { sequelize, modelName: 'ticket' }
  );

  return Ticket;
};
