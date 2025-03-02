const passport = require('passport');
const bcrypt = require('bcryptjs');
const { User } = require('../models/database');  // Correctly require the User model
const LocalStrategy = require('passport-local').Strategy;

passport.use(
    new LocalStrategy(async (username, password, done) => {
        try {
            username = username.toLowerCase();

            // Check if user exists or not
            const user = await User.findOne({ username });

            if (!user) {
                return done(null, false, { message: 'Invalid username' });
            }

            // Match the password
            const decodePass = await bcrypt.compare(password, user.password);

            if (!decodePass) {
                return done(null, false, { message: 'Incorrect password' });
            }

            return done(null, user);
        } catch (error) {
            console.error(error);
            return done(error);
        }
    })
);

module.exports = passport;