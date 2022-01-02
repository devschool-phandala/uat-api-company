var {db} = require('../db.js');
var {Company} = require('../model/company');

exports.Create = async(req, res)=> {
   try {

       c = new Company(req.body.name, req.body.address);

       const q = `INSERT INTO company (name, address) VALUES ('${c.name}', '${c.address}')`;
        db.query(q, c, (err, result) => {
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
        const q = `UPDATE company SET name = '${req.body.name}', 
        address = '${req.body.address}' WHERE id = ${req.params.id}`;

        db.query(q, (err, result) => {
            return res.status(200).json({
                message: 'Company updated successfully',
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