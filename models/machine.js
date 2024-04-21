"use strict";
const { Model } = require("sequelize");
const fetch = require("cross-fetch");
const parser = require("xml2json");
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

    getLog() {
      const payload = `
        <GetAttLog>
          <ArgComKey xsi:type="xsd:integer">0</ArgComKey>
          <Arg>
            <PIN xsi:type="xsd:integer">All</PIN>
          </Arg>
        </GetAttLog>`;

      fetch("/iWsService", {
        method: "POST",
        body: payload,
        headers: {
          "Content-Type": "text/xml",
          // 'Content-Length': payload.length,
        },
      })
        .then((res) => res.xml())
        .then((xml) => {
          const parsed = parser.toJson(xml);
          parsed.forEach((el) => {
            const { PIN, DateTime, Verified, Status, WorkCode } = el;
            // TODO: save to DB
          });
        })
        .catch((err) => {
          console.log(err);
        });
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
