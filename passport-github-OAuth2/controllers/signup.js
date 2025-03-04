const Joi = require('joi');
const bcrypt = require('bcryptjs');
const { LocalSchema } = require('../models/database');

const signupGet = (req, res) => {
    res.render('signup');
}

const signupPost = async (req, res) => {
    try {
        // Get all data
        let username = req.body.username;
        const password = req.body.password;
        username = username.toLowerCase();

        // Validate data using Joi
        const schema = Joi.object({
            username: Joi.string().required(),
            password: Joi.string().min(6).regex(/[a-z]/, 'Lowercase letter').regex(/\d/, 'number').required()
        });

        const { error } = schema.validate(req.body, { abortEarly: false, errors: { wrap: { label: "" } } });

        if(error) {
            const msg = error.details.map(msg => msg.message);
            return res.send(msg);
        }

        // Check if user already exists
        const user = await LocalSchema.findOne({ username });

        if(user) {
            return res.status(404).send(`${username} is not available, please try another username`);
        }

        // Hash the password
        const hashPass = await bcrypt.hash(password, 10);

        await LocalSchema.create({ username, password: hashPass });

        res.redirect('login');
    } catch (error) { 
        console.log(error.message)
    }
}

module.exports = { signupGet, signupPost }