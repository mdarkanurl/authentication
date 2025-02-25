const auth = require('../middlewares/auth');

const dashboradController = (req, res) => {
    console.log(req.user);
    res.status(200).send('Welcome to dashborad');
}

module.exports = dashboradController