const User = require("../models/database")

const checkAuth = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('-password');

        if(!user) {
            return res.status(401).json({ success: false, message: 'User not found' });
        }

        res.status(200).json({ success: true, user });
    } catch (error) {
        console.log(error)
    }
}

module.exports = { checkAuth }