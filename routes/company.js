var express = require('express');
var router = express.Router();

// Require controller modules.
var companyController = require('../controller/companyController');

// route for create company
router.post('/', companyController.Create);

// route for get all company
router.get('/', companyController.GetAll);

// route for update company with id
router.put('/:id', companyController.Update);

// route for delete company with id
router.delete('/:id', companyController.Delete);

// router for get company by id
router.get('/:id', companyController.GetById);

module.exports = router;