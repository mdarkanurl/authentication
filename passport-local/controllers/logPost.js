const passport = require('passport');

const logPost = passport.authenticate('local', {
    successRedirect: '/profile',
    failureRedirect: '/login'
});

module.exports = logPost