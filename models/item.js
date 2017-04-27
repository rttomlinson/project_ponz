const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  name: {
    type: String
  },
  price: {
    type: Number
  },
  imgLocation: {
    type: String
  }
});

ItemSchema.statics.getInventory = function() {
  //get the inventory!
};

const Item = mongoose.model('Item', ItemSchema);

module.exports = Item;
