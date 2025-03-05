const { sendWelcomeWmail } = require('../mailtrap/email');
const User = require('../models/database');

const verifyEmail = async (req, res) => {
    const { code } = req.body;
    try {
        const user = await User.findOne({ 
            verificationToken: code,
            verificationTokenExpiresAt: { $gt: Date.now() }
         });

         if(!user) {
            return res.status(400).json({ success: false, message: 'Invalid or expired verfication cpde' })
         }

         user.isVerified = true;
         user.verificationToken = undefined;
         user.verificationTokenExpiresAt = undefined;
         await user.save();

         await sendWelcomeWmail(user.email, user.name);

         res.status(200).json({
            success: true,
            message: 'Email verified successfully',
            user: {
                ...User._doc,
                password: undefined
            }
         })
    } catch (error) {
        console.log(error);
    }
}

module.exports = { verifyEmail }