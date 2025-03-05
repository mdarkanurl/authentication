const router = require('express').Router();
const { verifyEmail } = require('../controllers/verify-email')

router.route('/')
    .get()
    .post(verifyEmail)

module.exports = router