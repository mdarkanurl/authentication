const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    email: String,
    password: String,
    name: String,
    lastLogin: {
        type: Date,
        default: Date.now
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    resetPasswordToken: String,
    resetPasswordExpiresAt: Date,
    verificationToken: String,
    verificationTokenExpiresAt: Date
}, { timestamps: true });

const User = mongoose.model('user', userSchema);

module.exports = User