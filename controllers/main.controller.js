module.exports = {
  home(req, res) {
    res.render("layout", { view: "home", route: "/" });
  },
};
