//// Modules
const express = require('express');

//// Controllers
const userController = require('../controllers/userController');

//// Routes
const router = express.Router();

router.route('/')
    .post(userController.login);


//// Exports
module.exports = router;