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

router.route('/addChampion')
    .post(championController.addChampion)

router.route('/selChampion')
    .get(championController.viewSelChampion)



//// Modules
module.exports = router;