const models = require('../models/');
const User = models.User;
const Item = models.Item;

module.exports = () => {
    // ----------------------------------------
    // Create Users
    // ----------------------------------------
    console.log('Creating Users');
    var users = [];
    let user = new User({
        email: 'admin',
        password: 'admin',
        children: [],
        dogeCoins: 1000
    });
    users.push(user);
    
    // ----------------------------------------
    // Create Items
    // ----------------------------------------
    console.log('Creating Users');
    var items = [];
    let item = new Item({
        price: 50,
        imgLocation: 'data:image/png;base64,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"'
    });
    users.push(item);
    let item1 = new Item({
        email: 'admin@admin.com',
        password: 'password',
        children: [],
        dogeCoins: 1000
    });
    users.push(item);
    item = new Item({
        email: 'admin@admin.com',
        password: 'password',
        children: [],
        dogeCoins: 1000
    });
    users.push(item);
    item = new Item({
        email: 'admin@admin.com',
        password: 'password',
        children: [],
        dogeCoins: 1000
    });
    users.push(item);
    item = new Item({
        email: 'admin@admin.com',
        password: 'password',
        children: [],
        dogeCoins: 1000
    });
    users.push(item);
    
    
    

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
