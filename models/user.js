const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;
const helpers = require('../helpers').registered;
const Item = require('./item');

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    passwordHash: {
        type: String,
        required: true
    },
    parentId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    children: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    dogeCoins: {
        type: Number,
        default: 0
    },
    inventory: [{
        type: Schema.Types.Mixed
    }]
});

UserSchema.plugin(uniqueValidator);


UserSchema.virtual('password').set(function(value) {
    this.passwordHash = bcrypt.hashSync(value, 8);
});

UserSchema.virtual('referralLink')
    .get(function() {
        let link = `register/${this.id}`;
        return link;
    })
    .set(function(value) {
        this.referralHash = bcrypt.hashSync(value, 8);
    });

UserSchema.methods.validatePassword = function(password) {
    return bcrypt.compareSync(password, this.passwordHash);
};

UserSchema.methods.populateChildren = function(depth = 1) {
    return Promise.all(
            this.children.map(function(childId) {
                return User.findById(childId).populate('children').then(child => {
                    child.depth = depth;
                    if (child.children.length == 0) {
                        return child;
                    }
                    else {
                        return child.populateChildren(depth + 1);
                    }
                });
            })
        )
        .then(children => {
            this.children = children;
            return this;
        })
        .catch(function(err) {
            console.log(err);
        });
};


UserSchema.methods.addMoneyToParentAccount = function(depth = 1) {
    return User.findByIdAndUpdate(this.parentId, {
            $inc: {
                dogeCoins: helpers.getMoney(depth)
            }
        })
        .then(user => {
            if (user.parentId) {
                return user.addMoneyToParentAccount(depth + 1);
            }
        })
        .catch(err => console.log(err));
};




UserSchema.methods.purchaseItem = function(itemId, price) {

    return User.findByIdAndUpdate(this.id, {
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
                return Item.findById(itemId, {
                        _id: 0,
                        imgLocation: 1
                    })
                    .then(item => {
                        let userItem = {};
                        userItem.quantity = 1;
                        userItem.imgLocation = item.imgLocation;
                        user.inventory.push(userItem);
                        return user.save();
                    });
            }
        });
};


const User = mongoose.model('User', UserSchema);

module.exports = User;
