const router = require('express').Router();

router.get('/', require('../controllers/profile'));

module.exports = router