const router = require('express').Router();

router.route('/')
    .get(require('../controllers/logout'))
    .post()

module.exports = router