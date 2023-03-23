module.exports = (sequelize, Sequelize) => {
  class Ticket extends Sequelize.Model {}

  Ticket.init(
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      type: {
        type: Sequelize.BOOLEAN,
      },
      price: {
        type: Sequelize.FLOAT,
      },
      seatId: {
        type: Sequelize.INTEGER,
      },
    },
    { sequelize, modelName: 'ticket' }
  );

  return Ticket;
};
