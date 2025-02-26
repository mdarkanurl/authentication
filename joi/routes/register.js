const router = require('express').Router();

router.post('/', require('../controllers/register'));

module.exports = router