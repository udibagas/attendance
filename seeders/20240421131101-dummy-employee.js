"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const employees = require("../data/employees.json").map((el) => {
      el.createdAt = el.updatedAt = new Date();
      return el;
    });
    await queryInterface.bulkInsert("Employees", employees);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Employees");
  },
};
