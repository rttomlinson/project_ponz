const express = require('express');
const router = express.Router();
const User = require('../models/').User;

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

    User.findOrCreate({
            email
        }, {
            email,
            password,
            parent
        })
        .then(user => {
            //User.findOneAndUpdate({id:parent}, {children: {$push: user.id }})
            return User.findByIdAndUpdate(parent, {
                $push: {
                    children: user.id
                }
            });
        })
        .then(() => {
            //need registered user to be logged in

            res.redirect(307, '/auth/local');
        });
});

module.exports = router;
