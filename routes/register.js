const express = require('express');
const router = express.Router();
const User = require('../models/').User;

module.exports = function(passport) {
    router.get('/:id', (req, res) => {
        let parentId = req.params.id;
        res.render('register', {
            parentId
        });
    });

    router.post('/', (req, res, next) => {
        let email = req.body.email;
        let password = req.body.password;
        let parentId = req.body.parentId;
        let children = [];

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
                        parentId,
                        children
                    });
                    return user.save();
                }
            })
            .then(user => {
                
                let updateDbArray = [];
                updateDbArray.push(User.findByIdAndUpdate(parentId, {
                    $push: {
                        children: user.id
                    }
                }));
                updateDbArray.push(user.addMoneyToParentAccount());
                return Promise.all(updateDbArray);
            })
            .then(user => {
                console.log('parentId: ', user);
                passport.authenticate('local', {
                    successRedirect: '/',
                    failureRedirect: '/login'
                })(req, res, next);
            })
            .catch(err => {
                next(err);
            });
    });
    return router;
};
