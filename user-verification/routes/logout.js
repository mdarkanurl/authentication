const router = require('express').Router();
const { logoutGet } = require('../controllers/logout')

router.route('/')
    .get(logoutGet)
    .post()

module.exports = router