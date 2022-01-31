const { CLIENT_LONG_PASSWORD } = require('mysql/lib/protocol/constants/client');
var {db} = require('../db.js');
var {Company} = require('../model/company');

exports.Create = async(req, res)=> {
   try {
       c = new Company(req.body.name, req.body.address);

       const q = `INSERT INTO company (name, address) VALUES (?, ?)`;
         db.query(q, [c.name, c.address], (err, result) => {
                return res.status(200).json({
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
        return res.status(500).json({
            status: 'INTERNAL_SERVER_ERROR',
            message: error.message
        });
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