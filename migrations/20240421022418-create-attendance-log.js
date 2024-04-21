"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("AttendanceLogs", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      PIN: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      DateTime: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      Verified: {
        type: Sequelize.BOOLEAN,
      },
      Status: {
        type: Sequelize.STRING,
      },
      WorkCode: {
        type: Sequelize.STRING,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("AttendanceLogs");
  },
};
