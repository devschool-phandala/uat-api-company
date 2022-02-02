var express = require('express');
var router = express.Router();

// import user controller
const userController = require('../controller/userController');

router.get('/', userController.index );

router.post('/', userController.register);


module.exports = router;
