const express = require('express');
const router = express.Router();
const {
  loggedInOnly,
  loggedOutOnly
} = require('../services/session');
const User = require('../models/').User;

router.get('/', loggedInOnly, function(req, res, next) {
  let children = req.user.populateChildren();
  console.log('Children: ', children);
  res.render('home');
});

router.get('/login', loggedOutOnly, function(req, res) {
  res.render('login');
});

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

module.exports = router;
