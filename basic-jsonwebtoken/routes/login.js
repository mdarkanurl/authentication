const route = require('express').Router();
const loginControllers = require('../controllers/login')

route.post('/', loginControllers);

module.exports = route