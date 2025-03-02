const passport = require('passport');
const { User, User_OAuth } = require('../models/database'); // Import your models
require('./OAuth');  // Import the local strategy
require('./local');  // Import the OAuth strategy

// Serialize the user ID into the session
passport.serializeUser((user, done) => {
    done(null, user.id);  // Store user.id (or any unique identifier) in the session
});

// Deserialize the user from the session
passport.deserializeUser(async (id, done) => {
    try {
        // Try to find the user in the User collection (for local auth)
        let user = await User.findById(id);
        
        // If the user isn't found in User, try to find them in the User_OAuth collection (for OAuth)
        if (!user) {
            user = await User_OAuth.findById(id);
        }

        // Pass the user object to the done callback
        done(null, user);
    } catch (error) {
        done(error, false);
    }
});

module.exports = passport