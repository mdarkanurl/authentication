const express = require('express');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const app = express();
const cors = require('cors');
require('dotenv').config();
const PORT = process.env.PORT || 5000;

// Import passport from config folder;
require('./config/passport');

// Built-in middlewares
app.use(express.json());
app.use(express.static('views'));
app.use(cors());
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));

app.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }));

// session setup
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URL }),
    cookie: {
        httpOnly: true,
        secure: false,
        maxAge: 24 * 60 * 60 * 1000
    }
}));

// Passport middlewares
app.use(passport.initialize());
app.use(passport.session());

// Router
app.use('/', require('./routes/home'));
app.use('/signup', require('./routes/singup'));
app.use('/auth/google/callback', require('./routes/google'));
app.use('/login', require('./routes/login'));
app.use('/profile', require('./routes/profile'));
app.use('/logout', require('./routes/logout'));

// Server error
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
});

app.listen(PORT, async () => {
    console.log(`http://localhost:${PORT}`);
    require('./models/connect')();
});