"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Machine extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Machine.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notNull: { msg: "Nama harus diisi" },
          notEmpty: { msg: "Nama harus diisi" },
        },
      },
      ip_address: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notNull: { msg: "Alamat IP harus diisi" },
          notEmpty: { msg: "Alamat IP harus diisi" },
          isIP: { msg: "Alamat IP tidak sesuai" },
        },
      },
      status: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Machine",
    }
  );
  return Machine;
};
