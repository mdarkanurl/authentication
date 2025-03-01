const router = require('express').Router();

router.get('/', require('../controllers/regGet'));

module.exports = router