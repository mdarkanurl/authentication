const User = require('../models/database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const login = async (req, res) => {
    // Get all data
    const password = req.body.password;
    let username = req.body.username;
    username = username.toLowerCase();

    // check if user exists or not
    const findUser = await User.findOne({ username });

    if(!findUser) {
        return res.status(301).json({ success: false, message: 'Invalid user, not found' });
    }

    // Match the password
    const decodePass = await bcrypt.compare(password, findUser.password);

    if(!decodePass) {
        return res.status(302).json({ success: false, message: 'Incorrect password' });
    }

    // Create a payload for JWT
    const payload = {
        fullname: findUser.fullname,
        username: username,
        id: findUser._id
    }

    // Generate token
    const token = jwt.sign(payload, process.env.ACCESS_TOKEN, { expiresIn: '1m' });

    findUser.token = token;
    findUser.password = undefined;

    // Return the user
    res.status(200).json({ success: true, token: token });
}

module.exports = login