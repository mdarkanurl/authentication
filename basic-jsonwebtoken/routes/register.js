const route = require('express').Router();
const registerController = require('../controllers/register');

route.post('/', registerController);


module.exports = route