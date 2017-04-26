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

    router.post('/', (req, res, next) => {
        let email = req.body.email;
        let password = req.body.password;
        let parent = req.body.parent;
        User.findOne({
                email
            })
            .then(user => {
                if (user) {
                    passport.authenticate('local', {
                        successRedirect: '/',
                        failureRedirect: '/login'
                    })(req, res, next);
                }
                else {
                    let user = new User({
                        email,
                        password,
                        parent
                    });
                    return user.save();
                }
            })
            .then((user) => {
                return User.findByIdAndUpdate(parent, {
                    $push: {
                        children: user.id
                    }
                })
            })
            .then(() => {
                passport.authenticate('local', {
                    successRedirect: '/',
                    failureRedirect: '/login'
                })(req, res, next);
            })
            .catch((err) => {
                next(err);
            })
    });
    return router;
};
