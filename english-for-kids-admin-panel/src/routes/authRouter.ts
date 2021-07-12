const Router = require('express');
const router = new Router();
const login = require('./authController');

router.post('/login', login);

module.exports = router;