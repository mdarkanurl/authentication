const User = require("../models/database");
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const loginControllers = async (req, res) => {
    try {
        // get all data from user
        const { email, password } = req.body;

        // check all data given
        if(!( email && password )) {
            res.status(400).send('Give a data');
        }
        // find user in DB
        const findUser = await User.findOne({ email });

        // If user not there
        if(!findUser) {
            res.status(301).send('User is not found');
        }
        // Match the password
        const comparedPassword = await bcrypt.compare(password, findUser.password);

        // if password donsn't match
        if(!comparedPassword) {
            res.status(401).send("Incorrect password");
        }

        // Create payload for JWT
        const payload = {
            id: findUser._id,
            email: findUser.email
        }

        if(comparedPassword) {
            const token = jwt.sign(payload, process.env.SECRET, ({ expiresIn: "5m" }));

            findUser.token = token
            findUser.password = undefined

            // send the cookie in user cookie
            // cookie section
            const options = {
                expires: new Date(Date.now() + 60 * 60 * 1000),
                httpOnly: true
            };

            res.status(200).cookie("token", token, options).json({
                success: true,
                token,
            });
        }
        // send a token
    } catch (error) {
        console.log(error);
    }
}

module.exports = loginControllers