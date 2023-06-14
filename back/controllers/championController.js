//// Modules
const path = require("path");
const fs = require("fs");

//// Services
const authenticationService = require("../services/authentication");

//// Models
const championModel = require("../models/championModel");


//// Functions

/**
 * This function renders the users-View
 * This View shows all Users, which exist in the DB
 * Preferred-Methode: GET
 *
 * @param req HTTP-Request
 * @param res HTTP-Response
 * @param next Possible-Middleware Callback
 */
function viewChampions(req, res, next) {
    championModel.getChampions()
        .then(champions => res.sendStatus(200))
        .catch(error => res.sendStatus(500));
}


//// Exports
module.exports = {
    viewChampions,
};