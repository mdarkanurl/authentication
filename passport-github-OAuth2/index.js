const express = require('express');
const passport = require('passport');
const MongoStore  = require('connect-mongo');
const session = require('express-session');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 5000;

require('./config/passport');
// app.get('/auth/github', passport.authenticate('github', { scope: ['profile'] }));

app.set('view engine', 'ejs');

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URL, collectionName: 'sessions' }),
    cookie: {
        httpOnly: true,
        secure: false,
        maxAge: 24 * 60 * 60 * 1000
    }
}));

app.use(passport.initialize());
app.use(passport.session());

// Built-in middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('views'));

// Redirect the user to GitHub for authentication
app.get('/auth/github',
    passport.authenticate('github', { scope: ['user:email'], forceLogin: true })
);

// Router
app.use('/signup', require('./routes/signup'));
app.use('/login', require('./routes/login'));
app.use('/auth/github/callback', require('./routes/github'));
app.use('/profile', require('./routes/profile'));
app.use('/logout', require('./routes/logout'));

// Base route
app.get('/', (req, res) => {
    res.render('home');
});

// server err
app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(500).send('something went worng');
});

app.listen(port, async () => {
    console.log(`http://localhost:${port}`);
    require('./models/connect')();
});