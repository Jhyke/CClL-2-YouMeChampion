const bcrypt = require('bcrypt');
const {authenticateJWT, authenticateUser} = require("../services/authentication");
const authenticationService = require("../services/authentication");

//// Services
const db = require('../services/database.js').config;

//// Functions

/**
 * Retrieves all users from the database.
 *
 * @returns {Promise} A promise that resolves to a list of all users.
 */
let getUsers = () => new Promise((resolve, reject) => {
    let sql = "SELECT * FROM users";

    db.query(sql, function (err, users, fields) {
        if (err) {
            reject(err);
        } else {
            console.log(users);
            resolve(users);
        }
    });
});


/**
 * Updates a user in the database.
 *
 * @param {Object} userData - The updated data of the user.
 * @param {number} userId - The ID of the user to update.
 * @returns {Promise} A promise that resolves to the result of the database query.
 */
let updateUser = (userData, userId) => new Promise(async (resolve, reject) => {
    console.log("Update user triggered in userModel");
    userData.password = await bcrypt.hash(userData.pw, 10);
    let sql = "UPDATE users SET" +
        " userName = " + db.escape(userData.uname) +
        ", userPosi = " + db.escape(userData.posi) +
        ", userSecPosi = " + db.escape(userData.secPosi) +
        ", userIGN = " + db.escape(userData.ign) +
        ", userEmail = " + db.escape(userData.email) +
        ", userPassword = " + db.escape(userData.password) +
        ", userDescription = " + db.escape(userData.desc) +
        " WHERE userID = " + parseInt(userId);
    console.log(sql);
    db.query(sql, function (err, result, fields) {
        if (err) {
            console.log(err);
            reject(err);
        } else {
            console.log(result.affectedRows + " rows have been affected");
            resolve(result);
        }
    });
});

/**
 * Adds a new user to the database.
 *
 * @param {Object} userData - The data of the new user.
 * @returns {Promise} A promise that resolves to an object representing the newly created user.
 */
let addUser = (userData) => new Promise(async (resolve, reject) => {
    userData.pw = await bcrypt.hash(userData.pw, 10);
    let sql = "INSERT INTO users (userName, userEmail, userPassword)" +
        " VALUES (" + db.escape(userData.uname) +
        "," + db.escape(userData.email) +
        "," + db.escape(userData.pw) +
        ")";
    console.log(sql);
    db.query(sql, function (err, result, fields) {
        if (err) {
            console.log(err);
            reject(err);
        } else {
            console.log(result.affectedRows + " rows have been added");
            userData.id = result.insertId;
            console.log(result.insertId);
            resolve(userData);
        }
    });
});

/**
 * Deletes a user from the database.
 *
 * @param {number} id - The ID of the user to delete.
 * @returns {Promise} A promise that resolves to the ID of the deleted user.
 */
let deleteUser = (id) => new Promise((resolve, reject) => {
    let sql = "DELETE FROM users WHERE userID =" + parseInt(id);

    db.query(sql, function (err, result, fields) {
        if (err) {
            console.log(err);
            reject(err);
        } else {
            console.log(sql);
            console.log(resolve);
            console.log(result.affectedRows + " rows have been deleted");
            resolve(id);
        }
    });
});

/**
 * Adds a friend relationship between two users in the database.
 *
 * @param {number} userID - The ID of the first user.
 * @param {number} friendID - The ID of the second user.
 * @returns {Promise} A promise that resolves when the friend relationship is added successfully.
 */
let addFriend = (userID, friendID) => new Promise((resolve, reject) => {
    let sql = "INSERT INTO userFriends (userID_1, userID_2)" +
        " VALUES (" + userID +
        ", " + friendID +
        ")";

    db.query(sql, function (err, result, fields) {
        if (err) {
            console.log(err);
            reject(err);
        }
        console.log(result.affectedRows + " rows have been added");
        resolve();
    });
});

/**
 * Retrieves all friends for a user from the database.
 *
 * @param {number} id - The ID of the user.
 * @returns {Promise} A promise that resolves to a list of all friends for the user.
 */
let getFriends = (id) => new Promise((resolve, reject) => {
    let sql = "SELECT * FROM userFriends" +
        " INNER JOIN users" +
        " ON userFriends.userID_2 = users.userID" +
        " WHERE userID_1 =" + parseInt(id) +
        " OR userID_2 =" + parseInt(id);

    db.query(sql, function (err, friends, fields) {
        if (err) {
            console.log("Error in getFriends" + err);
            reject(err);
        } else {
            console.log(friends);
            resolve(friends);
        }
    });
});

//// Exports
module.exports = {
    getUsers,
    updateUser,
    addUser,
    deleteUser,
    addFriend,
    getFriends
};
