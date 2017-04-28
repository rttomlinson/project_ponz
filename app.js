const express = require('express');
const app = express();
const bodyParser = require('body-parser');


//////////////////////////
//Serve static files
//////////////////////////
app.use(express.static(__dirname + '/public'));

////////////////////////////////////
// Connect to mongo database
//////////////////////////////////

const mongoose = require('mongoose');
app.use((req, res, next) => {
    if (mongoose.connection.readyState) {
        next();
    }
    else {
        require('./mongo')().then(() => {
            next();
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
//const children = require('./helpers/children');
const helpers = require('./helpers');
var hbs = expressHandlebars.create({
  partialsDir: 'views/',
  defaultLayout: 'main',
  helpers: helpers.registered
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
  //console.log('req.user is now', req.user);
  if (req.user) {
    res.locals.currentUser = req.user;
  }
  next();
});


////////////////////////////////////////////
// Flash Messages
/////////////////////////////////////////////
var flash = require('express-flash-messages');
app.use(flash());

const indexRouter = require('./routes/index');
const authenticateRouter = require('./routes/authenticate')(passport);
const registerRouter = require('./routes/register')(passport);
const shopRouter = require('./routes/shop');

app.use('/shop', shopRouter);
app.use('/register', registerRouter);
app.use('/auth/', authenticateRouter);
app.use('/', indexRouter);

app.listen(process.env.PORT || 3000, () => {
  console.log('taking calls');
});
