const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('passport');
const cors = require('cors');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 5000;

require('./config/passport');

app.set('view engine', 'ejs');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('views'));

// Middleware
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URL }), // Use your MongoDB URL
    cookie: { 
      httpOnly: true, 
      secure: false, // Use true if HTTPS
      maxAge: 24 * 60 * 60 * 1000  // 1 day
    }
}));

app.use(passport.initialize());
app.use(passport.session());

// Base url
app.use('/', require('./routes/home'));
app.use('/register', require('./routes/regGet'));
app.use('/register', require('./routes/regPost'));
app.use('/login', require('./routes/logGet'));
app.use('/login', require('./routes/logPost'));
app.use('/profile', require('./routes/profile'));
// app.use('/logout', require('./routes/logoutGet'));
app.use('/logout', require('./routes/logout'));


app.listen(port, async () => {
    console.log(`http://localhost:${port}`);
    require('./models/connect')();
});