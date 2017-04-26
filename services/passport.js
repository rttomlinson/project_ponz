const passport = require('passport');
const User = require('../models').User;

module.exports = function(app) {
  app.use(passport.initialize());
  app.use(passport.session());

  const LocalStrategy = require('passport-local').Strategy;

  passport.use(
    new LocalStrategy(function(username, password, done) {
      User.findOne({ username }, function(err, user) {
        console.log(user);
        if (err) return done(err);
        if (!user || !user.validPassword(password)) {
          return done(null, false, { message: 'Invalid username/password' });
        }
        return done(null, user);
      });
    })
  );

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id)
      .then(user => {
        done(null, user);
      })
      .catch(err => {
        done(err);
      });
  });
  return passport;
};
