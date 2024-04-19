"use strict";
const { hashSync, compareSync } = require("bcryptjs");
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    verify(password) {
      return compareSync(password, this.password);
    }
  }

  User.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  User.beforeSave((user) => {
    if (user.password) {
      user.password = hashSync(user.password);
    }
  });

  return User;
};
