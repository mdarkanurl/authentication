const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/database');
const bcrypt = require('bcryptjs');

passport.use(
    new LocalStrategy(async (username, password, done) => {
        try {
            const user = await User.findOne({ username });

            // If not found
            if(!user) {
                return done(null, false, { message: 'Incorrect username' });
            }

            // Match the password
            const decodePass = await bcrypt.compare(password, user.password);

            // If pass doesn't match
            if(!decodePass) {
                done(null, false, { message: 'Incorrect password' })
            }

            done(null, user)
        } catch (error) {
            done(error, false);
        }
    })
);

// used to serialize the user for the session
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id); // Fetch user by ID
        done(null, user);  // Pass user to done() if found
    } catch (err) {
        done(err, null);  // Pass error to done() if an error occurs
    }
});

module.exports = passport