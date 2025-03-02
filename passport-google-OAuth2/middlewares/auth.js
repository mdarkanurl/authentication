const checkLog = (req, res, next) => {
    try {
        if(req.isAuthenticated()) {
            res.redirect('/profile');
        }
        next();
    } catch (error) {
        console.log(error);
    }
}

module.exports = checkLog