const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const db = require('../models');
const bcrypt = require('bcrypt');

passport.use(
  new LocalStrategy(
    { usernameField: 'email', passwordField: 'password' },
    async (email, password, done) => {
      try {
        const user = await db.users.findOne({ where: { email } });
        if (!user)
          return done(null, false, { success: false, message: 'Unknown user' });
        if (await bcrypt.compare(password, user.password)) {
          return done(null, user);
        } else {
          return done(null, false, {
            success: false,
            message: 'Wrong password',
          });
        }
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  console.log(user);
  done(null, user.dataValues.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await db.users.findOne({ where: { id } });
    if (user.dataValues) {
      done(null, user.dataValues);
    }
  } catch (error) {
    done(error);
  }
});
