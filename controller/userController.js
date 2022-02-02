var { User } = require('../model/user'); // load User model.
var { db } = require('../db.js'); // load db connection.

// function to register new user
exports.register = async (req,res, next) =>{
  try {
    let {username, password, email} = req.body

    let u = new User();
    u.username = username;
    u.password = await u.hashPassword(password)
    u.email = email;

    const q = `INSERT INTO users (username, password, email, role) VALUES (?, ?, ?, ?)`;
    db.query(q, [u.username, u.password, u.email, u.role], (err, result) => {
           return res.status(201).json({
               status: 'OK',
               message: 'User created successfully',
           });
       }
    );
  }
  catch(err){
    return res.status(500).json({
      status: 'INTERNAL_SERVER_ERROR',
      message: err.message
    });
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

