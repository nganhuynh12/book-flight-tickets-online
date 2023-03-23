module.exports = (sequelize, Sequelize) => {
  class Flight extends Sequelize.Model {}

  Flight.init(
    {
      startTime: {
        type: Sequelize.STRING,
      },
      arriveTime: {
        type: Sequelize.DATE,
      },
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      numSeat: {
        type: Sequelize.INTEGER,
      },
    },
    { sequelize, modelName: 'flight' }
  );

  return Flight;
};
