"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const machines = [
      {
        name: "M-1",
        ip_address: "192.168.1.100",
      },
      {
        name: "M-2",
        ip_address: "192.168.1.101",
      },
      {
        name: "M-3",
        ip_address: "192.168.1.102",
      },
    ];

    await queryInterface.bulkInsert(
      "Machines",
      machines.map((el) => {
        el.createdAt = el.updatedAt = new Date();
        return el;
      })
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Machines");
  },
};
