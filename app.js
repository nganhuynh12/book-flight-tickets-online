const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const db = require('./models');

const indexRouter = require('./routes/index.route');
const authRouter = require('./routes/auth.route');
const userRouter = require('./routes/user.route');
const flightRouter = require('./routes/flight.route');
const ticketRouter = require('./routes/ticket.route');
const locationRouter = require('./routes/location.route');
const { engine } = require('express-handlebars');
const { count } = require('console');

const app = express();

// view engine setup
app.engine(
  'hbs',
  engine({
    extname: 'hbs',
    helpers: {
      gen_seats(colNum, rowNum, options) {
        const matrix = [];
        let count = 0;
        for (let i = 0; i < rowNum; i++) {
          const row = [];
          for (let j = 0; j < colNum; j++) {
            row.push(
              `<div style="width: 50px; height: 50px;">${options.fn(
                count
              )}</div>`
            );
            count += 1;
          }
          matrix.push(`<div style="display: flex">${row.join(' ')}</div>`);
        }
        return matrix.join(' ');
      },
    },
  })
);
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/flights', flightRouter);
app.use('/tickets', ticketRouter);
app.use('/locations', locationRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
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
