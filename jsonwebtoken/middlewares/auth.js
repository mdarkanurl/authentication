const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const authHader = req.headers['authorization'];

    const token = authHader.split(' ')[1];

    if(!token) {
        return res.status(401).json({ success: true, message: 'Please send the token' });
    }

    jwt.verify(token, process.env.ACCESS_TOKEN, (err, decoded) => {
        if(err) return res.status(404).json({ success: false, Error: err });

        req.user = decoded;
        next();
    });
}

module.exports = auth