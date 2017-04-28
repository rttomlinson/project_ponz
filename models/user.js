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
    // let user = await User.findById(this.id).populate('children');
    // user.children = await Promise.all(user.children.map((child) => {
    //     return child.populateChildren();
    // }));
    // return user;

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

UserSchema.methods.removeMoneyFromAccount = function(amount) {
    //This function should return the updated user instance
    return User.findByIdAndUpdate(this.id, {
        $inc: {
            dogeCoins: amount * -1
        }
    });
};

UserSchema.methods.purchaseItem = function(itemId, price) {
    let userId = this.id;
    if (this.dogeCoins < price) {
        //req.flash('alert', `Much bummer! You need more coins!`);
        return;
    }
    return this.removeMoneyFromAccount(price)
        .then(user => {
            //go over user's current inventory and try to increment they already have item
            let itemToIncr = user.inventory.find(function(item) {
                return item.id == itemId;
            });
            if (itemToIncr) {
                console.log('Found matching item');

                itemToIncr.quantity++;
                //find the index of the item
                let index = user.inventory.findIndex((item) => {
                    return item.id == itemId;
                });
                //remove it and replace with the incremented item
                user.inventory.splice(index, 1, itemToIncr);
                //save the new user
                return user.save();

                // return User.update({
                //         id: userId,
                //         "inventory.id": itemId
                //     }, {
                //         $inc: {
                //             "inventory.$.quantity": 1
                //         }
                //     }

                // itemToIncr.quantity++;
                // return user.update({
                //     $pull: {
                //         inventory: {
                //             id: itemId
                //         }
                //     },
                //     $push: {
                //         inventory: {
                //             itemToIncr
                //         }
                //     }
                // });
            }
            else {
                return Item.findById(itemId, {
                    _id: 0,
                    imgLocation: 1
                }).then(item => {
                    let userItem = {};
                    userItem.quantity = 1;
                    userItem.imgLocation = item.imgLocation;
                    userItem.id = itemId;
                    user.inventory.push(userItem);
                    return user.save();
                });
            }
        });
}


//     User.update({
//         id: userId,
//         "inventory.id": itemId
//     }, {
//         $inc: {
//             "inventory.$.quantity": 1
//         }
//     })
//     .then((result) => {
//         //if succeeded return with nothing
//         console.log("result is", result);
//         if (result.n) {
//             return;
//         }
//         //less add a new item to the inventory
//         else {
//             console.log("attempting to add to set");
//             let
//             return User.update({
//                 id: userId
//             }, {
//                 $addToSet: {
//                     "inventory": {
//                         "id": itemId,
//                         "quantity": 1
//                     }
//                 }
//             });
//         }
//     });
// });





// let itemToIncr = user.inventory.find(function(item) {
//     return item.id == itemId;
// });
// if (itemToIncr) {
//     console.log('Found matching item');
//     itemToIncr.quantity++;
//     user.update()
//     return user.save(); //Not working
// }
// else {
//     return Item.findById(itemId, {
//         _id: 0,
//         imgLocation: 1
//     }).then(item => {
//         let userItem = {};
//         userItem.quantity = 1;
//         userItem.imgLocation = item.imgLocation;
//         userItem.id = itemId;
//         user.inventory.push(userItem);
//         return user.save();
//     });
// }



const User = mongoose.model('User', UserSchema);

module.exports = User;
