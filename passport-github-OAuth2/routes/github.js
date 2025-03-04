const router = require('express').Router();

router.route('/')
    .get(require('../controllers/github'))
    .post()

module.exports = router