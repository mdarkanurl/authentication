const passport = require('passport');
const bcrypt = require('bcryptjs');
const { LocalSchema } = require('../models/database');
const LocalStrategy = require('passport-local').Strategy;

passport.use(
    new LocalStrategy(async (username, password, done) => {
        try {
            const user = await LocalSchema.findOne({ username });

            if(!user) {
                return done(null, false, { message: 'User is not found' });
            }

            const decodePass = await bcrypt.compare(password, user.password);

            if(!decodePass) {
                return done(null, false, { message: "incorrect password" });
            }

            done(null, user)
        } catch (error) {
            done(error, false);
        }
    })
);

module.exports = passport