module.exports = (attr) => {
  return (req, res, next) => {
    if (!isNaN(Number.parseInt(req.query[attr])))
      req.query[attr] = Number.parseInt(req.query[attr]);
    next();
  };
};
