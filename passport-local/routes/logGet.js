const router = require('express').Router();

router.get('/', require('../middlewares/checkLogged'), require('../controllers/logGet'));

module.exports = router