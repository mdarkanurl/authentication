const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    fullname: String,
    username: {
        type: String,
        unique: true
    },
    password: String,
    token: String,
    addAt: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model('user', userSchema);

module.exports = User