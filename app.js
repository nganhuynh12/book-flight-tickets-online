const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('passport');
const session = require('express-session');
const cors = require('cors');
const csurf = require('csurf');
const rateLimit = require('express-rate-limit');

const db = require('./models');

require('./config/passport');

const { engine } = require('express-handlebars');
const { default: helmet } = require('helmet');

const app = express();

// view engine setup
app.engine(
  'hbs',
  engine({
    extname: 'hbs',
    helpers: {
      gen_seats(colNum, rowNum, options) {
        const matrix = [];
        let count = 1;
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
        return `<div style='display: flex; flex-direction: column;'> 
              ${matrix.join(' ')}
          </div>
        `;
      },
      static(name) {
        const baseUrl = '';

        return baseUrl + name;
      },
    },
  })
);
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(csurf());
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeader: true,
  legacyHeader: false,
});
app.use(limiter);
app.use(
  session({
    secret: 'suvasdhfioweufklj',
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.session());
app.use(passport.authenticate('session'));

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
