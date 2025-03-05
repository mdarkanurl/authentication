const Joi = require('joi');
const bcrypt = require('bcryptjs');
const User = require('../models/database');
const generateTokenAndSetCookie = require('../utils/generateTokenAndSetCookie');
const { sendVerificationEmail } = require('../mailtrap/email');

const signupGet = () => {

}

const signupPost = async (req, res) => {
    const { email, password, name } = req.body;
    try {
        // Check all data using Joi
        const schema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().min(6).regex(/[a-z]/, 'lowercase').regex(/\d/, 'Number').required(),
            name: Joi.string().min(3).required(),
        });

        const { error } = schema.validate(req.body, { abortEarly: false, errors: { wrap: { label: "" } } });

        if( error ) {
            const err = error.details.map(msg => msg.message);
            return res.status(301).json({ success: false, message: err });
        }

        const finduser = await User.findOne({ email });

        if(finduser) {
            return res.status(400).json({ success: false, message: 'User already exists' });
        }

        const hashedPass = await bcrypt.hash(password, 10);
        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();

        const user = new User({
            email,
            password: hashedPass,
            name,
            verificationToken,
            verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000
        })

        await user.save();

        // jwt
        generateTokenAndSetCookie(res, user._id);

        await sendVerificationEmail(user.email, verificationToken);

        res.status(201).json({
            success: true,
            message: 'User created successfully',
            user: {
                ...User._doc,
                password: undefined
            }
        })
    } catch (error) {
        
    }
}

module.exports = { signupGet, signupPost }