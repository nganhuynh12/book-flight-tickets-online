module.exports = (sequelize, Sequelize) => {
  class Flight extends Sequelize.Model {}

  Flight.init(
    {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      startTime: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      arriveTime: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      numSeat: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      basePrice: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    },
    { sequelize, modelName: 'flight' }
  );

  return Flight;
};
