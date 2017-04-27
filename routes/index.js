const express = require('express');
const router = express.Router();
const {
  loggedInOnly,
  loggedOutOnly
} = require('../services/session');
const User = require('../models/').User;

router.get('/', loggedInOnly, async function(req, res, next) {
  let user = await req.user.populateChildren();
  res.render('home', {
    user
  });
});

router.get('/login', loggedOutOnly, function(req, res) {
  res.render('login');
});

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

module.exports = router;
