const Joi = require('joi');
const User = require('../models/database');
const bcrypt = require('bcryptjs');

const regPost = async (req, res) => {
    try {
        // Get all data
        let username = req.body.username;
        const password = req.body.password;
        username = username.toLowerCase();

        // Validate all data using Joi
        const schema = Joi.object({
            username: Joi.string().required(),
            password: Joi.string().min(8).regex(/[A-Z]/, 'uppercase').regex(/[a-z]/, 'lowercase').regex(/\d/, 'number').required()
        });

        const { error } = schema.validate(req.body, { abortEarly: false, errors: { wrap: { label: "" } } });

        if(error) {
            const msg = error.details.map(msg => msg.message);
            return res.status(401).json({ success: false, message: msg });
        }

        // Check if username avaliable or not
        const findUser = await User.findOne({ username });

        if(findUser) {
            return res.status(401).json({ success: false, message: `${username} is not avaliable, please try another username` });
        }

        // Hash the pass
        const hashPass = await bcrypt.hash(password, 10);

        // Save the user
        const user = User.create({ username, password: hashPass });

        // Redirect to login page
        res.status(201).redirect('/login');
    } catch (error) {
        console.log(error);
    }
}

module.exports = regPost