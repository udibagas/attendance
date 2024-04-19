module.exports = (err, req, res, next) => {
  console.log(err);
  res.send(err.message);
};
