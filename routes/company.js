var express = require('express');
var router = express.Router();
var companyController = require('../controller/companyController');

var passportJWT = require('../middleware/passportJWT'); 

var checkAdmin = require('../middleware/checkAdmin');

router.get('/',[passportJWT.IsLoggedIn, checkAdmin.IsAdmin], companyController.GetAll);

// route for create company
router.post('/', companyController.Create);

// route for update company with id
router.put('/:id', companyController.Update);

// route for delete company with id
router.delete('/:id', companyController.Delete);

// router for get company by id
router.get('/:id', companyController.GetById);

module.exports = router;