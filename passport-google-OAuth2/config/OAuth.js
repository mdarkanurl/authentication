const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport');
const { User, User_OAuth } = require('../models/database');
require('dotenv').config();

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback"
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
        // Use async/await instead of callback
        const user = await User_OAuth.findOne({ googleId: profile.id });

        if (!user) {
            // If no user found, create a new user
            let newUser = new User_OAuth({
                googleId: profile.id,
                username: profile.displayName
            });
            
            await newUser.save();  // Ensure the new user is saved to the database
            return done(null, newUser);
        } else {
            // If user found, return the existing user
            return done(null, user);
        }
    } catch (err) {
        // Handle any errors that might occur during the find operation
        return done(err, null);
    }
  }
));

module.exports = passport;