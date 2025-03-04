const passport = require('passport');
const { LocalSchema, GitHubSchema } = require('../models/database');
require('dotenv').config();
const GitHubStrategy = require('passport-github2').Strategy;

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/github/callback"
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
        let user = await GitHubSchema.findOne({ githubId: profile.id });

        if(!user) {
            user = await GitHubSchema.create({ githubId: profile.id });
          }
          
        done(null, user)
    } catch (error) {
        done(error, false)
    }
  }
));

module.exports = passport