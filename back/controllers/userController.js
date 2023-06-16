//// Modules
const path = require("path");
const fs = require("fs");

//// Services
const authenticationService = require("../services/authentication");

//// Models
const userModel = require("../models/userModel");


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
function viewUsers(req, res, next) {
    userModel.getUsers()
        .then(users => {
            res.send(users)
            res.status(200)
        })
        .catch(error => res.sendStatus(500));
}

/**
 * This function renders the user-View
 * This View shows one User, which exist in the DB
 * specified by the req.params.id
 * Preferred-Methode: GET
 *
 * @param req HTTP-Request
 * @param res HTTP-Response
 * @param next Possible-Middleware
 */
function viewUser(req, res, next) {
    userModel.getUser(parseInt(req.params.id))
        .then(user =>  {
            console.table(user);
            res.sendStatus(200);
        })
        .catch((err) => {
            res.status(404)
            next(err);
        })
}

/**
 * This function updates the user
 * data inside req.body
 * Preferred-Methode: POST
 *
 * @param req HTTP-Request
 * @param res HTTP-Response
 * @param next Possible-Middleware
 */
function editUser(req, res, next) {
    console.log("editUser triggered in userController");
    userModel.updateUser(req.body, req.params.id)
        .then(result =>  {
            userModel.getUsers().then(async users => {
                await authenticationService.authenticateUser(req.body, users, res);
                res.sendStatus(200);
            })
        })
        .catch(
            error => {
                console.log(error)
                res.sendStatus(500)
            })
}

/**
 * This function creates a new user
 * data inside req.body
 * Preferred-Methode: POST
 *
 * @param req HTTP-Request
 * @param res HTTP-Response
 * @param next Possible-Middleware
 */
function register(req,res,next){
    userModel.addUser(req.body)
    .then(user =>  {
       res.sendStatus(200);
    })
        .catch(error => res.sendStatus(500))
}


/**
 * This function deletes a user
 * data inside req.body
 * Preferred-Methode: DELETE
 *
 * @param req HTTP-Request
 * @param res HTTP-Response
 * @param next Possible-Middleware
 */
function deleteUser(req,res,next){
    userModel.deleteUser(parseInt(req.params.id))
        .then(data =>{
            res.sendStatus(200);
        })
        .catch(error => {
            res.sendStatus(500);
        })

}

/**
 * This function creates tries to log in a user
 * data inside req.body
 * Preferred-Methode: POST
 *
 * @param req HTTP-Request
 * @param res HTTP-Response
 * @param next Possible-Middleware
 */
function login(req,res,next){
    console.log(req.body);
    userModel.getUsers().then( async (users) => {
        await authenticationService.authenticateUser(req.body, users, res);
        res.sendStatus(200);
    }).catch((err) => {
        res.sendStatus(500);
    });
}

/**
 * This function logs out the User and redirects him to the index-page
 * Preferred-Methode: GET
 *
 * @param req HTTP-Request
 * @param res HTTP-Response
 * @param next Possible-Middleware
 */
function logout(req,res,next){
    console.log("Logout in backend")
    res.cookie('accessToken', '', {maxAge: 0});
    res.sendStatus(200);
}

//// Exports
module.exports = {
    viewUsers,
    viewUser,
    editUser,
    register,
    deleteUser,
    login,
    logout
};