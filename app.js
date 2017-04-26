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
    }
    else {
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
//let passport = require('./services/passport')(app);
const passport = require('passport');
const User = require('./models').User;
app.use(passport.initialize());
app.use(passport.session());

const LocalStrategy = require('passport-local').Strategy;
passport.use(
    new LocalStrategy(function(email, password, done) {
        console.log("email is", email);
        console.log("password is", password);
        User.findOne({
                email
            })
            .then(user => {
                console.log(user);
                if (!user || !user.validPassword(password)) {
                    return done(null, false, {
                        message: 'Invalid email/password'
                    });
                }
                else {
                    return done(null, user);
                }
            })
            .catch((err) => {
                return done(err);
            });
    })
);


passport.serializeUser(function(user, done) {
    done(null, user.id);
});
passport.deserializeUser(function(id, done) {
    User.findById(id)
        .then(user => {
            done(null, user);
        })
        .catch(err => {
            done(err);
        });
});









//const authenticateRouter = require('./routes/authenticate')(passport);

/////////////////////
//If user already logged in populate res.locals
/////////////////////
app.use((req, res, next) => {
    console.log('req.user is now', req.user);
    if (req.user) {
        res.locals.currentUser = req.user;
    }
    next();
});


const indexRouter = require('./routes/index');
//app.use('/auth/', authenticateRouter);
app.post('/auth/local', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
}));



app.use('/', indexRouter);

app.listen(process.env.PORT || 3000, () => {
    console.log('taking calls');
});
