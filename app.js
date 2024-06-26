const express = require("express");
const errorMiddleware = require("./middlewares/error.middleware");
const cookieMiddleware = require("./middlewares/cookie.middleware");
const app = express();
const port = 3000;

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieMiddleware);

app.use((req, res, next) => {
  app.locals.user = req.session.user;
  next();
});

app.use(require("./routes"));
app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
