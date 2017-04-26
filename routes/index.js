const express = require('express');
const router = express.Router();
const {
  loggedInOnly,
  loggedOutOnly
} = require('../services/session');
const User = require('../models/').User;

router.get('/', loggedInOnly, async function(req, res, next) {
  let children = await req.user.populateChildren();
  children = JSON.stringify(children, null, 2);
  //  console.log('Children: ', JSON.stringify(children, null, 2));

  res.render('home', { children });
});

router.get('/login', loggedOutOnly, function(req, res) {
  res.render('login');
});

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

module.exports = router;
