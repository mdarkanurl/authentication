const router = require('express').Router();

router.route('/')
  .get(require('../controllers/google'));


module.exports = router