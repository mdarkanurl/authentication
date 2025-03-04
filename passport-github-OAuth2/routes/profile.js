const router = require('express').Router();

router.route('/')
    .get(require('../controllers/profile'))
    .post()

module.exports = router