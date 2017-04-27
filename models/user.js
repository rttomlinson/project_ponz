const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt');
//const passportMongoose = require('passport-local-mongoose');
const findOrCreate = require('mongoose-findorcreate');
const Schema = mongoose.Schema;

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
    }
});

UserSchema.plugin(uniqueValidator);
UserSchema.plugin(findOrCreate);

UserSchema.virtual('points').get(function(name) {
    //points!
    let points;
    return this.points;
});

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

UserSchema.methods.populateChildren = function() {

    return Promise.all(
            this.children.map(function(childId) {
                return User.findById(childId).populate('children').then(child => {
                    //Get money based on depth of this child element
                    if (child.children.length == 0) {
                        return child;
                    }
                    else {
                        return child.populateChildren();
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
                dogeCoins: getMoney(depth)
            }
        })
        .then((user) => {
            if (user.parentId) {
                return user.addMoneyToParentAccount(depth + 1);
            }
        })
        .catch((err) => console.log(err));
};

const User = mongoose.model('User', UserSchema);

module.exports = User;





function getMoney(depth) {
    switch (depth) {
        case 1:
            return 40;
        case 2:
            return 20;
        case 3:
            return 10;
        case 4:
            return 5;
        case 5:
            return 2;
        default:
            return 1;
    }
}
