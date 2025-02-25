const route = require('express').Router();
const dashboradController = require('../controllers/dsahboard');
const auth = require('../middlewares/auth');

route.get('/', auth, dashboradController);

module.exports = route