const passport = require("passport");

const google = passport.authenticate('google', {
    failureRedirect: '/signup', successRedirect: '/profile'
});

module.exports = google