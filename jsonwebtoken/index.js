const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 5000;

// Built-in middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Router
app.use('/register', require('../jsonwebtoken/routes/register'));
app.use('/login', require('../jsonwebtoken/routes/login'));
app.use('/profile', require('../jsonwebtoken/routes/profile'));

// Server error handler
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
});

app.listen(PORT, async () => {
    console.log(`http://localhost:${PORT}`);
    require('./models/connect')();
});