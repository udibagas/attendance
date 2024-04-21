const { Employee } = require("../models");

module.exports = {
  async index(req, res, next) {
    const {
      page = 1,
      search,
      pageSize = 15,
      sort_column: column = "name",
      sort_order: order = "asc",
    } = req.query;
    try {
      const data = await Employee.paginate(page, pageSize, search, {
        column,
        order,
      });

      res.render("layout", {
        view: "employees",
        data,
        query: { ...req.query, page },
        route: "/employees",
      });
    } catch (error) {
      next(error);
    }
  },
};
