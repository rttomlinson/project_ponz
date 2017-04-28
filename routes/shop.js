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
            req.flash('success', "Item purchased!");
            res.redirect('/shop');
        });
});

module.exports = router;
