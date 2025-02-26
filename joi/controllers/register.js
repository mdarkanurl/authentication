const Joi = require('joi');
const User = require('../models/database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();


const register = async (req, res) => {
    try {
        // Get all data
        const { name, email, password } = req.body;

        // data validation using joi
        // step1: create a schema
        const schema = Joi.object({
            name: Joi.string().max(50).min(3).required(),
            email: Joi.string().email().required(),
            password: Joi.string().min(8).required().regex(/[A-Z]/, 'uppercase letter').regex(/[a-z]/, 'lowercase letter').regex(/\d/, 'digit').regex(/[@$!*?&]/, 'spexial xharacter')
        });


        // step2: validate data using schema
        const { error } = schema.validate(req.body, { abortEarly: false, errors: { wrap: { label: "" } } });
        

        // Return the err msg
        if(error) {
            const msg = error.details.map(err => err.message);
            return res.status(301).json({
                message: "Ivalid input",
                error: msg
            });
        }

        // Check if user already exists
        const findUser = await User.findOne({ email });

        // Return the user if exists
        if(findUser) {
            res.status(301).send('User already exists, please login');
        }

        // Hash the password
        const hashingPass = await bcrypt.hash(password, 10);

        // Create user
        const user = await User.create({ name, email, password: hashingPass });

        // Create payload for JWT
        const payload = {
            id: user._id,
            email: user.email
        }

        // generate a token for user and send it
        const token = jwt.sign(payload, process.env.TOKEN, {  expiresIn: '5m' });

        // Add token to user and remove password
        user.token = token;
        user.password = undefined;

        // Return the user
        res.status(201).json({ message: "User was created", data: user });
    } catch (error) {
        res.send({ error: error });
    }
}

module.exports = register