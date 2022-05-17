'use strict';
module.exports = (sequelize, DataTypes) => {
  var locations = sequelize.define(
    'locations',
    {
      UserId: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      Zipcode: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      Latitude: {
        allowNull: true,
        type: DataTypes.STRING
      },
      Longitude: {
        allowNull: true,
        type: DataTypes.STRING
      },
      Deleted: {
        type: DataTypes.BOOLEAN,
        allowNull: true
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE
    }
  );

  return locations;
};