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
require('dotenv').config();

module.exports = (app, dirName) => {
  app.use(function (req, res, next) {
    // res.set('Content-Security-Policy', "default-src 'self'");
    next();
  });
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
          return require('../lib/static').map(name);
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
};
