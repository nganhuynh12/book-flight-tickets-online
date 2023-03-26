const createError = require('http-errors');
const express = require('express');
const db = require('./models');

const app = express();

require('./config/passport');
require('./config/server')(app, __dirname);
require('./routes')(app);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

db.sequelize.sync().then(() => {
  app.listen('3000');
});

module.exports = app;
