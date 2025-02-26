const router = require('express').Router();

router.get('/', require('../middlewares/auth'), require('../controllers/test'));

module.exports = router