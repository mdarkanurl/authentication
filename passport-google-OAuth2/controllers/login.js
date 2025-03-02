const passport = require('passport');

const loginGet = (req, res) => {
    res.render('login');
}

const loginPost = passport.authenticate('local', { failureRedirect: '/login', successRedirect: '/profile' });

module.exports = { loginGet, loginPost }