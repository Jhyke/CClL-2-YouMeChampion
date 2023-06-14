//// Modules
const express = require('express');

//// Controllers
const championController = require('../controllers/championController');
const authenticationService = require('../services/authentication');

//// Routes
const router = express.Router();

router.use(authenticationService.authenticateJWT);

router.route('/')
    .get(championController.viewChampions);



//// Modules
module.exports = router;