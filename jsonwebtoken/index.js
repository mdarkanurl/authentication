const express = require('express');
const app = express();
require('dotenv').config();
const cookieParser = require('cookie-parser');
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());

// route
app.use('/register', require('./routes/register'));
app.use('/login', require('./routes/login'));
app.use('/dashborad', require('./routes/auth'));

// Handling bad requests like invalid routes
app.use((req, res, next) => {
    res.status(400).send('Bad request');
  });

// Server error
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!');
});

app.listen(PORT, async () => {
    console.log(`http://localhost:${PORT}`);
    require('./models/DBConnect')();
});