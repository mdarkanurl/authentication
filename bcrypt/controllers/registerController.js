const User = require('../models/database');
const bcrypt = require('bcrypt');

const registerController = async (req, res) => {
    let username = req.body.username;
        const password = req.body.password;

        // Coverting username into lower case
        username = username.toLowerCase();
    try {
        // Find user if exists
        const findUser = await User.findOne({ username: username });

        if(findUser) {
            res.status(403).send('User already exists');
        } else {
            if(password.length >= 8) {
                const hashingPassword = await bcrypt.hash(password, 10);
        
                // Create new user
                const newUser = new User({ username, password: hashingPassword });
        
                // Save the new User
                await newUser.save();
                res.status(201).send(newUser);
                } else {
                    res.status(400).send('Password must be 8 letter');
                }
        }
    } catch (error) {
        res.status(500).send('Something went worng');
    }
}

// let password = '1234678'
// console.log(password.length);

module.exports = registerController;