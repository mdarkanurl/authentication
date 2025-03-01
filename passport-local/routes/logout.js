const router = require('express').Router();

router.get('/', require('../controllers/logout'));

module.exports = router