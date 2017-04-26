const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
//const passportMongoose = require('passport-local-mongoose');

const UserSchema = mongoose.Schema({
  email: { type: String },
  password: { type: String },
  parent: { type: Schema.Types.ObjectId },
  children: [{ type: Schema.Types.ObjectId }],
  referralLink: { type: String }
});

UserSchema.virtual('points').get(function(name) {
  //points!
  let points;
  return this.points;
});

UserSchema.virtual('referralLink')
  .get(function(email) {
    return this.referralLink;
  })
  .set(function(email) {
    this.referralLink = bcrypt.hashSync(email, 8);
  });

const User = mongoose.model('User', UserSchema);

module.exports = User;
