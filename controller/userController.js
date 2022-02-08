var { User } = require('../model/user');
var { db } = require('../db.js');
var { validationResult } = require('express-validator');
var jwt = require('jsonwebtoken');
const { json } = require('express');

exports.register = async (req,res, next) =>{
  try {
    let {username, password, email} = req.body

    // Error validation
    var errors = validationResult(req);
    if (!errors.isEmpty()) {
        error = new Error('Invalid Input');
        error.statusCode = 400;
        error.validation = errors.array();
        return next(error);
    }

    let u = new User();
    u.username = username;
    u.password = await u.hashPassword(password)
    u.email = email;

    // Check if user already exists
    db.query(`SELECT username FROM users WHERE username = '${username}'`, (err, result) => {
      if (err) return next(err);
      if (!result.length > 0){
        const q = `INSERT INTO users (username, password, email, role) VALUES (?, ?, ?, ?)`;
        db.query(q, [u.username, u.password, u.email, u.role], (err, result) => {
          if (err) return next(err);
          return res.status(201).json({
               status: 'OK',
               message: 'User created successfully',
            });
        });
      } else{
        err = new Error('User already exists');
        err.statusCode = 409;
       return next(err);
      }
    });  
  }
  catch(err){
   return next(err);
  }
}

exports.login = (req, res, next) => {
  try {
    let {username, password} = req.body
    db.query(`SELECT username, password FROM users WHERE username = '${username}'`, async (err, result) => {
      if (err) {
        err = new Error('User not found');
        err.statusCode = 404;
        return next(err);
      }

      if (result.length > 0){
        user = new User(result[0].username, result[0].password);
        isValid = await user.comparePassword(password);
        if (!isValid) {
          err = new Error('Username or password is incorrect');
          err.statusCode = 401;
          return next(err);
        }         

        let token = jwt.sign({
          username: user.username,
          role: user.role
        }, process.env.JWT_SECRET, { expiresIn: '1h' });
        
        let express_in = jwt.decode(token);

        return res.status(200).json({
          access_token: token,
          express_in: express_in.exp
        });
      }

    });
  } catch (error) {
    return next(error);
  }
}


exports.index = (req, res) => {
  res.status(200).json({
    name:'long',
    age:23,
    address : {
      province: 'Luang Prabang'
    }
  });
};

