const router = require('express').Router();
const { signupGet, signupPost } = require('../controllers/signup')

router.route('/')
    .get(signupGet)
    .post(signupPost)

module.exports = router