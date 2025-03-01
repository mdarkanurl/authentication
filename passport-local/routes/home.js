const router = require('express').Router();

router.get('/', require('../controllers/home'));

module.exports = router