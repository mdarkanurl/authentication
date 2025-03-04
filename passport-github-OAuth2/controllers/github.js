const passport = require('passport');

const githubGet = passport.authenticate('github', { failureRedirect: '/signup', successRedirect: '/profile' });

module.exports = githubGet