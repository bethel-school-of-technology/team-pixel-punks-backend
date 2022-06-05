'use strict';
module.exports = (sequelize, DataTypes) => {
  var locations = sequelize.define(
    'locations',
    {
      LocationId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      UserId: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      Zipcode: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      City: {
        allowNull: true,
        type: DataTypes.STRING
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
        defaultValue: false
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE
    }
  );

  return locations;
};