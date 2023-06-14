//// Modules
const express = require('express');


//// Routes
const router = express.Router();

router.route('/')
    .get((req,res,next)=>{
    res.sendStatus(200);
    });


//// Exports
module.exports = router;