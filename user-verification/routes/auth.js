const router = require('express').Router();
const { verfiyToken } = require('../middlewares/verifyToken')
const { checkAuth } = require('../controllers/auth');

router.route('/')
    .get(verfiyToken, checkAuth)
    .post()

module.exports = router