const jwt = require('jsonwebtoken');
require('dotenv').config();

const auth = (req, res, next) => {
    // grab token from cookie
    console.log(req.cookies);
    const { token } = req.cookies;

    // if no token, stop there
    if(!token) {
        res.status(403).send('Login first and try to access this route');
    }

    try {
        // Deconde that token and get id
        const decode = jwt.verify(token, process.env.SECRET);
        console.log(decode);
        req.user = decode
    } catch (error) {
        console.log(error);
        res.status(401).send('Invalid Token')
    }

    next();
}

module.exports = auth