const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: String,
    password: String,
    addAt: {
        type: Date,
        default: Date.now
    }
})

const User = mongoose.model('user', userSchema);

module.exports = User