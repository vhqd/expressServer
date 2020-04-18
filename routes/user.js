var express = require('express');
var router = express.Router();
var userController = require('../controllers/user');

router.post('/login', userController.login);
router.get('/info', userController.info);

module.exports = router;
