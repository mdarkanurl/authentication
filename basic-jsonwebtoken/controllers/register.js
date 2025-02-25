const User = require('../models/database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();


const registerController = async (req, res) => {
    try {
        // get all data from body
        const { firstname, lastname, email, password} = req.body;

        // all data should exists
        if(!( firstname && lastname && email && password )) {
            res.status(400).send('All fields are compulsory');
        }

        // check if user already exists
        const findUser = await User.findOne({ email: email });
        if(findUser) {
            res.status(401).send('User already exists with this email');
        }

        // encrypt the password
        const encryptedPassword = await bcrypt.hash(password, 10);

        // Save the user in DB
        const user = await User.create({
            firstname,
            lastname,
            email,
            password: encryptedPassword
        });

        // Create payload for JWT
        const payload = {
            id: user._id,
            email: user.email
        }

        // generate a token for user and send it
        const token = jwt.sign(payload, process.env.SECRET, { expiresIn: "5m" });

        user.token = token
        user.password = undefined

        res.status(201).json(user);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

module.exports = registerController