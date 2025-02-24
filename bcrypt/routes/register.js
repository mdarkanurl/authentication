const registerController = require('../controllers/registerController');
const express = require('express');
const router = express.Router();

router.post('/',registerController);

module.exports = router;