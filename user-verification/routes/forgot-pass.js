const router = require('express').Router();
const { forgotPassPost } = require('../controllers/forgot-pass')

router.route('/')
    .get()
    .post(forgotPassPost)

module.exports = router