"use strict";
const { Model, Op } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Employee extends Model {
    static associate(models) {
      Employee.hasMany(models.AttendanceLog, {
        foreignKey: "PIN",
        sourceKey: "PIN",
      });
    }

    static async paginate(
      page = 1,
      pageSize = 15,
      search = null,
      sort = { column: "name", order: "asc" }
    ) {
      const options = {
        limit: pageSize,
        offset: (page - 1) * pageSize,
        where: {},
        order: [[sort.column || "name", sort.order || "asc"]],
      };

      if (search) {
        options.where = {
          [Op.or]: {
            PIN: { [Op.like]: `%${search}%` },
            name: { [Op.like]: `%${search}%` },
          },
        };
      }

      const data = await Employee.findAndCountAll(options);
      data.totalPage = Math.ceil(data.count / pageSize);
      return data;
    }
  }

  Employee.init(
    {
      PIN: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: { msg: "PIN harus diisi" },
          notNull: { msg: "PIN harus diisi" },
        },
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Nama harus diisi" },
          notNull: { msg: "Nama harus diisi" },
        },
      },
    },
    {
      sequelize,
      modelName: "Employee",
    }
  );

  return Employee;
};
