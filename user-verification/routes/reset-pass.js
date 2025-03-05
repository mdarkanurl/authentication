const router = require('express').Router();
const { resetPassword } = require('../controllers/reset-pass');

router.route('/:token')
    .post(resetPassword)

module.exports = router