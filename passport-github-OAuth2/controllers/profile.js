const profileGet = (req, res) => {
    if(req.isAuthenticated()) {
        return res.render('profile')
    } else {
        res.redirect('/login');
    }
}

module.exports = profileGet