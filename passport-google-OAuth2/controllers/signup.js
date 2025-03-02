const Joi = require('joi');
const bcrypt = require('bcryptjs');
const { User } = require('../models/database');

const singupGet = (req, res) => {
    res.render('signup');
}

const singupPost = async (req, res) => {
    try {
        // Get all data from body
        const password = req.body.password;
        let username = req.body.username;
        username = username.toLowerCase();;

        // Validate all data using Joi
        const schema = Joi.object({
            username: Joi.string().required(),
            password: Joi.string().min(8).regex(/[a-z]/, 'lowercase letter').regex(/\d/, 'number').required()
        });

        const { error } = schema.validate(req.body, { abortEarly: false, errors: { wrap: { label: "" } } });

        if(error) {
            const message = error.details.map(msg => msg.message);
            return res.status(401).json({ success: false, message: message });
        }

        // Check if user already exists
        const findUser = await User.findOne({ username });

        if(findUser) {
            return res.status(301).json({ success: false, message: `${username} is not available, please try another username` });
        }

        // Hash the password
        const hashPass = await bcrypt.hash(password, 10);

        const user = await User.create({ username, password: hashPass });

        res.render('login');
    } catch (error) {
        console.log(error);
    }
}

module.exports = { singupGet, singupPost }