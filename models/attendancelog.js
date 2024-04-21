"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class AttendanceLog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  AttendanceLog.init(
    {
      PIN: DataTypes.STRING,
      DateTime: DataTypes.DATE,
      Verified: DataTypes.BOOLEAN,
      Status: DataTypes.STRING,
      WorkCode: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "AttendanceLog",
      timestamps: false,
    }
  );
  return AttendanceLog;
};
