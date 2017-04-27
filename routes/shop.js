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
    let user = req.user;
    user.purchaseItem(itemId, price)
        .then(() => {
            res.redirect('/');

        });

    // User.findByIdAndUpdate(req.user.id, {
    //         $inc: {
    //             dogeCoins: price * -1
    //         }
    //     })
    //     .then(user => {
    //         let itemToIncr = user.inventory.find(function(item) {
    //             return item.id == itemId;
    //         });

    //         if (itemToIncr) {
    //             itemToIncr.quantity++;
    //             return user.save();
    //         }
    //         else {
    //             return Item.findById(itemId, {
    //                     _id: 0,
    //                     imgLocation: 1
    //                 })
    //                 .then(item => {
    //                     let userItem = {};
    //                     userItem.quantity = 1;
    //                     userItem.imgLocation = item.imgLocation;
    //                     user.inventory.push(userItem);
    //                     return user.save();
    //                 })
    //         }
    //     })
    //     .then(() => {
    //         res.redirect('/');
    //     });
});

module.exports = router;
