//// Modules
const express = require('express');


//// Routes
const router = express.Router();

router.route('/')
    .get((req,res,next)=>{
        res.status(200);
        res.send(req.user);
    });


//// Exports
module.exports = router;