const e = require('express');
const express = require('express');
const DBConnect = require('./models/DBConnect');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/register', require('./routes/register'));
app.use('/login', require('./routes/login'));

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
    DBConnect();
});