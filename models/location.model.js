module.exports = (sequelize, Sequelize) => {
  class Location extends Sequelize.Model {}

  Location.init(
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      value: {
        type: Sequelize.STRING,
      },
    },
    {
      sequelize,
      modelName: 'location',
    }
  );

  return Location;
};
