var express = require('express');
var router = express.Router();
var testController = require('../controllers/test');

/* GET test listing. */
router.get('/login', testController.getTest);
router.get('/aaa', testController.getTest1);

module.exports = router;
