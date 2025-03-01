const router = require('express').Router();

router.post('/', require('../controllers/logPost'));

module.exports = router