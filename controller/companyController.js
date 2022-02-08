var { db } = require('../db.js');
var { Company } = require('../model/company');
var { saveImage } = require('../controller/uploadImageController');

exports.Create = async(req, res)=> {
   try {
       photo = await saveImage(req.body.photo);
       c = new Company(req.body.name, req.body.address, photo);

       const q = `INSERT INTO company (name, address, photo) VALUES (?, ?, ?)`;
         db.query(q, [c.name, c.address, c.photo], (err, result) => {
                return res.status(201).json({
                    status: 'OK',
                    message: 'Company created successfully',
                });
            }
            );
   } catch (error) {
    return res.status(500).json({
        status: 'INTERNAL_SERVER_ERROR',
        message: error.message
    });
   }
};


exports.GetAll = async(req, res)=> {
    try {
        const q = `SELECT * FROM company`;
        db.query(q, (err, result) => {
            return res.status(200).json({
                data: result
            });
         }
         );
    } catch (error) {
       next(error);
    }
}

exports.Update = async(req, res)=> {
    try {

        const q = `UPDATE company SET name = ?, address = ? WHERE id = ?`;

        db.query(q, [req.body.name, req.body.address, req.params.id], (err, result) => {
            return res.status(200).json({
                message: 'Company updated successfully',
            });
         });

    } catch (error) {
        return res.status(500).json({
            status: 'INTERNAL_SERVER_ERROR',
            message: error.message
        });
    }
}

exports.Delete = async(req, res)=> {
    try {
        const q = `DELETE FROM company WHERE id = ${req.params.id}`;

        db.query(q, (err, result) => {
            return res.status(200).json({
                message: 'Company deleted successfully',
            });
         }
         );
    } catch (error) {
        return res.status(500).json({
            status: 'INTERNAL_SERVER_ERROR',
            message: error.message
        });
    }
}

exports.GetById = async(req, res)=> {
    try {
        const q = `SELECT * FROM company WHERE id = ${req.params.id}`;
        db.query(q, (err, result) => {
            return res.status(200).json({
                data: result
            });
         }
         );
    } catch (error) {
        return res.status(500).json({
            status: 'INTERNAL_SERVER_ERROR',
            message: error.message
        });
    }
}