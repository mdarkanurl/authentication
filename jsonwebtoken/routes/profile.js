const router = require('express').Router();

router.get('/', require('../middlewares/auth'), require('../controllers/profile') );

module.exports = router