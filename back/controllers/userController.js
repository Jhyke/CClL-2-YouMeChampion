//// Modules
const path = require("path");
const fs = require("fs");

//// Services
const authenticationService = require("../services/authentication");

//// Models
const userModel = require("../models/userModel");

//// Functions

/**
 * Renders the users view.
 * This view displays all users existing in the database.
 * Preferred Method: GET
 *
 * @param req HTTP Request
 * @param res HTTP Response
 * @param next Possible Middleware Callback
 */
function viewUsers(req, res, next) {
    userModel.getUsers()
        .then(users => {
            res.status(200); // Set the HTTP status code to 200 (OK)
            res.send(users); // Send the retrieved users as the response
        })
        .catch(error => res.sendStatus(500)); // Send a generic server error status code if an error occurs
}

/**
 * Updates the user data based on req.body.
 * Preferred Method: POST
 *
 * @param req HTTP Request
 * @param res HTTP Response
 * @param next Possible Middleware
 */
function editUser(req, res, next) {
    console.log("editUser triggered in userController");
    userModel.updateUser(req.body, req.params.id)
        .then(result =>  {
            userModel.getUsers().then(async users => {
                await authenticationService.authenticateUser(req.body, users, res);
                res.sendStatus(200); // Send a success status code when the user is updated successfully
            })
        })
        .catch(error => {
            console.log(error); // Log the error for debugging purposes
            res.sendStatus(500); // Send a generic server error status code if an error occurs
        });
}

/**
 * Creates a new user based on req.body.
 * Preferred Method: POST
 *
 * @param req HTTP Request
 * @param res HTTP Response
 * @param next Possible Middleware
 */
function register(req, res, next) {
    userModel.addUser(req.body)
        .then(user => {
            res.sendStatus(200); // Send a success status code when the user is added successfully
        })
        .catch(error => res.sendStatus(500)); // Send a generic server error status code if an error occurs
}

/**
 * Deletes a user based on the provided user ID.
 * Preferred Method: DELETE
 *
 * @param req HTTP Request
 * @param res HTTP Response
 * @param next Possible Middleware
 */
function deleteUser(req, res, next) {
    userModel.deleteUser(parseInt(req.params.id))
        .then(data => {
            res.cookie('accessToken', '', { maxAge: 0 }); // Clear the access token cookie
            res.sendStatus(200); // Send a success status code when the user is deleted successfully
        })
        .catch(error => {
            res.sendStatus(500); // Send a generic server error status code if an error occurs
        });
}

/**
 * Adds a friend to the user.
 * Preferred Method: POST
 *
 * @param req HTTP Request
 * @param res HTTP Response
 * @param next Possible Middleware
 */
function addFriend(req, res, next) {
    userModel.addFriend(parseInt(req.params.id), parseInt(req.body.friendID))
        .then(data => {
            console.log("This is data from addFriend: " + data);
            res.status(200); // Set the HTTP status code to 200 (OK)
            res.send(data); // Send the updated data as the response
        })
        .catch(error => {
            res.sendStatus(500); // Send a generic server error status code if an error occurs
        });
}

/**
 * Sends the user's friends to the front-end.
 * This view shows all friends existing in the database for the specified user.
 * Preferred Method: GET
 *
 * @param req HTTP Request
 * @param res HTTP Response
 * @param next Possible Middleware Callback
 */
function viewFriends(req, res, next) {
    userModel.getFriends(parseInt(req.params.id))
        .then(friends => {
            res.status(200); // Set the HTTP status code to 200 (OK)
            res.send(friends); // Send the retrieved friends as the response
        })
        .catch(error => res.sendStatus(500)); // Send a generic server error status code if an error occurs
}

/**
 * Tries to log in a user based on req.body.
 * Preferred Method: POST
 *
 * @param req HTTP Request
 * @param res HTTP Response
 * @param next Possible Middleware
 */
function login(req, res, next) {
    console.log(req.body);
    userModel.getUsers().then(async (users) => {
        await authenticationService.authenticateUser(req.body, users, res);
        res.sendStatus(200); // Send a success status code when the user is logged in successfully
    }).catch((err) => {
        res.sendStatus(500); // Send a generic server error status code if an error occurs
    });
}

/**
 * Logs out the user and redirects them to the index page.
 * Preferred Method: GET
 *
 * @param req HTTP Request
 * @param res HTTP Response
 * @param next Possible Middleware
 */
function logout(req, res, next) {
    console.log("Logout in backend");
    res.cookie('accessToken', '', { maxAge: 0 }); // Clear the access token cookie
    res.sendStatus(200); // Send a success status code when the user is logged out successfully
}

//// Exports
module.exports = {
    viewUsers,
    editUser,
    register,
    deleteUser,
    addFriend,
    viewFriends,
    login,
    logout
};
