const express = require('express');
const router = express.Router();
const User = require('../models/').User;

module.exports = function(passport) {
    router.post('/local', function(req, res) {
        // let email = req.body.email;
        // let password = req.body.password;

        passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/login'
        });
    });

    return router;
};
