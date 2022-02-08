var express = require('express');
var router = express.Router();
var { body } = require('express-validator');

// import user controller
const userController = require('../controller/userController');

router.get('/', userController.index );

router.post('/register',[
  body('username').not().isEmpty().withMessage('Username is required'),
  body('password').not().isEmpty().withMessage('Password is required').isLength({ min: 5 }).
  withMessage('Password must be at least 5 characters long'),
  body('email').not().isEmpty().withMessage('Email is required').isEmail().
  withMessage('Email is required')
], userController.register);

router.post('/login',[
  body('username').not().isEmpty().withMessage('Username is required'),
  body('password').not().isEmpty().withMessage('Password is required').isLength({ min: 5 }).
  withMessage('Password must be at least 5 characters long')
], userController.login);


module.exports = router;
