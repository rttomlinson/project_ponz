const express = require('express');
const app = express();
const bodyParser = require('body-parser');

//Set env variables
//require('dotenv').config();

//////////////////////////
//Serve static files
//////////////////////////
app.use(express.static(__dirname + '/public'));

////////////////////////////////////
// Connect to mongo database
//////////////////////////////////
//const cleanDb = require('./seeds/clean');

// const mongoose = require('mongoose');
// app.use((req, res, next) => {
//     if (mongoose.connection.readyState) {
//         next();
//     }
//     else {
//         require('./mongo').then(() => {
//             //cleanDb().then(() => {
//             next();
//             //})
//         });
//     }
// });

const mongoose = require('mongoose');
app.use((req, res, next) => {
  if (mongoose.connection.readyState) {
    next();
  } else {
    mongoose.connect('mongodb://localhost/test').then(() => {
      // cleanDb().then(() => {
      next();
      // })
    });
  }
});

app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
////////////////////////////////
//Expres session
///////////////////////////////
const expressSession = require('express-session');

app.use(
  expressSession({
    secret: process.env.secret || 'puppies',
    saveUninitialized: false,
    resave: false
  })
);

//////////////////////////////
//Handlebars template engine
//////////////////////////////
const expressHandlebars = require('express-handlebars');
//const helpers = require('./helpers');
var hbs = expressHandlebars.create({
  partialsDir: 'views/',
  defaultLayout: 'main'
  //helpers: helpers.registered
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

/////////////////////////////
//Set up app passport
/////////////////////////////
let passport = require('./services/passport')(app);

/////////////////////
//If user already logged in populate res.locals
/////////////////////
app.use((req, res, next) => {
  console.log('req.session.user is now', req.session.user);
  if (req.session.user) {
    res.locals.currentUser = req.session.user;
  }
  next();
});

const authenticateRouter = require('./routes/authenticate')(passport);
const indexRouter = require('./routes/index');
app.use('/auth/', authenticateRouter);
app.use('/', indexRouter);

app.listen(process.env.PORT || 3000, () => {
  console.log('taking calls');
});