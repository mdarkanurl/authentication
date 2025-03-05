const User = require('../models/database');
const { sendVerificationEmail, sendWelcomeWmail, sendPaaswordResetEmail } = require('../mailtrap/email');
const crypto = require('crypto');

const forgotPassPost = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });

        if(!user) {
            return res.status(400).json({ success: false, message: 'Invalid email' });
        }

        // Generate reset token
        const resetToken = crypto.randomBytes(20).toString('hex');
        const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000;

        user.resetPasswordToken = resetToken;
        user.resetPasswordExpiresAt = resetTokenExpiresAt;

        await user.save();

        await sendPaaswordResetEmail(user.email, `http://localhost:3000/reset-pass/${resetToken}`);

        res.status(200).json({ success: true, message: 'password reset link sent to your email' });
    } catch (error) {
        console.log(error)
    }
}

module.exports = {forgotPassPost}