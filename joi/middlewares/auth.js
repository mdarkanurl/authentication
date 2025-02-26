const jwt = require('jsonwebtoken');
require('dotenv').config();

const auth = (req, res, next) => {
    // Get data from cookies
    const { token } = req.cookies;

    // Check if token doesn't exists
    if(!token) {
        res.status(403).send('Login first and try to access this route');
    }

    try {
        // Deconde that token and get id
        const decode = jwt.verify(token, process.env.TOKEN);
        req.user = decode
    } catch (error) {
        console.log(error);
        res.status(401).send('Invalid Token')
    }

    next();
}

module.exports = auth