const router = require('express').Router();

router.post('/', require('../controllers/regPost'));

module.exports = router