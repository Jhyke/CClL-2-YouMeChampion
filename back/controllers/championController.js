//// Modules
const path = require("path");
const fs = require("fs");

//// Services
const authenticationService = require("../services/authentication");

//// Models
const championModel = require("../models/championModel");

//// Functions

/**
 * Renders the champions view.
 * This view displays all champions existing in the database.
 * Preferred Method: GET
 *
 * @param req HTTP Request
 * @param res HTTP Response
 * @param next Possible Middleware Callback
 */
function viewChampions(req, res, next) {
    championModel.getChampions()
        .then(champions => {
            res.status(200); // Set the HTTP status code to 200 (OK)
            res.send(champions); // Send the retrieved champions as the response
        })
        .catch(error => res.sendStatus(500)); // Send a generic server error status code if an error occurs
}

/**
 * Adds a new champion.
 * This function is triggered when adding a champion in the controller.
 *
 * @param req HTTP Request
 * @param res HTTP Response
 * @param next Possible Middleware Callback
 */
function addChampion(req, res, next) {
    console.log("addChampion triggered in controller");
    championModel.addChampion(req.user.id, req.body.champID, req.body.pos)
        .then(data => {
            res.sendStatus(200); // Send a success status code when the champion is added successfully
        })
        .catch(error => res.sendStatus(500)); // Send a generic server error status code if an error occurs
}

/**
 * Retrieves the selected champion.
 * This function is triggered when viewing the selected champion in the controller.
 *
 * @param req HTTP Request
 * @param res HTTP Response
 * @param next Possible Middleware Callback
 */
function viewSelChampion(req, res, next) {
    console.log("viewSelChampion triggered in controller");
    championModel.getSelChampion(req.user.id)
        .then(champions => {
            res.status(200); // Set the HTTP status code to 200 (OK)
            res.send(champions); // Send the retrieved selected champion as the response
        })
        .catch(error => {
            console.log(error); // Log the error for debugging purposes
            res.sendStatus(500); // Send a generic server error status code if an error occurs
        });
}

//// Exports
module.exports = {
    viewChampions,
    addChampion,
    viewSelChampion
};
