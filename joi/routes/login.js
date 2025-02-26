const router = require('express').Router();

router.post('/', require('../controllers/login'));

module.exports = router