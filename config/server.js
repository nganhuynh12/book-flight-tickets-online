const { engine } = require('express-handlebars');
const { default: helmet } = require('helmet');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('passport');
const session = require('express-session');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const express = require('express');
const flash = require('connect-flash');
const { log } = require('console');
require('dotenv').config();

module.exports = (app, dirName) => {
  app.use(flash());
  app.engine(
    'hbs',
    engine({
      extname: 'hbs',
      helpers: {
        static(name) {
          return require('../lib/static').map(name);
        },
        currency(value) {
          console.log(value);
          return value;
        },
      },
    })
  );
  app.set('view engine', 'hbs');

  app.use(logger('dev'));
  // app.use(helmet());
  app.use(cors());
  app.use(cookieParser());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static(path.join(dirName, 'public')));
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeader: true,
    legacyHeader: false,
  });
  app.use(limiter);
  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: true,
      saveUninitialized: true,
    })
  );
  app.use(passport.session());
  app.use(passport.authenticate('session'));
  app.use(function (req, res, next) {
    // res.set('Content-Security-Policy', "default-src 'self'");

    if ('user' in req) {
      res.locals.user = req.user;
      res.locals.isLoggedIn = true;
    }
    next();
  });
};
