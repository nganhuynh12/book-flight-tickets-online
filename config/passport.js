const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const db = require('../models');
const bcrypt = require('bcrypt');

passport.use(
  new LocalStrategy(
    { usernameField: 'email', passwordField: 'password' },
    async (email, password, done) => {
      console.log(email, password);
      try {
        const user = await db.users.findOne({ where: { email } });
        if (!user) return done(null, false, { message: 'Unknown user' });
        if (await bcrypt.compare(password, user.password)) {
          console.log('success');
          return done(null, user);
        } else {
          return done(null, false, { message: 'Wrong password' });
        }
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await db.users.findOne({ where: { id } });
    if (user) {
      done(null, user);
    }
  } catch (error) {
    done(error);
  }
});
