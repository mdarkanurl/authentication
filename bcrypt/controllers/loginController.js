const User = require('../models/database');
const bcrypt = require('bcrypt');


const loginController = async (req, res) => {
    try {
        let username = req.body.username;
        const password = req.body.password;

        // Coverting username into lower case
        username = username.toLowerCase();

        // Check if user exists
        const findUser = await User.findOne({ username: username });

        // If user not found
        if(!findUser) {
            res.status(404).send('User not found. Invalid username');
        } else {
            // Match the password
        bcrypt.compare(password, findUser.password, (err, isMatch) => {
            if(err) throw err;
            if(isMatch) {
                res.status(200).json({
                    success: true,
                    username: username
                });
            } else {
            // Not match the password
            res.status(301).send('Incorrect password');
            }
        });
        }
    } catch (error) {
        res.status(500).send('Something went worng');
    }
}

module.exports = loginController;