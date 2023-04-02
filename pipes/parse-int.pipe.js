module.exports = (attr) => {
  return (req, res, next) => {
    req.query[attr] = Number.parseInt(req.query[attr]);
    next();
  };
};
