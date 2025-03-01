const router = require('express').Router();

router.get('/', require('../controllers/logoutGet'));

module.exports = router