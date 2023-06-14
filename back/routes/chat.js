//// Modules
const express = require('express');

//// Controllers
const chatController = require('../controllers/chatController');

//// Routes
const router = express.Router();

router.route('/')
    .get(chatController.viewChat);

//// Exports
module.exports = router;