const passport = require('passport');
const User = require('../models').User;

module.exports = function(app) {
  app.use(passport.initialize());
  app.use(passport.session());

  const LocalStrategy = require('passport-local').Strategy;

  passport.use(
    new LocalStrategy(
      { usernameField: 'email' },
      function(email, password, done) {
        console.log('email is', email);
        console.log('password is', password);
        User.findOne({
          email
        })
          .then(user => {
            console.log(user);
            if (!user || !user.validatePassword(password)) {
              return done(null, false, {
                message: 'Invalid email/password'
              });
            } else {
              return done(null, user);
            }
          })
          .catch(err => {
            return done(err);
          });
      }
    )
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
