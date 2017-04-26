const express = require('express');
const router = express.Router();
const User = require('../models/').User;

module.exports = function(passport) {
  router.get('/:id', (req, res) => {
    let parent = req.params.id;
    res.render('register', {
      parent
    });
  });

  router.post('/', (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    let parent = req.body.parent;

    User.findOrCreate(
      {
        email
      },
      {
        email,
        password,
        parent
      },
      function(err, user) {
        User.findByIdAndUpdate(parent, {
          $push: {
            children: user.id
          }
        }).then(user => {
          passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/login'
          })(req, res, next);
        });
      }
    );
  });
  return router;
};
