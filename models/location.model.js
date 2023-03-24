module.exports = (sequelize, Sequelize) => {
  class Location extends Sequelize.Model {}

  Location.init(
    {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      value: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'location',
    }
  );

  return Location;
};
