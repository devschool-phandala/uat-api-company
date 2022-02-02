var { User } = require('../model/user');
var { db } = require('../db.js');

exports.register = async (req,res, next) =>{
  try {
    let {username, password, email} = req.body

    let u = new User();
    u.username = username;
    u.password = await u.hashPassword(password)
    u.email = email;

    // Check if user already exists
    db.query(`SELECT username FROM users WHERE username = '${username}'`, (err, result) => {
      if (!result.length > 0){
        const q = `INSERT INTO users (username, password, email, role) VALUES (?, ?, ?, ?)`;
        db.query(q, [u.username, u.password, u.email, u.role], (err, result) => {
          return res.status(201).json({
               status: 'OK',
               message: 'User created successfully',
            });
        });

      } else{
        err = new Error('User already exists');
        err.statusCode = 409;
        next(err);
      }
    });  
  }
  catch(err){
    next(err);
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

