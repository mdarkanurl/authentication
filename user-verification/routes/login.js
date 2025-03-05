const router = require('express').Router();
const { loginPost } = require('../controllers/login');

router.route('/')
    .get()
    .post(loginPost)

module.exports = router