const express = require('express');
const cookiesParser = require('cookie-parser');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

// Built-in route
app.use(express.json());
app.use(cookiesParser());
app.use(express.urlencoded({ extended: true }));

// Router
app.use('/signup', require('./routes/signup'));
app.use('/verify', require('./routes/verify-email'));
app.use('/login', require('./routes/login'));
app.use('/logout', require('./routes/logout'));
app.use('/forgot-pass', require('./routes/forgot-pass'));
app.use('/reset-pass', require('./routes/reset-pass'));
app.use('/check-auth', require('./routes/auth'));

app.listen(port, async () => {
    console.log(`http://localhost:${port}`);
    await require('./models/connect')();
});