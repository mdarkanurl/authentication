const jwt = require('jsonwebtoken');
require('dotenv').config();
// console.log(process.env.JWT_SECRET);

const verfiyToken = (req, res, next) => {
    const token = req.cookies.token;

    if(!token) {
        return res.status(401).json({ success: false, message: 'not token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        if(!decoded) {
            return res.status(401).json({ success: false, message: 'Invalid token' });
        }

        req.userId = decoded.userId;
        next()
    } catch (error) {
        console.log(error);
    }
}

module.exports = { verfiyToken }