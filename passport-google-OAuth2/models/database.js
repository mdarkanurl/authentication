const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: String,
    password: String,
    addAt: {
        type: Date,
        default: Date.now
    }
});

const userSchema_OAuth = mongoose.Schema({
    username: String,
    googleId: {
        type: String,
        required : true
    },
    addAt: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model('user', userSchema);
const User_OAuth = mongoose.model('User_OAuth', userSchema_OAuth);

module.exports = { User, User_OAuth }