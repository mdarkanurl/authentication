const checkLogin = (req, res, next) => {
    try {
        if(!req.isAuthenticated()) {
            return res.render('login');
        }
        next();
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = checkLogin