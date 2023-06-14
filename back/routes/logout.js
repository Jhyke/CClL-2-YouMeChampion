//// Modules
const express = require('express');

//// Controllers
const userController = require('../controllers/userController');

//// Routes
const router = express.Router();

router.route('/')
    .get(userController.logout);

//// Exports
module.exports = router;