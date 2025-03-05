const User = require('../models/database');
const bcrypt = require('bcryptjs');
const generateTokenAndSetCookie = require('../utils/generateTokenAndSetCookie');
const { use } = require('../routes/logout');

const loginPost = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if(!user) {
            return res.status(400).json({ success: false, message: 'Invalid email' });
        }

        const isPassValid = await bcrypt.compare(password, user.password);

        if(!isPassValid) {
            return res.status(400).json({ success: false, message: 'Invalid password' });
        }

        generateTokenAndSetCookie(res, user._id);

        user.lastLogin = new Date();
        await user.save();

        res.status(200).json({
            success: true,
            message: 'Logged in successfully',
            user: {
                ...user._doc,
                password: undefined
            }
        });
    } catch (error) {
        console.log(error)
    }
}

module.exports = { loginPost }