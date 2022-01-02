var express = require('express');
var router = express.Router();

// import user controller
const { index } = require('../controller/userController');

router.get('/', index );

module.exports = router;
