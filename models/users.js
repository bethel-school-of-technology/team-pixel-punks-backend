'use strict';
module.exports = (sequelize, DataTypes) => {
  var users = sequelize.define(
    'users',
    {
      UserId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      FirstName: DataTypes.STRING,
      LastName: DataTypes.STRING,
      Email: {
        type: DataTypes.STRING,
        unique: true
      },
      Password: DataTypes.STRING,
      Admin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: true
      },
      Deleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: true 
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE
    },
    {}
  );

  return users;
};