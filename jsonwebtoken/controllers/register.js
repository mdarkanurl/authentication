const Joi = require('joi');
const User = require('../models/database');
const bcrypt = require('bcryptjs');

const register = async (req, res) => {
    // Get all data
    const { fullname, password } = req.body;
    let username = req.body.username;
    username = username.toLowerCase();

    
    // Check all data using Joi
    const schema = Joi.object({
        fullname: Joi.string().min(3).required(),
        username: Joi.string().required(),
        password: Joi.string().min(8).regex(/[A-Z]/, 'uppercase').regex(/[a-z]/, 'lowercase').regex(/\d/, 'Number').required()
    });

    const { error } = schema.validate(req.body, { abortEarly: false, errors: { wrap: { label: "" } } });

    if( error ) {
        const err = error.details.map(msg => msg.message);
        return res.status(301).json({ success: false, message: err });
    }

    // Check if user already exists
    const findUser = await User.findOne({ username });

    if(findUser) {
        return res.status(302).json({ success: false, message: 'username is not available, please try another username ' });
    }

    // Hash the password
    const hashPass = await bcrypt.hash(password, 10);

    // Save the user
    const user = await User.create({ fullname, username, password: hashPass });

    res.status(201).json({ success: true, message: `${username} created`, data: user });
}

module.exports = register