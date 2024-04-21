const { Machine } = require("../models");

module.exports = {
  async index(req, res, next) {
    try {
      const machines = await Machine.findAll({ order: [["name", "asc"]] });
      res.render("layout", {
        view: "engine/_index",
        machines,
        route: "/machines",
      });
    } catch (error) {
      next(error);
    }
  },

  async show(req, res, next) {
    const { id } = req.params;
    try {
      const machine = await Machine.findByPk(id);
      if (!machine) throw new Error("Data not found");
      res.json(machine);
    } catch (error) {
      next(error);
    }
  },

  async create(req, res, next) {
    try {
      const machine = await Machine.create(req.body);
      res.json({ message: "Data berhasil ditambahkan", data: machine });
    } catch (error) {
      next(error);
    }
  },

  async update(req, res, next) {
    const { id } = req.params;
    try {
      const machine = await Machine.findByPk(id);
      if (!machine) throw new Error("Data not found");
      await machine.update(req.body);
      res.json({ message: "Data berhasil disimpan", data: machine });
    } catch (error) {
      next(error);
    }
  },

  async destroy(req, res, next) {
    const { id } = req.params;
    try {
      const machine = await Machine.findByPk(id);
      if (!machine) throw new Error("Data not found");
      await machine.destroy();
      res.json({ message: "Data berhasil dihapus", data: machine });
    } catch (error) {
      next(error);
    }
  },
};
