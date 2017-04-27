const express = require('express');
const router = express.Router();
const {
  loggedInOnly,
  loggedOutOnly
} = require('../services/session');
const User = require('../models/').User;
const Item = require('../models/').Item;

router.get('/', loggedInOnly, async function(req, res, next) {
  res.render('shop', {
    user
  });
});

router.post('/buy', loggedInOnly, (req, res) => {
  let itemId = req.body.itemId;
  let cost = req.body.cost;

  User.findByIdAndUpdate(currentUser.id, {
    dogeCoins: { $inc: cost * -1 }
  })
    .then(user => {
      let itemToIncr = user.inventory.find(function(item) {
        return item.id == itemId;
      });

      if (itemToIncr) {
        itemToIncr.quantity++;
      } else {
        user.inventory.push({ id: itemId, quantity: 1 });
      }

      return user.save();
    })
    .then(() => {
      res.redirect('/');
    });
});

module.exports = router;
