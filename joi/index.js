const express = require('express');
const app = express();
require('dotenv').config()
const cookieParser = require('cookie-parser');
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Router
app.use('/register', require('./routes/register'));
app.use('/login', require('./routes/login'));
app.use('/get', require('./routes/test'));

// Base route
app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Welcome to base route'
    });
});

// Handling bad requests like invalid routes
app.use((req, res, next) => {
    res.status(400).send('Bad request');
  });

// Server error
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!');
})

app.listen(PORT, async () => {
    console.log(`http://localhost:${PORT}`);
    await require('../joi/models/connect')();
});