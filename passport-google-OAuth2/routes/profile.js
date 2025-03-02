const router = require('express').Router();
const profileGet = require('../controllers/profile');

router.route('/')
  .get(profileGet)
  .post();


module.exports = router