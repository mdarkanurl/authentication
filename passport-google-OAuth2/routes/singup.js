const router = require('express').Router();
const { singupGet, singupPost } = require('../controllers/signup');

router.route('/')
  .get(singupGet)
  .post(singupPost)


module.exports = router