const express = require('express');
const router = express.Router();
const {
    loggedInOnly,
    loggedOutOnly
} = require('../services/session');
const User = require('../models/').User;

router.get('/', loggedInOnly, async function(req, res, next) {
    let user = await req.user.populateChildren();
    //returns an object with arrays of objects (with arrays of objects)

    console.log('user: ', JSON.stringify(user, null, 2));
    console.log('user money: ', user.dogeCoins);


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
