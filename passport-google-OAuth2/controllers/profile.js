const profileGet = (req, res) => {
    if (req.isAuthenticated()) {
        res.render('profile');
    } else {
        res.redirect('/login');
    }
}

module.exports = profileGet