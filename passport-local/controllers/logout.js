const logout = (req, res) => {
    try {
        req.logout((err) => {
            if(err) {
                return next(err)
            }
            res.render("logout");
        })
    } catch (error) {
        res.status(500).send(error.message);
    }
}

module.exports = logout