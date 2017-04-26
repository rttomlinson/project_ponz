const User = require('../models/').User;

module.exports = () => {
  // ----------------------------------------
  // Create Users
  // ----------------------------------------
  console.log('Creating Users');
  var users = [];
  let user = new User({
    email: 'admin@admin.com',
    password: 'password',
    children: []
  });
  users.push(user);

  // ----------------------------------------
  // Finish
  // ----------------------------------------
  console.log('Saving...');

  var promises = [];
  [users].forEach(collection => {
    collection.forEach(model => {
      promises.push(model.save());
    });
  });
  return Promise.all(promises);
};
