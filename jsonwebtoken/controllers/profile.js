const profile = (req, res) => {
    const user = req.user;
    user.exp =  undefined;
    user.iat = undefined;
    res.status(200).json({ success: true, message: 'Welcome to profile page', user });
}

module.exports = profile