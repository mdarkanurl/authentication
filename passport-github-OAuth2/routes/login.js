const router = require('express').Router();
const { loginGet, loginPost } = require('../controllers/login');

router.route('/')
    .get(require('../middlewares/auth'), loginGet)
    .post(loginPost)

module.exports = router