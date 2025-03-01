const checkLog = (req, res, next) => {
    if(req.isAuthenticated()) {
        return res.redirect('/profile');
    }
    next();
}

module.exports = checkLog