const User = require("../models/database");
const { sendResetSuccessEmail } = require('../mailtrap/email')
const bcrypt = require('bcryptjs');

const resetPassword = async (req, res) => {
    try {
        const token = req.params.token;
        const { password } = req.body;

        const user = await User.findOne({
            resetPasswordToken: token,       
            resetPasswordExpiresAt: { $gt: Date.now() }
        });

        if(!user) {
            return res.status(400).json({ 
                success: false,
                message: 'Invalid or expired reset token'
             });
        }

        // update password
        const hashedpass = await bcrypt.hash(password, 10);

        user.password = hashedpass;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpiresAt = undefined;

        await user.save();

        await sendResetSuccessEmail(user.email);

        res.status(200).json({ 
            success: true,
            message: 'Password reset successful'
         })
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = {resetPassword}