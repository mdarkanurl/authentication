const Joi = require('joi');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/database');
require('dotenv').config();

const loginControllers = async (req, res) => {
    try {
        // Get all data
        const { email, password } = req.body;

        // step1: create a schema
        const schema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().min(8).required()
        });

        // step2: validate data using schema
        const { error } = schema.validate( req.body, { abortEarly: false, errors: { wrap: { label: "" } }});

        // Return the err msg if exists
        if(error) {
            const errMsg = error.details.map( (err) => err.message );
            // Return the err message
            res.status(301).json({
                success: false,
                data: errMsg
            });
        }

        // Check user exists or not
        const findUser = await User.findOne({ email });

        // If user doesn't exists
        if(!findUser) {
            res.status(301).send('User doesn\'t exists, please register');
        }

        // Compare the password
        const decodedPass = await bcrypt.compare(password, findUser.password);

        // Check password match
        if(!decodedPass) {
            res.status(301).send('Incorrect password');
        }

        // create payload for JWT
        const payload = {
            id: findUser._id,
            email: findUser.email
        }

        // generate a token for user and send it
        const token = jwt.sign(payload, process.env.TOKEN, { expiresIn: '5m' });

        // Create options
        const options = {
            expires: new Date(Date.now() + 60 * 60 * 1000),
            httpOnly: true
        }

        res.status(200).cookie("token", token, options).json({
            success: true,
            token: token
        });
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = loginControllers