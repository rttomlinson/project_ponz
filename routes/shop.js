const express = require('express');
const router = express.Router();
const {
    loggedInOnly,
    loggedOutOnly
} = require('../services/session');
const User = require('../models/').User;
const Item = require('../models/').Item;

router.get('/', loggedInOnly, async function(req, res, next) {
    let items = await Item.getAllItems();
    //console.log(items);

    res.render('shop', {
        items
    });
});

router.post('/buy/:id', loggedInOnly, (req, res) => {
    let itemId = req.params.id;
    let price = req.body.price;

    User.findByIdAndUpdate(req.user.id, {
            $inc: {
                dogeCoins: price * -1
            }
        })
        .then(user => {
            let itemToIncr = user.inventory.find(function(item) {
                return item.id == itemId;
            });

            if (itemToIncr) {
                itemToIncr.quantity++;
                return user.save();
            }
            else {
                return Item.findById(itemId)
                    .then(item => {
                        item.quantity = 1;
                        user.inventory.push(item);
                        return user.save();
                    })
            }
        })
        .then(() => {
            res.redirect('/');
        });
});

module.exports = router;
