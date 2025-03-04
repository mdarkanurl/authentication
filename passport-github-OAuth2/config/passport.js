const { LocalSchema, GitHubSchema } = require('../models/database');
const passport = require('passport');

require('./github');
require('./local');

passport.serializeUser((user, done) => {
    done(null, user.id)
});

passport.deserializeUser(async (id, done) => {
    try {
        let user = await LocalSchema.findById(id);

        if(!user) {
            user = await GitHubSchema.findById(id);
            if(!user) {
                return done(null, false)
            }
        }

        done(null, user);
    } catch (error) {
        done(error, false)
    }
});

module.exports = passport