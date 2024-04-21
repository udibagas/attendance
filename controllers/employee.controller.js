const { Employee } = require("../models");

module.exports = {
  async index(req, res, next) {
    const { page, search, pageSize = 15 } = req.query;
    try {
      const emplooyees = await Employee.paginate(page, pageSize, search);
      res.json(emplooyees);
    } catch (error) {
      next(error);
    }
  },
};
