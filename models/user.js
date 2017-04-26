const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt');
//const passportMongoose = require('passport-local-mongoose');
var findOrCreate = require('mongoose-findorcreate');
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
  parent: {
    type: Schema.Types.ObjectId
  },
  children: [
    {
      type: Schema.Types.ObjectId
    }
  ]
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
    let link = `referral/${this.id}`;
    return link;
  })
  .set(function(value) {
    this.referralHash = bcrypt.hashSync(value, 8);
  });

UserSchema.methods.validatePassword = function(password) {
  return bcrypt.compareSync(password, this.passwordHash);
};

const User = mongoose.model('User', UserSchema);

module.exports = User;
