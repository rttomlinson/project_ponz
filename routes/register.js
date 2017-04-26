const express = require('express');
const router = express.Router();
const User = require('../models/').User;

router.get('/:id', (req, res) => {
  let parent = req.params.id;
  res.render('register', { parent });
});

router.post('/', (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  let parent = req.body.parent;

  User.findOrCreate({ email }, { email, password, parent }).then(user => {
    //User.findOneAndUpdate({id:parent}, {children: {$push: user.id }})
    User.findByIdAndUpdate(parent, {
      $push: { children: user.id }
    }).then(() => {
      res.redirect('/');
    });
  });
});

module.exports = router;
