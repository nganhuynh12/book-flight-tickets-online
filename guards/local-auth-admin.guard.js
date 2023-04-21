module.exports = (req, res, next) => {
  if (req.isAuthenticated() && req.user.isAdmin) {
    return next();
  } else {
    res.redirect('/auth');
  }
};
