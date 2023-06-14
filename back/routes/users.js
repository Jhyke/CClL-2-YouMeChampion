//// Modules
const express = require('express');

//// Controllers
const userController = require('../controllers/userController');
const authenticationService = require('../services/authentication');

//// Routes
const router = express.Router();

router.use(authenticationService.authenticateJWT);

router.route('/')
    .get(userController.viewUsers);

router.route('/:id')
    .get(userController.viewUser);

router.route('/:id/edit')
    .post(userController.editUser);

router.route('/:id/delete')
    .delete(userController.deleteUser);



//// Modules
module.exports = router;