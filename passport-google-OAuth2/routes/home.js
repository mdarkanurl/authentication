const router = require('express').Router();

router.route('/')
  .get(require('../controllers/home'));


module.exports = router