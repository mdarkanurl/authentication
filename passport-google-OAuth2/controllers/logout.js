const logoutGet = (req, res) => {
    try {
        req.logout((err) => {
            if(err) {
                return next(err)
            }
            res.render('home');
        })
    } catch (error) {
        console.log(error)
    }
}

module.exports = logoutGet